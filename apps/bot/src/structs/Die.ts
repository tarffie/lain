import { Modifier } from '../interfaces/Modifier.js';
//import { Modifier } from '../interfaces/Modifier.ts'
/**
 * our dices structs so we have less problems later when trying to implement stuff to work with dices
 */
class Die {
  sides: number;
  qty: number = 1;
  modifier: Modifier;
  description: string | null;
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
    { mod, advantage, disadvantage }: Modifier,
    description: string | null,
  ) {
    try {
      this.sides = sides;
      this.modifier = {
        mod,
        advantage,
        disadvantage,
      };
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

  async roll(
    sides: number,
    hasAdv = false,
    hasDis = false,
    mods: number,
  ): Promise<number> {
    if (!(hasAdv || hasDis)) {
      let result = Math.floor(Math.random() * sides + Math.random() * sides);
      if (result > sides) result = 20;
      console.log(`you rolled ${result} with ${mods} as mods`);
      return result + mods;
    } else {
      const results: number[] = [];
      for (;;) {
        const num = Math.floor(Math.random() * sides + Math.random() * sides);
        if (num <= sides) {
          results.push(num);
        }
        if (results.length == 2) break;
      }
      // consider using map you beautiful bastard
      results.sort((a: number, b: number) => b - a);
      if (hasAdv) {
        console.log(
          `you rolled ${results[0]} (advantage) with ${mods} as mods, the lesser die was ${results[1]}`,
        );
        return results[0] + mods;
      } else {
        console.log(
          `you rolled ${results[1]} (disadvantage) with ${mods} as mods, the bigger die was ${results[0]}`,
        );
        return results[1] + mods;
      }
    }
  }
  /**
   * @param {Die} die
   * @return {Promise<number[]>} roll
   */
  async rollDice(die: Die): Promise<number[]> {
    const results: number[] = [];
    for (let i = 0; i < die.qty; ++i) {
      results.push(
        await this.roll(
          die.sides,
          die.modifier['advantage'],
          die.modifier['disadvantage'],
          die.modifier.mod,
        ),
      );
    }
    return results;
  }
}

export { Die };
