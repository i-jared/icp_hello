async function connectPlug(plug, options, onConnected) {
  if (!plug) throw new Error('Install the Plug wallet extension to connect.');
  await plug.requestConnect(options);
  if (!(await plug.isConnected())) throw new Error('Wallet connection was declined.');
  await onConnected();
}
module.exports = {connectPlug};
