export function component(dom) {
  const element = dom.createElement('div');
  return element;
}       

export function App(dom) {
  dom.getElementById('app').appendChild(component(dom));
}

if (typeof window !== 'undefined') {
  window.App = App;
}
