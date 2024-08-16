import { assert } from '../utils/assert.js'
import { Modifier } from '../interfaces/modifier.js';

class Die {
  sides: number;
  quantity: number;
  modifier: Modifier;

  /**
   * @param {number} sides the number of sides the die has e.g : 6, 12, 20
   * @param {Modifier} modifier The modifiers that affect the roll.
   * @param {number} [quantity=1] the number of dice to roll e.g : 1, 2, 4
   *
   * @throws {Error} If `sides` is undefined or if `quantity` is not a positive integer
   */
  constructor(sides: number, quantity: number, modifier: Modifier) {
    assert(sides > 0, "'sides' is required and must be a positive integer.");
    assert(
      quantity > 0,
      "'quantity' is required and must be a positive integer.",
    );
    this.sides = sides;
    this.modifier = modifier;
    this.quantity = quantity;
  }

  /**
   * Rolls the dice and returns a Promise<number> the number that was chosen
   * @param {number} sides - the number of sides the die has.
   * @param {Modifier} modifier - the number of sides the die has.
   * @returns {number} The result of the roll, including modifiers.
   */
  roll(sides: number, modifier: Modifier): number {
    // rolls the dice without thinking about modifiers
    const rollDice = () => Math.floor(Math.random() * sides);

    if (!(modifier.advantage || modifier.disadvantage)) {
      const result = rollDice();
      return result + modifier.mod;
    } else {
      const results = [rollDice(), rollDice()];

      results.sort((a: number, b: number) => b - a);

      if (modifier.advantage) {
        return results[0] + modifier.mod;
      } else {
        return results[1] + modifier.mod;
      }
    }
  }

  /**
   * Rolls the dice multiple times
   *
   * @param {Die} die
   * @return {number[]} roll
   */
  rollDice(die: Die): number {
    const results = new Array(die.quantity)
      .fill(0)
      .map(() => this.roll(die.sides, die.modifier));
    const final = results.reduce((x, y) => x + y);
    return final;
  }
}

export { Die };
