import { rhh } from './solve';

const input = document.getElementById('input');

function fillForm(n) {
  input.value = n || '';
}

function getN() {
  const searchString = window.location.search.substring(1);
  const [ key, value ] = searchString.split('=');
  return parseInt(value);
}

function generate(evt) {
  evt.preventDefault();
  const n = input.value;
  window.location.search = `n=${n}`;
  return false;
};

document.forms['degree-seq'].onsubmit = generate;
const n = getN();
fillForm(n);
if (n) {
  rhh(n);
}
