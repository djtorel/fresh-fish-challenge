import {Component, createEffect, Resource} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {FishData, FishProvider, useFishProvider} from "./context/DataContext";

const TestFisheries: Component = () => {
  const contextValue= useFishProvider();

  createEffect(() => {
    if (!contextValue.loading && contextValue()) {
      console.log(contextValue());
    }
  })
  return <></>;
}

const App: Component = () => {
  return (
    <FishProvider>
      <TestFisheries />
      <div className={styles.App}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
        </header>
      </div>
    </FishProvider>
  );
};

export default App;
