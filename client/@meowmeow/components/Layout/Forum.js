import React from "react";
import Header from '../Header/withSidebar';

export default function Forum({ children }) {
  return (
    <>
      <main>
        <Header>
          <section className="top-0 w-full h-full bg-white bg-no-repeat bg-full min-h-screen p-6 ">
            <div className="container px-0 h-full w-full ">
                <div className="flex flex-col min-w-0 break-words w-full mb-6 mt-0 border-0">
                  {children}
                </div>
            </div>
          </section>
        </Header>
      </main>
    </>
  );
}