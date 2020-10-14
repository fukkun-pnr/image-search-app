import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { PersistenceObserver, initializeState } from "app/src/atoms/persistence";
import Routes from "app/src/Routes";
import MainLayout from "app/src/pages/MainLayout";
import Modal from "react-modal";

function App() {
  Modal.setAppElement('#root');

  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MainLayout>
          <Routes />
        </MainLayout>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
