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
/**
* @param {string} ini
* @param {Uint8Array} vmp
* @param {Uint8Array} vpr
* @param {Uint8Array} palette
*/
export function vmp2ron(ini: string, vmp: Uint8Array, vpr: Uint8Array, palette: Uint8Array): void;
/**
* @returns {Uint8Array}
*/
export function get_ron_multi_png(): Uint8Array;
/**
* @returns {Uint8Array}
*/
export function get_height_png(): Uint8Array;
/**
* @returns {Uint8Array}
*/
export function get_material_hi_png(): Uint8Array;
/**
* @returns {Uint8Array}
*/
export function get_material_lo_png(): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly ron2vmp: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly vmp2ron: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly get_ron_multi_png: (a: number) => void;
  readonly get_height_png: (a: number) => void;
  readonly get_material_hi_png: (a: number) => void;
  readonly get_material_lo_png: (a: number) => void;
  readonly main: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
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
