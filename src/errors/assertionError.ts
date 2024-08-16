/**
 * Exception thrown when the assertion is wrong.
 */
export class AssertionError extends Error {
  /**
   * Constructs a new AssertionError.
   *
   * @param permissions - The list of missing permissions.
   */
  constructor(public assertion: string) {
    super(`Assertion error: ${assertion}`);

    this.name = 'MissingPermissionsException';
    Object.setPrototypeOf(this, AssertionError.prototype);
  }

  /**
   * Returns a string representation of the exception.
   *
   * @returns A string describing the missing permissions.
   */
  public toString(): string {
    return this.message;
  }
}
