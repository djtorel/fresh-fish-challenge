import type { Component } from 'solid-js';
import styles from './Home.module.css';
import {useFishProvider} from "../../context/DataContext";

const Home: Component = () => {
  const regions = useFishProvider();

  return (
    <div class={styles.homeContainer}>
      <h1 class={styles.title}>NOAA Fishery Regions</h1>
      <p class={styles.subtitle}>
        An overview of average nutritional information for fish across different regions.
      </p>

      <Show when={!regions.loading} fallback={<div class={styles.loading}>Loading nutritional data...</div>}>
        <div class={styles.regionList}>
          <For each={Object.entries(regions() || {})}>
            {([regionName, regionData]) => (
              <div class={styles.regionCard}>
                <h2 class={styles.regionName}>{regionName}</h2>
                <div class={styles.regionStats}>
                  <p>
                    <strong>Avg. Calories:</strong>
                    <span>{regionData.AverageCalories.toFixed(1)}</span>
                  </p>
                  <p>
                    <strong>Avg. Fat Total:</strong>
                    <span>{regionData.AverageFatTotal.toFixed(1)} g</span>
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default Home;
