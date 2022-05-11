import IntlMessages from "../@meowmeow/utils/IntlMessages";

function Error({ statusCode }) {
    return (
        <div
            className="
      fixed
      flex
      items-center
      justify-center
      w-screen
      h-screen
      bg-gradient-to-r
      from-sky-600
      to-blue-400
      z-[100000]
    "
        >
            <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-blue-600 text-9xl">{statusCode}</h1>

                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl my-2">
                        <span className="text-red-500"><IntlMessages id="error.opss"/></span> <br/><IntlMessages id={"error."+statusCode+".detail"}/>
                    </h6>

                    <a onClick={() => window.location = window.location.origin} className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 hover:cursor-pointer hover:bg-blue-200">
                        <IntlMessages id="error.gotoHomePage"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error