// https://github.com/torch2424/wasm-by-example/blob/master/demo-util/
const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response = undefined;

  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject,
    );
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
        response.arrayBuffer(),
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };

    response = await fetchAndInstantiateTask();
  }

  return response;
};

const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.

// load the wasm module once
export const getWasm = async () => {
  // Get the importObject from the go instance.
  const importObject = go.importObject;

  // Instantiate our wasm module
  const wasmModule = await wasmBrowserInstantiate(
    "gol_go/pkg/main.wasm",
    importObject,
  );
  go.run(wasmModule.instance);
  return wasmModule;
};
const wasmModule = await getWasm();

// wasm binds
export const newGOL = async (rows, cols) => {
  wasmModule.instance.exports.new(rows, cols);
};

export const checkerboard = async () => {
  wasmModule.instance.exports.checkerboard();
};
export const step = async () => {
  return wasmModule.instance.exports.step();
};

// export const runWasmAdd = async () => {
//   // Get the importObject from the go instance.
//   const importObject = go.importObject;
//
//   // Instantiate our wasm module
//   const wasmModule = await wasmBrowserInstantiate(
//     "gol_go/pkg/main.wasm",
//     importObject,
//   );
//
//   // Allow the wasm_exec go instance, bootstrap and execute our wasm module
//   go.run(wasmModule.instance);
//
//   // Call the Add function export from wasm, save the result
//   const addResult = wasmModule.instance.exports.add(24, 24);
//
//   // Set the result onto the body
//   document.body.textContent = `Hello World! addResult: ${addResult}`;
// };
