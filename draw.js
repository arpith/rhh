import vis from 'vis';
import Chart from 'chart.js';

export default function draw(histogram) {
  const canvas = document.getElementById("histogram");
  const labels = Object.keys(histogram);
  const data = labels.map(key => histogram[key]);
  const backgroundColor = labels.map(() => 'rgba(148, 132, 194, 0.5)');
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Number of times this graph was generated',
        data,
        backgroundColor,
      }],
    },
  });
}
