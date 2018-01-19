import Chart from 'chart.js';

Chart.defaults.global.defaultFontColor = 'rgba(148, 132, 194, 0.9)';
export default function draw(histogram) {
  const canvas = document.getElementById("histogram");
  const labels = Object.keys(histogram).sort();
  const total = Object.values(histogram).reduce((a, v) => (a+v));
  const data = labels.map(key => histogram[key]/total);
  const chart = new Chart(canvas, {
    type: 'bar',
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      animation: {
        onComplete: function () {
          var chartInstance = this.chart;
          var ctx = chartInstance.ctx;
          var height = chartInstance.controller.boxes[0].bottom;
          ctx.textAlign = "center";

          Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            Chart.helpers.each(meta.data.forEach(function (bar, index) {
              var centerPoint = bar.getCenterPoint();
              ctx.fillText(dataset.data[index], centerPoint.x, centerPoint.y);
            }),this);
          }),this);
        }
      }
    },
    data: {
      labels,
      datasets: [{
        label: 'Fraction of times this graph was generated',
        data,
        backgroundColor: 'rgba(255, 225, 207, 0.7)',
        borderColor: 'rgba(148, 132, 194, 0.9)',
        borderWidth: 1,
      }],
    },
  });
}
