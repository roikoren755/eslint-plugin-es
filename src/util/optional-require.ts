/**
 * Load a module optionally.
 * @param {Function} originalRequire The original `require` function.
 * @param {string} id The module specifier.
 */
export const optionalRequire = <T>(originalRequire: (id: string) => T, id: string): T | undefined => {
  try {
    return originalRequire(id);
  } catch (error) {
    if ((error as { code?: string })?.code === 'MODULE_NOT_FOUND') {
      // eslint-disable-next-line consistent-return
      return undefined;
    }

    throw error;
  }
};
