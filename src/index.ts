/**
 * AQI Conversions based on data from page 13 of the published values from airnow.gov
 * See reference: https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf
 */

export type ParticulateType = "pm2.5" | "pm10";

export interface Measurement {
  type: ParticulateType;
  ppm: number;
}

const breakpoints: { [pt: string]: number[] } = {
  "pm2.5": [0, 12, 35.4, 150.4, 250.4, 350.4, 500.4],
  pm10: [0, 54, 154, 254, 354, 424, 504, 604],
};

const aqiLevels = [0, 50, 100, 150, 200, 300, 400, 500];

const findIdx = (values, val) => {
  for (let i = 1; i < values.length; ++i) {
    if (values[i - 1] <= val && val < values[i]) {
      return i - 1;
    }
  }
  return -1;
};

const measurementAqi = (measurement: Measurement) => {
  const idx = findIdx(breakpoints[measurement.type], measurement.ppm);
  if (idx == -1) {
    return aqiLevels[aqiLevels.length - 1];
  }

  const ppm = measurement.ppm,
    ilo = aqiLevels[idx],
    ihi = aqiLevels[idx + 1],
    bplo = breakpoints[measurement.type][idx],
    bphi = breakpoints[measurement.type][idx + 1];
  return ((ihi - ilo) / (bphi - bplo)) * (ppm - bplo) + ilo;
};

export const computeAqi = (measurements: Measurement[]) => {
  if (measurements.length === 0) {
    return -1;
  }
  return (
    Math.round(
      measurements.map(measurementAqi).reduce((p, c) => Math.max(p, c)) * 10
    ) / 10
  );
};
