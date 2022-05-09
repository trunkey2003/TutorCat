import React from "react";
import Header from '../Header/fullPage';

export default function Auth({ children }) {
  return (
    <>
      <main>
        <Header>
            {children}
      </Header>
    </main>
    </>
  );
}