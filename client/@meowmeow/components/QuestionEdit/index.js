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
import { newPost } from "../../modules/apiService/index"

const tags =
    [
        { value: 'javascript', label: 'javascript' },
        { value: 'python', label: 'python' },
        { value: 'java', label: 'java' },
        { value: 'c#', label: 'c#' },
        { value: 'php', label: 'php' },
        { value: 'android', label: 'android' },
        { value: 'html', label: 'html' },
        { value: 'jquery', label: 'jquery' },
        { value: 'c++', label: 'c++' },
        { value: 'ios', label: 'ios' },
        { value: 'mysql', label: 'mysql' },
        { value: 'sql', label: 'sql' },
        { value: 'arrays', label: 'arrays' },
        { value: 'reactjs', label: 'reactjs' },
        { value: 'c', label: 'c' },
        { value: 'asp.net', label: 'asp.net' },
        { value: 'json', label: 'json' },
        { value: 'ruby-on-rails', label: 'ruby-on-rails' },
        { value: '.net', label: '.net' },
        { value: 'sql-server', label: 'sql-server' },
        { value: 'python-3.x', label: 'python-3.x' },
        { value: 'swift', label: 'swift' },
        { value: 'objective-c', label: 'objective-c' },
        { value: 'django', label: 'django' },
        { value: 'angular', label: 'angular' },
        { value: 'angularjs', label: 'angularjs' },
        { value: 'excel', label: 'excel' },
        { value: 'regex', label: 'regex' },
        { value: 'pandas', label: 'pandas' },
        { value: 'ruby', label: 'ruby' },
        { value: 'iphone', label: 'iphone' },
        { value: 'ajax', label: 'ajax' },
        { value: 'linux', label: 'linux' }
    ]

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: props.data.title, editorHtml: props.data.content, tags: props.data.categories.map((category) => ({value: category.category, label: category.category})),
            openModal: false, modalType: null, modalContent: '', questionId: props.data._id, redirectTo: '' };
            this.handleChange = this.handleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleTagsChange = this.handleTagsChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    handleSubmitModal = () => {
    }

    handleTagsChange = (selectedOption) => {
        this.setState({ tags: selectedOption })
    }

    handleTitleChange = (value) => {
        this.setState({ title: value })
    }

    handleSubmit = () => {
        this.setState({ openModal: true, modalType: 'loading' })
        let question = {
            "title": this.state.title,
            "content": this.state.editorHtml,
            "categories": (this.state.tags !== null) ? this.state.tags.map((tag) => (
                { "category": tag.value }
            )) : []
        }
        Axios
            .patch(`/question/${this.state.questionId}/modify`, question, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({ data }) => {
                let res = data.data
                let content = (res !== null) ? <IntlMessages id="questions.edit.success" /> : <IntlMessages id="questions.edit.failed" />
                this.setState({ openModal: true, modalType: (res !== null) ? "redirect" : null, modalContent: content})
            })
            .catch(() => {
                let res = null
                let content = (res !== null) ? <IntlMessages id="questions.edit.success" /> : <IntlMessages id="questions.edit.failed" />
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
                    <IntlMessages id="questions.editQuestion" />
                </h2>
                <p className="text-md mb-2"><IntlMessages id="questions.title" /></p>
                <input type="text"
                    className="input input-bordered input-sm w-full m-input mb-2"
                    value={this.state.title}
                    onChange={(e) => this.handleTitleChange(e.target.value)}></input>
                <p className="text-md mb-2"><IntlMessages id="questions.describeProblem" /></p>
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
                <p className="text-md mt-4 mb-2"><IntlMessages id="questions.tags" /></p>
                <Select options={tags} isMulti="true"
                    onChange={this.handleTagsChange}
                    value={this.state.tags}
                    styles={{
                        input: (base) => ({
                            ...base,
                            'input:focus': {
                                boxShadow: 'none',
                            },
                        }),
                    }} />
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