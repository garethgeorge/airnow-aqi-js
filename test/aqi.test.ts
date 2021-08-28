import { computeAqi, ParticulateType } from "../src";
import expect from "expect";

describe("computeAqi", () => {
  const checkMath = (
    type: ParticulateType,
    ppm: number,
    expectedAqi: number
  ) => {
    it(`should return ${expectedAqi} AQI  for ${ppm}ppm ${type}`, () => {
      expect(
        computeAqi([
          {
            type,
            ppm,
          },
        ])
      ).toBeCloseTo(expectedAqi, 1);
    });
  };

  checkMath("pm2.5", /* ppm= */ 0, /* expectedAqi= */ 0);
  checkMath("pm2.5", /* ppm= */ 12, /* expectedAqi= */ 50);
  checkMath("pm2.5", /* ppm= */ 35.5, /* expectedAqi= */ 100);
  checkMath("pm2.5", /* ppm= */ 6, /* expectedAqi= */ 25);

  checkMath("pm10", /* ppm= */ 0, /* expectedAqi= */ 0);
  checkMath("pm10", /* ppm= */ 54, /* expectedAqi= */ 50);
});
