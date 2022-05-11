import AuthPage from '../@meowmeow/components/Layout/TrunkeyAuth';
import Link from 'next/link';
import IntlMessages from '../@meowmeow/utils/IntlMessages';
import { Heading } from '../@meowmeow/modules'

const HomePage = () => {
  return (
    <AuthPage>
      <Heading title1="config.projectName" title2="landingpage.slogan" description="landingpage.slogan"/>
      <div className='bg-sky-100'>
        <div className="mx-auto min-h-[50vh] md:min-h-screen">
          <div className="text-center px-3 py-10 lg:px-0">
            <h1
              className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight"
            >
              <IntlMessages id="config.projectName" />
            </h1>
            <p
              className="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8 flex items-center justify-center"
            >
              <IntlMessages id="landingpage.slogan" />
            </p>

            <a
              href="/live"
              className="mx-auto lg:mx-0 hover:bg-opacity-80 text-white font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48 bg-blue-900"

            >
              <IntlMessages id="landingpage.btn.liveTutor" />
            </a>
            <a
              href="/questions"
              className="inline-block mx-auto lg:mx-0 hover:underline bg-transparent text-gray-600 font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8"
            >
              <IntlMessages id="landingpage.btn.topQuestion" />
            </a>
            <img className='hidden md:block mx-auto w-[80%] rounded-xl' src='/image/demo.png'></img>
          </div>

          <div className="flex items-center w-full mx-auto content-end">
            <div
              className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"
            ></div>
          </div>
        </div>

        <section className="bg-white border-b py-12 ">
          <div
            className="container mx-auto flex flex-wrap items-center justify-between pb-12"
          >
            <h2
              className="w-full my-2 text-xl font-black leading-tight text-center text-gray-800 lg:mt-8"
            >
              <IntlMessages id="landingpage.featuredIn" />
            </h2>
            <div className="w-full mb-4">
              <div
                className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
              ></div>
            </div>

            <div
              className="flex flex-1 flex-wrap max-w-4xl mx-auto items-center justify-between text-xl text-gray-500 font-bold opacity-75"
            >
              <span className="w-1/2 p-4 md:w-auto flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-10 w-10 mr-4 fill-current text-gray-500 opacity-75">
                  <path d="M284.046,224.8a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,284.046,224.8Zm-110.45,0a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,173.6,224.8Zm220.923,0a34.114,34.114,0,1,0,34.317,34.113A34.215,34.215,0,0,0,394.519,224.8Zm153.807-55.319c-15.535-24.172-37.31-45.57-64.681-63.618-52.886-34.817-122.374-54-195.666-54a405.975,405.975,0,0,0-72.032,6.357,238.524,238.524,0,0,0-49.51-36.588C99.684-11.7,40.859.711,11.135,11.421A14.291,14.291,0,0,0,5.58,34.782C26.542,56.458,61.222,99.3,52.7,138.252c-33.142,33.9-51.112,74.776-51.112,117.337,0,43.372,17.97,84.248,51.112,118.148,8.526,38.956-26.154,81.816-47.116,103.491a14.284,14.284,0,0,0,5.555,23.34c29.724,10.709,88.549,23.147,155.324-10.2a238.679,238.679,0,0,0,49.51-36.589A405.972,405.972,0,0,0,288,460.14c73.313,0,142.8-19.159,195.667-53.975,27.371-18.049,49.145-39.426,64.679-63.619,17.309-26.923,26.07-55.916,26.07-86.125C574.394,225.4,565.634,196.43,548.326,169.485ZM284.987,409.9a345.65,345.65,0,0,1-89.446-11.5l-20.129,19.393a184.366,184.366,0,0,1-37.138,27.585,145.767,145.767,0,0,1-52.522,14.87c.983-1.771,1.881-3.563,2.842-5.356q30.258-55.68,16.325-100.078c-32.992-25.962-52.778-59.2-52.778-95.4,0-83.1,104.254-150.469,232.846-150.469s232.867,67.373,232.867,150.469C517.854,342.525,413.6,409.9,284.987,409.9Z" />
                </svg>
                <IntlMessages id="landingpage.realTimeQA" />
              </span>

              <span className="w-1/2 p-4 md:w-auto flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-10 w-10 mr-4 fill-current text-gray-500 opacity-75">
                  <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" />
                </svg>
                <IntlMessages id="landingpage.callVideo" />
                </span>

              <span className="w-1/2 p-4 md:w-auto flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-10 w-10 mr-4 fill-current text-gray-500 opacity-75">
                  <path d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z" />
                </svg>
                <IntlMessages id="landingpage.codeChat" />
                </span>

              <span className="w-1/2 p-4 md:w-auto flex items-center"
              ><svg
                className="h-10 w-10 mr-4 fill-current text-gray-500 opacity-75"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                  <path
                    d="M15.3 14.89l2.77 2.77a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-2.59-2.58A5.99 5.99 0 0 1 11 18V9.04a1 1 0 0 0-2 0V18a5.98 5.98 0 0 1-3.07-1.51l-2.59 2.58a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l2.77-2.77A5.95 5.95 0 0 1 4.07 13H1a1 1 0 1 1 0-2h3V8.41L.93 5.34a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l2.1 2.1h11.12l2.1-2.1a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L16 8.41V11h3a1 1 0 1 1 0 2h-3.07c-.1.67-.32 1.31-.63 1.89zM15 5H5a5 5 0 1 1 10 0z"
                  /></svg>
               <IntlMessages id="landingpage.traditionalQA" />
                </span >
            </div>
          </div>
        </section>

        <section className="gradient w-full mx-auto text-center pt-6 pb-12">
          <h2
            className="w-full my-2 text-5xl font-black leading-tight text-center text-sky-900"
          >
            <IntlMessages id="landingpage.liveTutor" />
          </h2>
          <div className="w-full mb-4">
            <div
              className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
            ></div>
          </div>

          <h3 className="my-4 text-3xl font-extrabold pb-5">
            <IntlMessages id="landingpage.liveTutor.detail" />
          </h3>

          <a
            href='/live'
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded mt-8 py-4 px-8 shadow-lg"
          >
            <IntlMessages id="landingpage.btn.start" />
          </a>
        </section>
      </div>
    </AuthPage>
  )
};

export default HomePage;