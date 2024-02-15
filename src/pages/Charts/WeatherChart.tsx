import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as React from 'react';

interface WeatherReport {
	dt: number;
	temp: number;
	wind_speed: 2.74,
	weather:  {icon: string}[];

}

interface WeatherChartProps {
    data: WeatherReport[];
}

interface WeatherReportSummary {
    hours: string[] ,
    temparatures: number[],
    wind: number[] 
}

const WeatherChart: React.FC<WeatherChartProps> = ({data}) => {

	const weatherChart = {
    	hours: [] ,
    	temparatures: [],
    	wind: []
	} as WeatherReportSummary;

	if (!data || data.length === 0) {
    	return <>Loading...</>;
	}

	data.forEach((element) => {
    	weatherChart.hours.push((new Date(element.dt * 1000).getHours()).toString());
    	weatherChart.temparatures.push(element.temp);
    	weatherChart.wind.push(element.wind_speed);
    	[];
	});

	const chartOptions: Options = {
    	chart: {
    		type: 'spline'
    	},
    	title: {
    		text: 'Weather in details',
    		align: 'left'
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
    		x: 60,
    		verticalAlign: 'top',
    		y: 100,
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