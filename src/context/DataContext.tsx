import type {Component, ParentProps} from 'solid-js';
import {Accessor, createContext, createMemo, createResource, type Resource, useContext} from 'solid-js';
import html from "solid-js/html";

interface Image {
  alt: string;
  src: string;
  title: string;
}

interface FishData {
  NOAAFisheriesRegion: string;
  Calories: string;
  FatTotal: string;
  SpeciesName: string;
  SpeciesIllustrationPhoto: Image;
  Biology: string;
  HealthBenefits: string;
}

interface Fish {
  Calories: number;
  FatTotal: number;
  SpeciesName: string;
  SpeciesIllustrationPhoto: Image;
  Biology: string[];
  HealthBenefits: string;
}

interface FisheryRegion {
  AverageCalories: number;
  AverageFatTotal: number;
  Fish: Fish[];
}

// Dictionary/Map of NOAA FishRegions
interface FisheryRegions {
  [region: string]: FisheryRegion;
}

interface FishAccumulator {
  SumCalories: number;
  SumFat: number;
  Count: number;
  Fish: Fish[];
}

// Used to accumulate averages and fish for a region
interface RegionAccumulator {
  [region: string]: FishAccumulator;
}

export interface FishContextValue {
  FishResource: Resource<FishData[] | undefined>;
  NOAAFisheriesRegions: Accessor<FisheryRegions | undefined>;
}

const removeHtml = (html: string): string => {
  // This is ugly but it works I guess
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  return tempDiv.textContent || tempDiv.innerText || '';
}

const mapHtmlToList = (html: string): string[] => {
  const plainText = removeHtml(html);

  return plainText.split(/\r?\n/).filter((line: string) => line.trim());
}

const mapAccumulator = (accumulator: FishAccumulator, fishData: FishData): FishAccumulator => {
  const { SpeciesName, FatTotal, Calories, SpeciesIllustrationPhoto } = fishData;
  const currentCalories = parseInt(Calories);
  const currentFatTotal = parseFloat(FatTotal);

  return {
    Fish: [...accumulator.Fish, {
      Calories: currentCalories,
      FatTotal: currentFatTotal,
      SpeciesName,
      SpeciesIllustrationPhoto,
      Biology: mapHtmlToList(fishData.Biology),
      HealthBenefits: removeHtml(fishData.HealthBenefits),
    }],
    SumCalories: accumulator.SumCalories += currentCalories,
    SumFat: accumulator.SumFat += currentFatTotal,
    Count: accumulator.Count += 1
  }
};

const mapFishRegions = (fishData: FishData[]): FisheryRegions => {

  // Get sums first to map averages to avoid recursive loops
  const sumsByRegion = fishData.reduce<RegionAccumulator>((acc, currentFish) => {
    const regionName = currentFish.NOAAFisheriesRegion;
    const currentRegionAcc = acc[regionName] || { SumCalories: 0, SumFat: 0, Count: 0, Fish: [] };

    acc[regionName] = mapAccumulator(currentRegionAcc, currentFish)

    return acc;
  }, {})

  // Map Regions to new object using Region as key with averages and Fish
  return Object.fromEntries(
    Object.entries(sumsByRegion).map(([region, data]) => {
      const averageCalories = data.SumCalories / data.Count;
      const averageFat = data.SumFat / data.Count;

      return [region, {
        AverageCalories: averageCalories,
        AverageFatTotal: averageFat,
        Fish: data.Fish,
      }]
    })
  );
}

const fetchRegionData = async (): Promise<FisheryRegions> => {
  const response = await fetch(`http://localhost:5001/gofish?apikey=abrradiology`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const rawData = await response.json();
  // console.log(rawData);
  return mapFishRegions(rawData);
};

const FishContext = createContext<Resource<FisheryRegions>>();

export const FishProvider: Component<ParentProps> = (props) => {
  const [fishData] = createResource<FisheryRegions>(fetchRegionData);

  return (
    <FishContext.Provider value={fishData}>
      {props.children}
    </FishContext.Provider>
  )
};

export function useFishProvider() {
  const context = useContext(FishContext);
  if (!context) {
    throw new Error('useFisheryProvider must be defined');
  }
  return context;
}