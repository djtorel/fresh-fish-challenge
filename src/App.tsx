import {Component, createEffect, createSignal, Match, Resource, Show, Switch} from 'solid-js';

import {useFishProvider} from "./context/DataContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import {FisheryRegion} from "./types";
import FisheryRegionPage from "./components/FisheryRegionPage/FisheryRegionPage";

const App: Component = () => {
  const [activeRegion, setActiveRegion] = createSignal('home');
  const regions = useFishProvider();

  return (
      <Layout onNavigate={setActiveRegion}>
        <Switch>
          <Match when={activeRegion() === 'home'}>
            <Home />
          </Match>
          <Match when={activeRegion() !== 'home'}>
            <Show
              when={regions()?.[activeRegion()]}
              fallback={<div>Loading region details...</div>}
            >
              <FisheryRegionPage regionData={regions()?.[activeRegion()] as FisheryRegion} regionName={activeRegion()} />
            </Show>
          </Match>
        </Switch>
      </Layout>
  );
};

export default App;
