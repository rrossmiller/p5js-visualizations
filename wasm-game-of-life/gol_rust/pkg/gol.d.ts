/* tslint:disable */
/* eslint-disable */
/**
*/
export class GameOfLife {
  free(): void;
/**
* @param {number} rows
* @param {number} cols
*/
  constructor(rows: number, cols: number);
/**
*/
  checkerboard(): void;
/**
* @param {number} prob
*/
  init(prob: number): void;
/**
* @returns {Int8Array}
*/
  step(): Int8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_gameoflife_free: (a: number) => void;
  readonly gameoflife_new: (a: number, b: number) => number;
  readonly gameoflife_checkerboard: (a: number) => void;
  readonly gameoflife_init: (a: number, b: number) => void;
  readonly gameoflife_step: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
