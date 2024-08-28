import { getTxHash } from './safeUtils';

export function component(dom) {
  const element = dom.createElement('div');
  element.innerText = getTxHash();
  return element;
}       

export function App(dom) {
  dom.getElementById('app').appendChild(component(dom));
}

if (typeof window !== 'undefined') {
  window.App = App;
}
