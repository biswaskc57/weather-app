import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';

interface WeatherReport {
	dt: number;
	temp: number;
	wind_speed: number,
	weather:  {icon: string}[];
}

interface WeatherChartProps {
    data: WeatherReport[];
}

interface WeatherReportSummary {
    hours: string[] ,
    temparatures: any | number[],
    wind: number[] 
}

const WeatherChart: React.FC<WeatherChartProps> = ({data}) => {

	const weatherChart= {
    	hours: [] ,
    	temparatures: [],
    	wind: []
	} as WeatherReportSummary;

	if (!data || data.length === 0) {
    	return <>Loading...</>;
	}

	data.forEach((element, index: number) => {
    	if (index % 2 === 0){
			weatherChart.hours.push((new Date(element.dt * 1000).getHours()).toString());
			weatherChart.temparatures.push({
				y: element.temp,
				marker: {
					symbol: `url(http://openweathermap.org/img/w/${element.weather[0].icon}.png)`
				},});
			weatherChart.wind.push(element.wind_speed);
		}
    	
    	[];
	});

	const chartOptions: Options = {
    	chart: {
    		type: 'spline'
    	},
    	title: {
    		text: 'Weather in details',
    		align: 'center'
    	},
    	xAxis: [{
    		categories: weatherChart.hours.splice(0,12),
    		crosshair: true,
    	}],
    	yAxis: [{ // Primary yAxis
    		labels: {
    			format: '{value}°C',
    			style: {
    				color: 'blue'
    			}
    		},
    		title: {
    			text: 'Temperature',
    			style: {
    				color: 'red'
    			}
    		}
    	}, { // Secondary yAxis
    		title: {
    			text: 'Wind speed',
    			style: {
    				color: 'green'
    			}
    		},
    		labels: {
    			format: '{value} m/s',
    			style: {
    				color: 'green'
    			}
    		},
    		opposite: true
    	}],
    	tooltip: {
    		shared: true
    	},
    	legend: {
    		align: 'left',
    		x: 50,
    		verticalAlign: 'top',
    		y: 0,
    		floating: true,
    		backgroundColor:
                'rgba(255,255,255,0.25)'
    	},
    	series: [{
    		name: 'Wind speed',
    		type: 'spline',
    		yAxis: 1,
    		data: weatherChart.wind.splice(0,12),
    		tooltip: {
    			valueSuffix: 'm/s'
    		}
    
    	}, {
    		name: 'Temperature',
    		type: 'spline',
    		data: weatherChart.temparatures.splice(0,12),
    		tooltip: {
    			valueSuffix: '°C'
    		}
    	}]
	};
	return (
    	<>
    		<HighchartsReact
    			highcharts={Highcharts}
    			options={chartOptions}
    		/>
    	</>
	);

};

export default WeatherChart;