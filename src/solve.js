import RHH from './RHH';
import draw from './draw';

function isNonIncreasing(seq) {
  // O(n)
  return seq.every(({degree}, i) => {
    return i === 0 || degree <= seq[i - 1]['degree'];
  });
}

function isOddOdd(seq) {
  // O(n)
  return seq.filter(({degree}) => degree % 2 != 0).length % 2 != 0;
}

function incrementCount(histogram, cycles) {
  if (!histogram[cycles]) {
    histogram[cycles] = 0;
  }
  histogram[cycles]++;
}

export function rhh(n) {
  const degreeSeq = Array(n).fill(2);
  console.log(n, degreeSeq);
  const messageDiv = document.getElementById('message');
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 
    'W', 'X', 'Y', 'Z'];
  const seq = degreeSeq.map((degree, i) => {
    return { id: i, label: `${labels[i]}: ${degree}`, degree };
  });
  if (!isNonIncreasing(seq)) {
    messageDiv.innerHTML = "Not non-increasing";
  } else if (isOddOdd(seq)) {
    messageDiv.innerHTML = "Odd number of odd degree vertices";
  } else {
    let i = 0;
    const histogram = {};
    while (i < 10000) {
      const seq = degreeSeq.map((degree, i) => {
        return { id: i, label: `${labels[i]}: ${degree}`, degree };
      });
      const rhh = new RHH(seq);
      rhh.graph.getCycles();
      const cycles = rhh.graph.cycles;
      const cycleLengths = cycles.map(cycle => cycle.length).sort().toString();
      incrementCount(histogram, cycleLengths);
      i++;
    }
    draw(histogram);
  }
}
