import styles from './FisheryRegionPage.module.css';
import {Component, createEffect, For} from 'solid-js';
import {FisheryRegion} from "../../types";
import FishCard from "../FishCard/FishCard";

interface RegionPageProps {
  regionName: string;
  regionData: FisheryRegion;
}

const RegionPage: Component<RegionPageProps> = (props) => {
  createEffect(() => {
    console.log("RegionPage", props.regionData);
  })
  return (
    <div className={styles.regionContainer}>
      <h1 class={styles.title}>
        Fish of the <span class={styles.regionHighlight}>{props.regionName}</span> Region
      </h1>

      <div className={styles.regionSummary}>
        <div className={styles.summaryStat}>
          <p>Average Calories</p>
          <span>{props.regionData.AverageCalories.toFixed(2)}</span>
        </div>
        <div className={styles.summaryStat}>
          <p>Average Fat</p>
          <span>{props.regionData.AverageFatTotal.toFixed(2)}g</span>
        </div>
      </div>

      <div className={styles.fishList}>
        <For each={props.regionData.Fish}>
          {(fish) => <FishCard fish={fish}/>}
        </For>
      </div>
    </div>
  );
};

export default RegionPage;
