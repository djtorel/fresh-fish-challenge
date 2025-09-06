import {Component, For} from "solid-js";
import {Fish} from "../../types";
import styles from './FishCard.module.css';

interface FishCardProps {
  fish: Fish;
}

const FishCard: Component<FishCardProps> = (props) => {
  return (
    <div class={styles.fishCard}>
      <div class={styles.cardImageContainer}>
        <img
          src={props.fish.SpeciesIllustrationPhoto.src}
          alt={props.fish.SpeciesIllustrationPhoto.alt}
          title={props.fish.SpeciesIllustrationPhoto.title}
          class={styles.cardImage}
        />
      </div>
      <div class={styles.cardContent}>
        <h2 class={styles.speciesName}>{props.fish.SpeciesName}</h2>

        <div class={styles.nutrition}>
          <p><strong>Calories:</strong> <span>{props.fish.Calories.toFixed(0)}</span></p>
          <p><strong>Fat:</strong> <span>{props.fish.FatTotal.toFixed(1)} g</span></p>
        </div>

        <div class={styles.infoSection}>
          <h3>Health Benefits</h3>
          <p class={styles.healthBenefits}>{props.fish.HealthBenefits}</p>
        </div>

        <div class={styles.infoSection}>
          <h3>Biology</h3>
          <ul class={styles.biologyList}>
            <For each={props.fish.Biology}>
              {(item) => <li>{item}</li>}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FishCard;