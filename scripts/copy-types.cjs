const fs = require('node:fs');
const path = require('node:path');
const network = process.env.DFX_NETWORK || 'local';
const generated = path.join('.dfx', network, 'canisters');
const target = 'src/declarations';
if (fs.existsSync(generated)) {
  fs.cpSync(generated, target, {recursive: true, filter: source => !/\.(wasm)$/.test(source) && !['assets','idl'].includes(path.basename(source))});
} else {
  for (const name of ['hello', 'hello_assets']) {
    for (const file of ['index.js', name + '.did.js']) {
      if (!fs.existsSync(path.join(target, name, file))) throw new Error('Missing committed Candid binding: ' + name + '/' + file);
    }
  }
  console.log('Using committed Candid bindings; run dfx generate after canister interface changes.');
}
