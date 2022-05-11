import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Axios } from '../../modules/apiService/config'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css';
import IntlMessages from '../../utils/IntlMessages'
import Select from 'react-select'
import Modal from '../Modal'

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: props.data.content, openModal: false, modalType: null, modalContent: '', questionId: props.questionId, redirectTo: '', id: props.data._id };
            this.handleChange = this.handleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    handleSubmitModal = () => {
    }

    handleSubmit = () => {
        this.setState({ openModal: true, modalType: 'loading' })
        let question = {
            "content": this.state.editorHtml,
        }
        Axios
            .patch(`/question/reply/${this.state.id}/modify`, question, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({ data }) => {
                let res = data.data
                let content = (res !== null) ? <IntlMessages id="answers.edit.success" /> : <IntlMessages id="answers.edit.failed" />
                this.setState({ openModal: true, modalType: (res !== null) ? "redirect" : null, modalContent: content})
            })
            .catch(() => {
                let res = null
                let content = (res !== null) ? <IntlMessages id="answers.edit.success" /> : <IntlMessages id="answers.edit.failed" />
                this.setState({ openModal: true, modalType: (res !== null) ? "redirect" : null, modalContent: content})
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
                <Modal
                    openModal={this.state.openModal}
                    modalType={this.state.modalType}
                    handleClose={this.handleCloseModal}
                    handleSubmit={null}
                    redirectTo={"/questions/" + this.state.questionId}>
                    <p className="text-md font-bold">{this.state.modalContent}</p>
                </Modal>
                <h2 className="text-3xl font-normal leading-normal text-blueGray-800 mb-2">
                    <IntlMessages id="answers.editAnswer" />
                </h2>
                <ReactQuill
                    ref={el => {
                        this.quill = el;
                    }}
                    value={this.state.editorHtml}
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
            </>

        );
    }
}

export default MyComponent;