import React, {useState} from 'react';
import {connectPlug} from './plug-connection.cjs';
export default function PlugConnect({whitelist, host, onConnectCallback}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function connect() {
    setPending(true);
    setError('');
    try {
      await connectPlug(window.ic && window.ic.plug, {whitelist, ...(host ? {host} : {})}, onConnectCallback);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Wallet connection failed.');
    } finally { setPending(false); }
  }
  return <div>
    <button className="myButton specialButton" disabled={pending} onClick={connect}>
      {pending ? 'Connecting…' : 'Connect to Plug'}
    </button>
    {error && <p role="alert">{error}</p>}
  </div>;
}
