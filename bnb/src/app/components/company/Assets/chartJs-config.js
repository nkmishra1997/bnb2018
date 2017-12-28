//Chart.js Configuration for index.html
var ctx = document.querySelector("#statsChart");
var data = {
	labels: ["February", "March", "April", "May", "June", "July", "August"],
	datasets: [
	{
		label: "Subscribers",
		backgroundColor: "rgba(74,73,180,0.8)",
		borderColor: "rgba(74,73,180,0.8)",
		pointBorderColor: "rgb(74,73,180,59)",
		pointBackgroundColor: "rgba(74,73,180,0.8)",
		data: [253, 252, 796, 219, 516, 219, 633]
	},
	{
		label: "All Visitors",
		backgroundColor: "rgba(102,57,180,0.8)",
		borderColor: "rgba(102,57,180,0.8)",
		pointBorderColor: "rgb(102,57,180)",
		pointHighlightStroke: "rgba(102,57,180,0.8)",
		data: [601, 113, 403, 309, 623, 300, 201]
	}		
	]
};
		
var areaChart = new Chart(ctx, {
	type:"line",
	data:data,
			
	options: {
		tooltips: {
			mode:"label"
		},
		scaleLineColor: 'transparent',
		elements:{
			point: {
				hitRadius:90
			}
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
		animation: {
			duration: 1500
		},
		responsive: true,
		legend: {
			display: false,
		},
		tooltips: {
			backgroundColor:'rgba(25,25,25,0.9)',
			cornerRadius:0,
			footerFontFamily:"Montserrat"
		},		
	}
});

