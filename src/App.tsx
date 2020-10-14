import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { RecoilRoot } from "recoil";
import { PersistenceObserver, initializeState } from "app/src/atoms/persistence";
import Routes from "app/src/Routes";
import MainLayout from "app/src/pages/MainLayout";
import Modal from "react-modal";

function App() {
  Modal.setAppElement('#root');
  const history = createBrowserHistory();

  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      <Router history={history}>
        <MainLayout>
          <Routes />
        </MainLayout>
      </Router>
    </RecoilRoot>
  );
}

export default App;
