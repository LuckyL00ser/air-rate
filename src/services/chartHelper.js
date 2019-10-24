import Chart from 'chart.js';

function commonChartsOptions(daily) {
	return {
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				stacked: false,
				scaleLabel: {
					display: true,
					labelString: 'μg/m³',
				},
				ticks: {
					beginAtZero: true,
				},
			}],
			xAxes: [{
				type: 'time',
				scaleLabel: {
					display: true,
					labelString: daily ? 'Dzień' : 'Godzina',
				},

				stacked: true,
				time: {
					unit: daily ? 'day' : 'minute',
					unitStepSize: daily ? 1 : 60,
					displayFormats: {
						minute: daily ? 'DD-MM' : 'hh:mm',
					},
					tooltipFormat: 'YYYY-MM-DD, kk:mm', // cosider adding 'ddd' at beggining - check moment.js lib localization options
				},
			}],
		},
	};
}

function pick(array, key) {
	return array.map(item => item[key]);
}
function drawPMsChart(data, container, daily) {
	const pm = new Chart(container.getContext('2d'), {
		type: 'line',
		data: {
			labels: pick(data[0].measures, 'created_at'),
			datasets: [{
				label: 'PM1',
				data: pick(data[0].measures, 'value'),
				backgroundColor: 'rgba(3,96,255,0.5)',
				borderWidth: 1,
			},
			{
				label: 'PM2,5',
				data: pick(data[1].measures, 'value'),
				backgroundColor: 'rgba(255,219,63,0.5)',
				borderWidth: 1,
			},
			{
				label: 'PM10',
				data: pick(data[2].measures, 'value'),
				backgroundColor: 'rgba(0,124,21,0.5)',
				borderWidth: 1,
			}],
		},
		options: commonChartsOptions(daily),
	});
	return pm;
}
function drawTempChart(data, container, daily) {
	const tempChart = new Chart(container.getContext('2d'), {
		type: 'line',
		data: {
			labels: pick(data[0].measures, 'created_at'),
			datasets: [{
				label: 'Temperatura',
				data: pick(data[0].measures, 'value'),
				backgroundColor: 'rgba(252,53,85,0.5)',
				borderWidth: 1,
			}],
		},
		options: commonChartsOptions(daily),
	});
	tempChart.options.scales.yAxes.labelString = '°C';
	return tempChart;
}
function drawHumidityChart(data, container, daily) {
	const humChart = new Chart(container.getContext('2d'), {
		type: 'line',
		data: {
			labels: pick(data[0].measures, 'created_at'),
			datasets: [{
				label: 'Wilgotność',
				data: pick(data[0].measures, 'value'),
				backgroundColor: 'rgba(0,129,252,0.5)',
				borderWidth: 1,
			}],
		},
		options: commonChartsOptions(daily),
	});
	humChart.options.scales.yAxes.labelString = '%';
	return humChart;
}
function drawPressureChart(data, container, daily) {
	const pressChart = new Chart(container.getContext('2d'), {
		type: 'line',
		data: {
			labels: pick(data[0].measures, 'created_at'),
			datasets: [{
				label: 'Ciśnienie',
				data: pick(data[0].measures, 'value'),
				backgroundColor: 'rgba(10,150,143,0.51)',
				borderWidth: 1,
			}],
		},
		options: commonChartsOptions(daily),
	});
	pressChart.options.scales.yAxes.labelString = 'hPa';

	return pressChart;
}

export {
	drawHumidityChart, drawPMsChart, drawPressureChart, drawTempChart, pick,
};
