export function parseForm(form) {
  var data = {}
  form.querySelectorAll('input[id]').forEach((node) => {
    data[node.id] = node.value;
  });
  return data;
}

export function renderForm(dom, settings) {
  const form = dom.createElement('form');
  settings.fields.forEach((field) => {
    if (!field.type || field.type == 'text') {
      const div = dom.createElement('div');
      div.class = 'input';

      const label = dom.createElement('label');
      label.for = field.id;
      label.innerText = field.title;
      div.appendChild(label);

      const input = dom.createElement('input');
      input.type = 'text';
      input.id = field.id;
      if (settings.oninput) { input.addEventListener('input', settings.oninput) }
      div.appendChild(input);

      form.appendChild(div);
    } else {
      throw new Error('Unsupported field type: ' + field.type);
    }
  });
  
  if (settings.output) {
    const div = dom.createElement('div');
    div.innerText = settings.output;
    div.class = 'output';
    const span = dom.createElement('span');
    span.id = 'result';
    div.appendChild(span);
    form.appendChild(div);
  }
  return form
}
