var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
"use strict";
Morris.Area({
  element: 'area',
  data: [
    {x: '2014 4', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2015 1', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2016 2', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2017 1', y: randomScalingFactor(), z: randomScalingFactor()}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z'],
  resize: true
});

Morris.Bar({
  element: 'bar',
  data: [
    {x: '2014 4', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2015 1', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2016 2', y: randomScalingFactor(), z: randomScalingFactor()},
    {x: '2017 1', y: randomScalingFactor(), z: randomScalingFactor()}
  ],
  xkey: 'x',
  ykeys: ['y', 'z', 'a'],
  labels: ['Y', 'Z', 'A'],
  resize: true
});

Morris.Donut({
  element: 'donut',
  data: [
    {value: 78, label: 'Chrome'},
    {value: 14, label: 'Safari'},
    {value: 6, label: 'Mozilla'},
    {value: 2, label: 'Other...'}
  ],
  resize: true,
  formatter: function (x) { return x + "%"},
  labelColor: '#fff',
  resize: true
});

Morris.Line({
  element: 'diagonal',
  data: [
    {"period": "2017-01", "A": 3407, "B": 660},
    {"period": "2017-02", "A": 3351, "B": 629},
    {"period": "2017-03", "A": 3201, "B": 656},
    {"period": "2017-04", "A": 3215, "B": 622}
  ],
  xkey: 'period',
  ykeys: ['A', 'B'],
  labels: ['A', 'B'],
  xLabelAngle: 60,
  resize: true
});