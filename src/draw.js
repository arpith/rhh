import Chart from 'chart.js';

export default function draw(histogram) {
  const canvas = document.getElementById("histogram");
  const labels = Object.keys(histogram).sort();
  const data = labels.map(key => histogram[key]);
  const chart = new Chart(canvas, {
    type: 'bar',
    options: {
      legend: {
        display: false,
      },
    },
    data: {
      labels,
      datasets: [{
        label: 'Number of times this graph was generated',
        data,
        backgroundColor: 'rgba(255, 225, 207, 0.7)',
        borderColor: 'rgba(148, 132, 194, 0.9)',
        borderWidth: 1,
      }],
    },
  });
}
