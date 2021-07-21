/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} ron_multi_png
* @param {Uint8Array} height_png
* @param {Uint8Array} material_hi_png
* @param {Uint8Array} material_lo_png
* @returns {Uint8Array}
*/
export function ron2vmp(ron_multi_png: Uint8Array, height_png: Uint8Array, material_hi_png: Uint8Array, material_lo_png: Uint8Array): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly ron2vmp: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly main: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
