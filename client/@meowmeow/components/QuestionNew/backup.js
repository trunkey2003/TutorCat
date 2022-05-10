import React, { useState, Component } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css';
import IntlMessages from '../../utils/IntlMessages'
import Select from 'react-select'
import Modal from '../Modal'
import { Axios } from '../../modules/apiService/config'



/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'code-block'
]

const tags = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Linux', label: 'Linux' }
]

function saveToServer(file) {
    const fd = new FormData();
    fd.append('photo', file);
    Axios
        .post('/question/upload', fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(({ data }) => {
            if (data.statusCode == "200") {
                return data.data;
            }
            else {
                toast.error(data.message);
            }
        })
        .catch(function (error) {
            toast.error(error.message);
        })
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <progress className="progress w-56 progress-primary"></progress>,
})

class newPost extends Component {
    constructor(props) {
        super(props)
        this.handleSubmitModal = this.handleSubmitModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleEditboxChange = this.handleEditboxChange.bind(this)
        this.handleTagsChange = this.handleTagsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.imageHandler = this.imageHandler.bind(this)
        this.editor = React.createRef()
        this.state = { detail: null, tags: null, openModal: false, modalType: null }
    }

    imageHandler = (editor) => {
        const input = document.createElement('input');
        let quillEditor = editor
        // console.log(editor)
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async function () {
            const file = input.files[0];
            // console.log('User trying to uplaod this:', file);

            const link = await saveToServer(file); 
            quillEditor.insertEmbed(null, "image", link);
        }.bind(this); // react thing
    }

    handleSubmitModal = () => {

    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    handleEditboxChange = (content, delta, source, editor) => {
        this.setState({ detail: editor.getHTML() })
    }

    handleTagsChange = (selectedOption) => {
        this.setState({ tags: selectedOption })
    }

    handleSubmit = () => {
        this.setState({ openModal: true, modalType: 'loading' })
        setTimeout(() => this.setState({ openModal: true, modalType: null }), 2000)
        // console.log(this.state)
    }

    render() {

        return (
            <>
                <Modal
                    openModal={this.state.openModal}
                    modalType={this.state.modalType}
                    handleClose={this.handleCloseModal}
                    handleSubmit={null}>
                    {this.state.detail}
                </Modal>
                <h2 className="text-3xl font-normal leading-normal text-blueGray-800 mb-2">
                    <IntlMessages id="questions.new" />
                </h2>
                <input type="text" placeholder="Type title here" className="input input-bordered input-sm w-full m-input mb-2"></input>
                <p className="text-md mb-2"><IntlMessages id="questions.describeProblem" /></p>
                <QuillNoSSRWrapper
                    ref={this.editor}
                    onChange={this.handleEditboxChange}
                    modules= {{
                        toolbar: {
                            container: [[{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                { 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image', 'video'],
                            ['clean'],
                            ['code-block']],
                            handlers: {
                                image: {
                                    
                                },
                            },
                        } ,
                        clipboard: {
                            matchVisual: false,
                        },

                    }}
                    formats={formats} theme="snow" />
                <p className="text-md mt-4 mb-2"><IntlMessages id="questions.addTags" /></p>
                <Select options={tags} isMulti="true"
                    onChange={this.handleTagsChange}
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
        )
    }
}

export default newPost;