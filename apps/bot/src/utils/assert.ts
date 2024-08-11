function assert(valid: unknown, msg: string) {
  if (!valid) {
    throw new Error(`assert was invalid: ${msg}`)
  }
}

export { assert }
