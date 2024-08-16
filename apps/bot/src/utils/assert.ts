import { AssertionError } from "@errors/assertionError";

/**
 * Asserts that a condition is true. Throws an error with a specified message if the condition is false.
 *
 * @param condition - The condition to assert as true.
 * @param message - The error message to include if the condition is false.
 * @throws {Error} Throws an error if the condition is false.
 */
function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new AssertionError(message)
  }
}

export { assert };