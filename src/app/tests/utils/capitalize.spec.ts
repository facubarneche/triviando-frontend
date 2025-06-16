import { capitalize } from '@/app/utils/capitalize';

describe('Capitalize', () => {
  it('should return a string capitalized', () => {
    const testWord = 'bienvenido a triviando';
    const expectedResult = 'Bienvenido a triviando';

    const capitalizedWord = capitalize(testWord);

    expect(capitalizedWord).toEqual(expectedResult);
  });
});
