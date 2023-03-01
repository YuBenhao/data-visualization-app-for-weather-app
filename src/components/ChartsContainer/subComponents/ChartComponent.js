import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from '../../../utils/time';
import { SUNSHINE_MOON_LIGHT } from '../../SearchForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: SUNSHINE_MOON_LIGHT,
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};


const ChartComponent = ({ sunshineData, moonData }) => {
  const data = useMemo(() => {
    return ({
      labels: moonData.length ? moonData[0].coordinates[0]?.dates?.map(i => format(i.date)) : [],
      datasets: [
        {
          label: 'sunshine duration per hour (h)',
          data: sunshineData.length ? sunshineData[0]?.coordinates[0]?.dates.map(i => i.value) : [],
          borderColor: '#1dd1a1',
          backgroundColor: '#1dd1a1',
          yAxisID: 'y',
        },
        {
          label: 'moon light (percent)',
          data: moonData.length ? moonData[0]?.coordinates[0]?.dates.map(i => i.value) : [],
          borderColor: '#ee5253',
          backgroundColor: '#ee5253',
          yAxisID: 'y1',
        },
      ],
    })
  }, [sunshineData, moonData]);
  console.log(data);
  return <Line options={options} data={data} />;
};

export default ChartComponent;