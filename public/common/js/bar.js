$(document).ready(function(){
	//get canvas
	var graph = $('#graph');
	graph.height(100);
	var graphData = {
		labels : ["","",""],
		
		datasets : [
			{
				data : [12,52,91],
				backgroundColor : "#000"
			}
		]
	};

	var graphOptions = {

		title : {
			display : false,
			position : "top",
			text : "",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		scales : {
			yAxes : [{
				ticks : {
				    display: false,
					beginAtZero: false,
					min : 12,
					max : 91,
				},
				 gridLines: {
				    display: false,
				  }
				
			}],
			xAxes : [{
				 gridLines: {
				    display: false
				  }
			}]
		}
	};

	var graphChart = new Chart( graph, {
		type : 'line',
		data : graphData,
		options : graphOptions
	})




	//get canvas
	var ctx = $('#barChart');
	ctx.height(500);
	var data = {
		labels : ["","","","","",""],
		datasets : [
			{
				label : "",
				data : [750,950,450,1000,750,250],
				backgroundColor : "#87888b",
				borderColor : "#87888b",
				borderWidth : 0
			},
			{
				label : "",
				data : [1200,900,925,450,1300,900],
				backgroundColor : "#265aa8",
				borderColor : "#265aa8",
				borderWidth : 0
			}
		]
	};

	var options = {
		layout: {
            padding: {
                left: 0,
                right: 50,
                top: 0,
                bottom: 0
            }
        },
		title : {
			display : false,
			position : "top",
			text : "",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		scales : {
			yAxes : [{
				ticks : {
					beginAtZero: true,
					min : 0,
					max : 1400,
				},
				gridLines : {
					borderDash: [3, 1],
					color: "#9c9da0"
				}
				
			}],
			xAxes : [{
				 gridLines: {
				    display: false,
					color: "#9c9da0"
				  },
            categoryPercentage: 0.5,
            barPercentage: 1
			}]
		}
	};

	var chart = new Chart( ctx, {
		type : 'bar',
		data : data,
		options : options
	})
// peer chart




	var ctx01 = $('#profitLoss');
	ctx01.height(500);
	var data01 = {
		labels : ["","","","","",""],
		datasets : [
			{
				label : "",
				data : [750,950,450,1000,750,250],
				backgroundColor : "#87888b",
				borderColor : "#87888b",
				borderWidth : 0
			},
			{
				label : "",
				data : [1200,900,925,450,1300,900],
				backgroundColor : "#265aa8",
				borderColor : "#265aa8",
				borderWidth : 0
			}
		]
	};

	var options01 = {
		layout: {
            padding: {
                left: 0,
                right: 50,
                top: 0,
                bottom: 0
            }
        },
		title : {
			display : false,
			position : "top",
			text : "",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		scales : {
			yAxes : [{
				ticks : {
					beginAtZero: true,
					min : 0,
					max : 1400,
				},
				gridLines : {
					borderDash: [3, 1],
					color: "#9c9da0"
				}
				
			}],
			xAxes : [{
				 gridLines: {
				    display: false,
					color: "#9c9da0"
				  },
            categoryPercentage: 0.5,
            barPercentage: 1
			}]
		}
	};

	var chart01 = new Chart( ctx01, {
		type : 'bar',
		data : data01,
		options : options01
	})
// profit los end





	var ctx02 = $('#cashFlow');
	ctx02.height(500);
	var data02 = {
		labels : ["","","","","",""],
		datasets : [
			{
				label : "",
				data : [750,950,450,1000,750,250],
				backgroundColor : "#87888b",
				borderColor : "#87888b",
				borderWidth : 0
			},
			{
				label : "",
				data : [1200,900,925,450,1300,900],
				backgroundColor : "#265aa8",
				borderColor : "#265aa8",
				borderWidth : 0
			}
		]
	};

	var options02 = {
		layout: {
            padding: {
                left: 0,
                right: 50,
                top: 0,
                bottom: 0
            }
        },
		title : {
			display : false,
			position : "top",
			text : "",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		scales : {
			yAxes : [{
				ticks : {
					beginAtZero: true,
					min : 0,
					max : 1400,
				},
				gridLines : {
					borderDash: [3, 1],
					color: "#9c9da0"
				}
				
			}],
			xAxes : [{
				 gridLines: {
				    display: false,
					color: "#9c9da0"
				  },
            categoryPercentage: 0.5,
            barPercentage: 1
			}]
		}
	};

	var chart02 = new Chart( ctx02, {
		type : 'bar',
		data : data02,
		options : options02
	})
// cash flow End




	var ctx03 = $('#finencial');
	ctx03.height(500);
	var data03 = {
		labels : ["","","","","",""],
		datasets : [
			{
				label : "",
				data : [750,950,450,1000,750,250],
				backgroundColor : "#87888b",
				borderColor : "#87888b",
				borderWidth : 0
			},
			{
				label : "",
				data : [1200,900,925,450,1300,900],
				backgroundColor : "#265aa8",
				borderColor : "#265aa8",
				borderWidth : 0
			}
		]
	};

	var options03 = {
		layout: {
            padding: {
                left: 0,
                right: 50,
                top: 0,
                bottom: 0
            }
        },
		title : {
			display : false,
			position : "top",
			text : "",
			fontSize : 18,
			fontColor : "#111"
		},
		legend : {
			display : false,
			position : "bottom"
		},
		scales : {
			yAxes : [{
				ticks : {
					beginAtZero: true,
					min : 0,
					max : 1400,
				},
				gridLines : {
					borderDash: [3, 1],
					color: "#9c9da0"
				}
				
			}],
			xAxes : [{
				 gridLines: {
				    display: false,
					color: "#9c9da0"
				  },
            categoryPercentage: 0.5,
            barPercentage: 1
			}]
		}
	};

	var chart03 = new Chart( ctx03, {
		type : 'bar',
		data : data03,
		options : options03
	})
// Finential





	var ctx04 = $('#pieChar');
	ctx04.height(230);
	var data04 = {
		datasets : [
			{
				data : [6.4,14.21,6.4,6.4],
				backgroundColor : [
					"#265aa8",
					"#0096ba",
					"#abbb37",
					"#d99528"
				],
				borderColor : [
					"#ffffff"
				],
				borderWidth : 1
			}
		],
		labels: 
		[
	        'Promoters 6.4%',
	        'FIIs 14.21%',
	        'Mutual Funds 6.4%',
	        'Non-Institutions 6.4%'
	    ]
	};

	var options04 = {
		legend: {
            display: true,
            position : "right",
            labels: {
                padding : 30
            }
        }
	};

	var chart04 = new Chart( ctx04, {
		type : 'doughnut',
		data : data04,
		options : options04
	})






});