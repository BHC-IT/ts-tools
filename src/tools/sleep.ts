/**
 * This is the documentation for sleep.ts
 *
 * @packageDocumentation
 * @module sleep
 *
 */

/**
 * This function will returned a promise lock for timeout milliseconds.
 *
 * @param timeout	Time in milliseconds before releaseing the lock.
 * @returns 		A void promise to release the await.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const sleep = async (timeout: number): Promise<void> =>
	new Promise((resolve: () => void) => setTimeout(() => resolve(), timeout))
