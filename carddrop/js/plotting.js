perc = function(val, axis) {
	return val + "%";
}
		
$(function() {
	$.plot($("#placeholder"), [ [0, 0] ], { yaxis: { max: 100 , min: 0, tickFormatter: perc}, xaxis: { max: 10000 , min: 0} });
	$("#rateinput").submit(function() {
		var dataset = [];
		var rate = $("#drop").val();
		var droprate = rate;
		rate = 1 - (rate/100);
		for (var i = 0; i <= 10000; i += 1) {
			var image = Math.pow(rate, i);
			image = (1 - image)*100; 
			dataset.push([i, image]);
		}	
		$.plot($("#placeholder"), [dataset], {series: {lines: {show: true},	points: {show: false}},	grid: {hoverable: true}, yaxis: { max: 100 , min: 0, tickFormatter: perc}, xaxis: { max: 10000 , min: 0},  colors: ["#007bff"] });
		return false;
	});	
	
	


	$("<div id='tooltip'></div>").css({
		position: "absolute",
		display: "none",
		border: "1px solid #007bff",
		padding: "2px",
		"background-color": "#E5F1FF",
		opacity: 0.80
	}).appendTo("body");

	$("#placeholder").bind("plothover", function (event, pos, item) {
			if (item) {
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
				var str = " attempts ";
				if(x == 1) str = " attempt ";
				$("#tooltip").html("Probability of dropping after " + Math.floor(x) + str + "= " + y + "%")
					.css({top: item.pageY+5, left: item.pageX+5})
					.fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
	});
});