import { getTxHash } from './safeUtils';
import { parseForm, renderForm } from './helpers';

export function App(dom) {
  const app = dom.getElementById('app');
  app.appendChild(renderForm(dom, {
    fields: [
      {id: 'safe', title: 'Safe address'},
      {id: 'chainId', title: 'Chain ID'},
      {id: 'to', title: 'To address'},
      {id: 'nonce', title: 'Nonce'},
      {id: 'value', title: 'Value'},
      {id: 'calldata', title: 'Calldata'},
    ],
    oninput: () => {
      const data = parseForm(app);
      var hash;
      try {
        hash = getTxHash(data.safe, data.chainId, data.nonce, data.to, data.value, data.calldata);
      } catch (e) {
        console.log(e);
      }
      app.querySelector('#result').innerText = hash;
    },
    output: 'Calculated hash: ',
  }));
}

// Does not work in tests otherwise
if (typeof window !== 'undefined') {
  window.App = App;
}
