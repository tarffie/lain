import { Die } from '../structs/Die.js';
import { Modifier } from '../interfaces/Modifier.js';
//import { Die } from '../structs/Die.ts'

/*
 * @param {number} sides - the number of die faces
 * @param {number} min – the minimum possible value
 * @param {number} max – the maximum possible value
 * @return {Promise<number>} result - which face the die fell on
 */
async function roll(sides: number, min: number, max: number): Promise<number> {
  const result = Math.floor(Math.random() * sides + Math.random() * max);
  if (result > max || result < min) {
    return result > max ? 20 : 1;
  }
  return result;
}

async function addRollMods(roll: number, modifier: Modifier): Promise<number> {
  const result = roll;
  for (const key in modifier) {
    // this will generally translate into roll + (n value)
    console.log(key);
  }
  return result;
}

/**
 * @param {Die} die
 * @return {Promise<number[]>} roll
 */
async function rollDices(die: Die): Promise<number[]> {
  const results: number[] = [];

  if ('advantage' in die.modifier) {
    for (let i = 0; i < die.qty; ++i) {
      const roll1 = await roll(
        die.sides,
        die.min,
        die.max !== null ? die.max : die.sides,
      );
      const roll2 = await roll(
        die.sides,
        die.min,
        die.max !== null ? die.max : die.sides,
      );
      results.push(roll1 > roll2 ? roll1 : roll2);
    }
    return results;
  }

  if ('disadvantage' in die.modifier) {
    for (let i = 0; i < die.qty; ++i) {
      const roll1 = await roll(
        die.sides,
        die.min,
        die.max !== null ? die.max : die.sides,
      );
      const roll2 = await roll(
        die.sides,
        die.min,
        die.max !== null ? die.max : die.sides,
      );
      results.push(roll1 < roll2 ? roll1 : roll2);
    }
    return results;
  }

  for (let i = 0; i < die.qty; ++i) {
    results.push(
      await roll(die.sides, die.min, die.max !== null ? die.max : die.sides),
    );
  }

  return results;
}

// roll -> mods [advantage, disavantage, bonuses]

export { rollDices };
