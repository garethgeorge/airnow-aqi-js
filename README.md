# Airnow AQI

JavaScript utility for converting PPM readings to AQI values (as defined by airnow.gov as of Sept 2018) based on [this reference document](https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf).

Currently supported pollutant types:

- PM2.5
- PM10

## Installation

```
npm install --save airnow-aqi
```

## Usage

```ts
import { computeAqi } from "airnow-aqi";
computeAqi([
  // provide an array of type and ppm reading values
  {
    type: "pm2.5", // valid types are "pm2.5" and "pm10"
    ppm: 10,
  },
]); // -> numeric AQI value is returned, -1 if PPM values are out of range.
```

TypeScript typings are provided for this package.
