const request = require("request");
const axios = require('axios');

class CompilerController {
  createSubmission(req, res, next) {
    var {source, input, language} = req.body;
    var compilerId;

    if (source == "") {
        res.status(403).send("Invalid source code");
        return;
    }

    switch(language) {
        case "cpp":
          compilerId = 44;
          break;
        case "javascript":
          compilerId = 112;
          break;
        case "python":
          compilerId = 116;
          break;
        case "csharp":
          compilerId = 27;
          break;
        case "java":
          compilerId = 10
          break;
        default: 
          compilerId = -1;
          // code block
    };

    //Do đối tượng console không tốn tại trong Rhino nên sẽ sửa thì xíu ở chỗ này cho dễ sử dụng
    if (source.includes('console.log')){
      source = source.replace('console.log', 'print');
      res.locals.warning = "Current JS compiler doesn't have console object. Therefore, we replace console.log with print";
    }


    if (compilerId == -1){
      res.status(403);
      return;
    };

    const submissionData = {
      compilerId: compilerId,
      source: source,
      input: input,
    };

    request.post(
      {
        url: process.env.API_COMPILER_ADDRESS + "/submissions?access_token=" + process.env.API_COMPILER_TOKEN,
        form: submissionData,
      },
      (err, response) => {
        if (err) {
          res.status(503);
          return;
        }

        if (response.statusCode === 201) {
          const body = JSON.parse(response.body);
          res.locals.submissionId = body.id;
          next();
          return;
        }

        if (response.statusCode === 401) {
          res.status(401).send("Token might be expired");
          return;
        }

        if (response.statusCode === 402) {
          res.status(402).send("Unable to submit, please try again");
          return;
        }

        if (response.statusCode === 400) {
          const error = JSON.parse(response.body);
          res.status(202).send(error);
        }
      }
    );
  }

  getSubmission(req, res, next) {
    const submissionId = res.locals.submissionId || req.params.submissionId;

    if (!submissionId) {
      res.status(404).send("Please include submission ID");
      return;
    }

    //Sau khi post code tới server xử lý server sẽ nhận code và xử lý, khi get output sẽ nhận dc trạng thái code :
    //Nếu code đang chạy phía server compile thì executing == true
    //Nếu code đã thực thi xong thì executing == false
    //Nhiệm vụ hiện tại là sau khi post code request thử code đã execute chưa nếu chưa thì 2 giây sau gọi api tip

    //Đây là số lần request kiểm tra
    var requestTimes = 0;

    const getSubmissionOutput = () => {
      console.log("request submission");
      request.get(
        {
          url:
            process.env.API_COMPILER_ADDRESS +
            "/submissions/" +
            submissionId +
            "?access_token=" +
            process.env.API_COMPILER_TOKEN,
        },
        async (err, response) => {
          if (err) {
            res.status(503);
            return;
          }

          if (response.statusCode === 200) {
            const body = JSON.parse(response.body);
            if (body.executing == true) {
              //Nếu đã request kiểm tra 15 lần mà vẫn executing thì bỏ qua code đó
              if (requestTimes == 15) {
                res
                  .status(403)
                  .send("Invalid source code, source code time out!!");
                return;
              }
              setTimeout(() => {
                //Sau 2 giây thử gọi đệ quy request lại
                getSubmissionOutput(++requestTimes);
              }, 2000);
              return;
            } else {
              //Có lỗi
              if (body.result.streams.error){
                const status = body.result.status;
                const {data} = await axios.get(body.result.streams.error.uri);
                res.status(202).send({status, error : data, warning : res.locals.warning});
                return;
              }

              //Có output result
              if (body.result.streams.output){
                const status = body.result.status;
                const {data} = await axios.get(body.result.streams.output.uri);
                const time = body.result.time;
                const memory = body.result.memory;
                res.status(200).send({status, output: data, time, memory, warning : res.locals.warning});
                return;
              }
              else {
                const status = body.result.status;
                res.status(202).send({status, error : status.name});
              }
            }
          }

          if (response.statusCode === 401) {
            res.status(401).send("Token might be expired");
            return;
          }

          if (response.statusCode === 402) {
            res.status(402).send("Unable to submit, please try again");
            return;
          }

          if (response.statusCode === 400) {
            const error = JSON.parse(response.body);
            res.status(202).send(error);
          }
        }
      );
    };

    getSubmissionOutput(++requestTimes);
  }
}

module.exports = new CompilerController();
