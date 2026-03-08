/**
 * Command Reference Utilities
 *
 * Utilities for transforming command references to tool-specific formats.
 */

/**
 * Transforms colon-based command references to hyphen-based format.
 * Converts `/opsp:` patterns to `/opsp-` for tools that use hyphen syntax.
 *
 * @param text - The text containing command references
 * @returns Text with command references transformed to hyphen format
 *
 * @example
 * transformToHyphenCommands('/opsp:new') // returns '/opsp-new'
 * transformToHyphenCommands('Use /opsp:apply to implement') // returns 'Use /opsp-apply to implement'
 */
export function transformToHyphenCommands(text: string): string {
  return text.replace(/\/opsp:/g, '/opsp-');
}
