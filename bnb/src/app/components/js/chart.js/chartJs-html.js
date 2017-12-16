//chartJs.html Configuration 
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            label: 'Dataset 1',
            borderWidth: 1,
            backgroundColor: "rgba(74,73,180,0.8)",
            borderColor: "rgba(74,73,180,0.8)",
            pointBorderColor: "rgb(74,73,180,59)",
            pointBackgroundColor: "rgba(74,73,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: "rgba(102,57,180,0.8)",
            borderColor: "rgba(102,57,180,0.8)",
            pointBorderColor: "rgb(102,57,180)",
            pointHighlightStroke: "rgba(102,57,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

var barChartData2 = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            label: 'Dataset 1',
            borderWidth: 1,
            backgroundColor: "rgba(74,73,180,0.8)",
            borderColor: "rgba(74,73,180,0.8)",
            pointBorderColor: "rgb(74,73,180,59)",
            pointBackgroundColor: "rgba(74,73,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: "rgba(102,57,180,0.8)",
            borderColor: "rgba(102,57,180,0.8)",
            pointBorderColor: "rgb(102,57,180)",
            pointHighlightStroke: "rgba(102,57,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

var barChartData3 = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            label: 'Dataset 1',
            borderWidth: 1,
            backgroundColor: "rgba(74,73,180,0.5)",
            borderColor: "rgba(74,73,180,0.8)",
            pointBorderColor: "rgb(74,73,180,59)",
            pointBackgroundColor: "rgba(74,73,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: "rgba(102,57,180,0.5)",
            borderColor: "rgba(102,57,180,0.8)",
            pointBorderColor: "rgb(102,57,180)",
            pointHighlightStroke: "rgba(102,57,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

var barChartData4 = {
    labels : [],
    datasets : [
        {
            label: 'Dataset 1',
            borderWidth: 1,
            backgroundColor: "rgba(74,73,180,0.5)",
            borderColor: "rgba(74,73,180,0.8)",
            pointBorderColor: "rgb(74,73,180,59)",
            pointBackgroundColor: "rgba(74,73,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: "rgba(102,57,180,0.5)",
            borderColor: "rgba(102,57,180,0.8)",
            pointBorderColor: "rgb(102,57,180)",
            pointHighlightStroke: "rgba(102,57,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

var barChartData5 = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            label: 'Dataset 1',
            borderWidth: 1,
            backgroundColor: "rgba(74,73,180,0.8)",
            borderColor: "rgba(74,73,180,0.8)",
            pointBorderColor: "rgb(74,73,180,59)",
            pointBackgroundColor: "rgba(74,73,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: 'Dataset 2',
            borderWidth: 1,
            backgroundColor: "rgba(102,57,180,0.8)",
            borderColor: "rgba(102,57,180,0.8)",
            pointBorderColor: "rgb(102,57,180)",
            pointHighlightStroke: "rgba(102,57,180,0.8)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

var barChartData6 = {
    labels : ["January","February","March","April","May","June","July"],
    datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderWidth: 1,
        backgroundColor: "rgba(74,73,180,0.8)",
        scaleBeginAtZero : true,
        borderColor: "rgba(74,73,180,0.8)",
        pointBorderColor: "rgb(74,73,180,59)",
        pointBackgroundColor: "rgba(74,73,180,0.8)",
        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    }, {
        type: 'bar',
        label: 'Dataset 2',
        borderWidth: 1,
        backgroundColor: "rgba(102,57,180,0.8)",
        borderColor: "rgba(102,57,180,0.8)",
        pointBorderColor: "rgb(102,57,180)",
        pointHighlightStroke: "rgba(102,57,180,0.8)",
        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    }]
}

window.onload = function(){
    "use strict";
    var ctx1 = document.getElementById("canvas-vertical").getContext("2d");
    window.myBar = new Chart(ctx1, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Vertical Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"

                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                },
            }]
        },
        }
    });
    var ctx2 = document.getElementById("canvas-horizontal").getContext("2d");
    window.myHorizontalBar = new Chart(ctx2, {
        type: 'horizontalBar',
        data: barChartData2,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Horizontal Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"

                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                },
            }]
        },
        }
    });
    var ctx3 = document.getElementById("canvas-radar").getContext("2d");
    window.myLine = new Chart(ctx3,  {
        type: 'radar',
        data: barChartData3,
        options: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            },
            scale: {
              ticks: {
                beginAtZero: true
              }
            },
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Radar Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"
                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                },
            }]
        },
        }
    });
    var ctx4 = document.getElementById("canvas-polar").getContext("2d");
    window.myPolarArea = Chart.PolarArea(ctx4,  {
        data: barChartData4,
        options: {
            responsive: true,
        
            title: {
                display: true,
                text: 'Polar Area Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"
                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                },
            }]
        },
        }
    });
    var ctx5 = document.getElementById("canvas-basic").getContext("2d");
    window.myLine = new Chart(ctx5,  {
        type: 'line',
        data: barChartData5,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"

                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"

                },
            }]
        },
        }
    });
    var ctx6 = document.getElementById("canvas-combo").getContext("2d");
    window.myLine = new Chart(ctx6,  {
        type: 'bar',
        data: barChartData6,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Combo Bar Line Chart',
                fontColor:"#697a88",
                fontSize: 20
            },
            scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874;"                
                }
            }],
            xAxes: [{
                stacked: true,
                gridLines: {
                drawOnChartArea: false
            },
                ticks: {
                    fontFamily: "Arial",
                    fontColor:"#586874"
                },
            }]
        },
        }
    });
    
}







