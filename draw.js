import vis from 'vis';

let mergeCount = 0;
let stackCount = 0;
let queueCount = 0;
let transferCount = 0;

export default function draw(histogram) {
  const container = document.getElementById('histogram');
  //const items = Object.entries(histogram).map(([x, y]) => {
    //return {x, y};
  //});
  //console.log(items);
  var items = [
        {x: '2014-06-11', y: 10},
        {x: '2014-06-12', y: 25},
        {x: '2014-06-13', y: 30},
        {x: '2014-06-14', y: 10},
        {x: '2014-06-15', y: 15},
        {x: '2014-06-16', y: 30}
    ];
  const options = {
    style:'bar',
    barChart: {width:50, align:'center'}, // align: left, center, right
    drawPoints: false,
    dataAxis: {
      icons:true
    },
    start: '2014-06-10',
    end: '2014-06-18'
  };
  var graph2d = new vis.Graph2d(container, items, options);
}
