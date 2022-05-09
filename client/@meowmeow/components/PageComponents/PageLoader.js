import React from 'react';
import IntlMessages from '../../utils/IntlMessages'
import { Hearts } from  'react-loader-spinner'

const PageLoader = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="grid grid-rows-2">
        <Hearts color="primary" height={80} width={80} />
        <p className="text-md font-bold"><IntlMessages id="modal.loading" /></p>
      </div>
    </div>
  );
};

export default PageLoader;
