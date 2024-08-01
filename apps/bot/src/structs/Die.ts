import { Modifier } from '../interfaces/Modifier.js'
//import { Modifier } from '../interfaces/Modifier.ts'
/**
 * our dices structs so we have less problems later when trying to implement stuff to work with dices
 */
class Die {
  sides: number;
  qty: number = 1;
  modifier: Modifier;
  min: number = 1;
  max: number|null;
  description: string|null;
  /**
   * @param {number} sides The number of sides the die has e.g : 6, 12, 20
   * @param {number} [qty=1] the number of dice to roll e.g : 1, 2, 4
   * @param {number[]} Modifier[] the modifiers that affect your die
   * @param {number} [min=1]  minimum possible roll value
   * @param {number} [max=null] The maximum possible roll value. Defaults to number of 'sides'
   * @param {string|null} [description=null] The roll description
   *
   * @throws {RequiredArgumentError} sides is required
   * @throws {TypeError} qty must be a positive integer, and modifiers must be valid.
   */
  constructor(
    sides: number,
    qty: number,
    modifier: Modifier,
    min: number,
    max: number,
    description: string | null,
  ) {
    try {
      this.sides = sides;
      this.modifier = modifier;
      this.min = min;
      this.max = max !== null ? max : sides;
      this.description =
        description !== null
          ? description
          : 'there was no description provived.';
      this.qty = qty;
    } catch (e: unknown) {
      const error = e as Error;
      console.error(`error found: "${error}": "${error.message}"`);
      if (sides === undefined) {
        throw new Error("'sides' is required");
      } else {
        throw new Error('qty must be a positive integer');
      }
    }
  }

  async roll(sides: number, min: number, max: number): Promise<number> {
    const result = Math.floor((Math.random() * sides) + (Math.random() * max))
    if(result > max || result < min) {
      return result > max ? 20 : 1
    }
    return result;
  }
  /**
   * @param {Die} die
   * @return {Promise<number[]>} roll
   */
  async rollDices(die: Die): Promise<number[]> {
    const results: number[] = []
    for(let i = 0; i < die.qty ; ++i) {
      results.push(await this.roll(die.sides, die.min, die.max !== null ? die.max : die.sides))
    }

    return results;
  }

}

export { Die };
