import { countryCodes } from '@/app/utils/countryCodes';

describe('Country Codes Spec', () => {
  it("should return Argentina's code", async () => {
    const dictionaryCountryCodes = countryCodes.reduce<Record<string, string>>((dict, item) => {
      dict[item.country] = item.code;
      return dict;
    }, {});

    expect(dictionaryCountryCodes['Argentina']).toEqual('+54');
  });
});
