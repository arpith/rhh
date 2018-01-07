import { rhh } from './solve';

const input = document.getElementById('input');
//const type = document.getElementById('type');
const type = 'stack';
const steps = document.getElementById('steps');

function fillForm({seq}) {
  input.value = seq || '';
}

function getParams() {
  const search = window.location.search.substring(1);
  const params = {};
  search.split('&').forEach((p) => {
    const [key, value] = p.split('=');
    params[key] = value;
  });
  return params;
}

function generate(evt) {
  evt.preventDefault();
  const seq = input.value.split(',').map(s => s.trim()).join(',');
  window.location.search = `seq=${seq}`;
  return false;
};

document.forms['degree-seq'].onsubmit = generate;
let params = getParams();
fillForm(params);
if (params.seq) {
  rhh(params);
}
