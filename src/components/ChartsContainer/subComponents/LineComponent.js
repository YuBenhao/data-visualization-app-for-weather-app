import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TEMPATURE } from '../../SearchForm';
import { format } from '../../../utils/time';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = [
  '#ff9ff3',
  '#feca57',
  '#01a3a4',
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `${TEMPATURE}`,
    },
  },
};

const LineComponent = ({ dataSource = [] }) => {
  const data = useMemo(() => {
    // optimize labels to be format 'YY-MM-DD HH:mm'
    return ({
      labels: dataSource.length ? dataSource[0].coordinates[0]?.dates?.map(i => format(i.date)) : [],
      datasets: dataSource.map((i, idx) => {
        // optimize unit to be <temperature> (°C)
        const param = i.parameter.match(/\d+m/g);
        return ({
          label: `${param[0]} (°C)`,
          data: i.coordinates[0].dates.map(i => i.value),
          borderColor: COLORS[idx],
          backgroundColor: COLORS[idx],
        });
      })
    })
  }, [dataSource]);
  return <Line options={options} data={data} />;
};

export default LineComponent;
