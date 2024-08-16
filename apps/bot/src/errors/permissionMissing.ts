/**
 * Exception thrown when required permissions are missing.
 */
export class MissingPermissionsException extends Error {
  /**
   * Constructs a new MissingPermissionsException.
   *
   * @param permissions - The list of missing permissions.
   */
  constructor(public permissions: string[]) {
    super(`Missing permissions: ${permissions.join(', ')}`);

    this.name = 'MissingPermissionsException';
    Object.setPrototypeOf(this, MissingPermissionsException.prototype);
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
