import React, { useState } from 'react';
import IntlMessages from '../../utils/IntlMessages'
import { TailSpin } from 'react-loader-spinner'
import Link from 'next/link';

const Loading = () => {
  return (
    <div className="grid justify-items-center grid-rows-2 mt-8">
      <div className="mb-2">
        <TailSpin color="#00BFFF" height={50} width={50} />
      </div>
      <div>
        <p className="text-2xl font-bold"><IntlMessages id="modal.loading" /></p>
      </div>
    </div>
  )
}

const Modal = ({ children, openModal, handleClose, handleSubmit, modalType, redirectTo }) => {
  const modal = openModal ? "modal modal-open" : "modal"
  const submit = (handleSubmit != null) ? "btn btn-sm btn-primary" : "hidden"
  const close = (handleClose != null) ? "btn btn-sm btn-ghost" : "hidden"
  return (
    <div>
      <div className={modal}>
        <div className="modal-box">
          <div className="container">
            {(modalType == 'loading') ? <Loading /> : children}
          </div>
          <div className="modal-action">
            {(modalType != 'loading') ?
              (<>
                {
                  (modalType == null) ? <>
                    <label htmlFor="my-modal" className={close} onClick={handleClose}>
                      <IntlMessages id="modal.btnClose" />
                    </label>
                  </> : <></>
                }
                {
                  (modalType == 'success') ? <>
                    <label htmlFor="my-modal" className={submit} onClick={handleSubmit}>
                      <IntlMessages id="modal.btnSubmit" />
                    </label>
                  </> : <></>
                }
                {
                  (modalType == 'redirect') ? <>
                    <Link href={redirectTo}>
                      <label htmlFor="my-modal" className="btn btn-sm btn-primary">
                        <IntlMessages id="questions.btn.goTo" />
                      </label>
                    </Link>

                  </> : <></>
                }
              </>) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal;