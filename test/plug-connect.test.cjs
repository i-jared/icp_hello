const {test} = require('node:test');
const assert = require('node:assert/strict');
const {connectPlug} = require('../src/hello_assets/src/components/plug-connection.cjs');
test('passes only the requested canisters and host and calls back after approval', async () => {
  const options = {whitelist: ['fixture-canister'], host: 'http://127.0.0.1:8000'};
  const events = [];
  await connectPlug({requestConnect: async actual => {assert.deepEqual(actual, options); events.push('request');}, isConnected: async () => true}, options, async () => events.push('connected'));
  assert.deepEqual(events, ['request','connected']);
});
test('declined or unavailable wallets do not mark the app connected', async () => {
  let connected = false;
  await assert.rejects(connectPlug(undefined, {}, () => {connected = true;}), /Install/);
  await assert.rejects(connectPlug({requestConnect: async () => false, isConnected: async () => false}, {}, () => {connected = true;}), /declined/);
  await assert.rejects(connectPlug({requestConnect: async () => {throw new Error('rejected');}}, {}, () => {connected = true;}), /rejected/);
  assert.equal(connected, false);
});
