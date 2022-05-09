import React, { useState, Component } from 'react';

import IntlMessages from '../../utils/IntlMessages'
import Modal from '../Modal'

const LoadingModal = ({loading}) => {
    const [open, setOpen] = useState(loading)
    return (
        <>
            <Modal 
            openModal={open}
            handleClose={null}
            handleSubmit={null}>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                <p className="text-2xl font-bold"><IntlMessages id="modal.loading"/></p>
            </Modal>
        </>
    )
}

export default LoadingModal;