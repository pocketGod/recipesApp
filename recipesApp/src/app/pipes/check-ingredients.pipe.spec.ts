import { CheckIngredientsPipe } from './check-ingredients.pipe';

describe('CheckIngredientsPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckIngredientsPipe();
    expect(pipe).toBeTruthy();
  });
});
