import { rhh } from './solve';

const inputN = document.getElementById('n');
const inputQ = document.getElementById('q');

function fillForm(n, q) {
  inputN.value = n || '';
  inputQ.value = q;
}

function getParams() {
  const searchString = window.location.search.substring(1);
  const params = {};
  searchString.split('&').forEach((paramString) => {
    const [ key, value ] = paramString.split('=');
    params[key] = parseInt(value);
  });
  return params;
}

function generate(evt) {
  evt.preventDefault();
  const n = inputN.value;
  const q = inputQ.value;
  window.location.search = `n=${n}&q=${q}`;
  return false;
};

document.forms['degree-seq'].onsubmit = generate;
let { n, q } = getParams();
if (!q && q !== 0) {
  q = 1;
}
fillForm(n, q);
if (n) {
  rhh(n, q);
}
