/**
 * Represents a modifier for a dice roll, including advantages, disadvantages, and the numerical modification.
 */
interface Modifier {
  advantage: boolean;
  disadvantage: boolean;
  mod: number;
}

export { Modifier };
