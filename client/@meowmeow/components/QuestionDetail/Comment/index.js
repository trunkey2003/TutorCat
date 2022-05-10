import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Axios } from '../../../modules/apiService/config'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css';
import IntlMessages from '../../../utils/IntlMessages'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: '', questionId: props.questionId };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    handleSubmit = () => {
        let question = {
            "content": this.state.editorHtml,
        }
        toast.loading(<IntlMessages id="modal.loading" />)
        Axios
            .post(`/question/${this.state.questionId}/reply/add/`, question, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({ data }) => {
                if (data.statusCode == "200")
                    window.location.reload()
                else
                    toast.error(data.message)
            })
            .catch((error) => {
                toast.error(data.message)
            }
            )
    }

    imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('photo', file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', "");

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            const res = await Axios
                .post('/question/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    if (data.statusCode == "200") {
                        // console.log(data.data)
                        return data.data;
                    }
                    else {
                        toast.error(data.message);
                    }
                })
                .catch(function (error) {
                    toast.error(error.message);
                });

            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
        };
    }

    render() {

        return (
            <>
                <div className="container my-2">
                    <h3 className="text-xl mb-5"><IntlMessages id="questions.writeAnswer" /></h3>
                    <ReactQuill
                        ref={el => {
                            this.quill = el;
                        }}
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'video'],
                                    ['link', 'image', 'video'],
                                    ['clean'],
                                    ['code-block']
                                ],
                                handlers: {
                                    image: this.imageHandler
                                }
                            }
                        }}
                    />
                    <div className="flex flex-end flex-row-reverse">
                        <label className="btn btn-primary btn-sm mt-5" onClick={this.handleSubmit}>
                            <IntlMessages id="questions.btnPost" />
                        </label>
                    </div>
                </div>
            </>

        );
    }
}

export default Comment;