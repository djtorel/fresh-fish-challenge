export interface Image {
  alt: string;
  src: string;
  title: string;
}

export interface FishData {
  NOAAFisheriesRegion: string;
  Calories: string;
  FatTotal: string;
  SpeciesName: string;
  SpeciesIllustrationPhoto: Image;
  Biology: string;
  HealthBenefits: string;
}

export interface Fish {
  Calories: number;
  FatTotal: number;
  SpeciesName: string;
  SpeciesIllustrationPhoto: Image;
  Biology: string[];
  HealthBenefits: string;
}

export interface FisheryRegion {
  AverageCalories: number;
  AverageFatTotal: number;
  Fish: Fish[];
}

// Dictionary/Map of NOAA FishRegions
export interface FisheryRegions {
  [region: string]: FisheryRegion;
}

export interface FishAccumulator {
  SumCalories: number;
  SumFat: number;
  Count: number;
  Fish: Fish[];
}

// Used to accumulate averages and fish for a region
export interface RegionAccumulator {
  [region: string]: FishAccumulator;
}