import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from '../../../utils/time';
import { HUMIDITY } from '../../SearchForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = [
  '#ff9f43',
  '#ee5253',
  '#00d2d3'
];

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: HUMIDITY,
    },
  },
};

const BarComponent = ({ dataSource }) => {
  const data = useMemo(() => {
    return ({
      labels: dataSource.length ? dataSource[0].coordinates[0]?.dates?.map(i => format(i.date)) : [],
      datasets: dataSource.map((i, idx) => {
        const param = i.parameter.match(/\d+m/g);
        return ({
          label: `${param[0]} (Pa)`,
          data: i.coordinates[0].dates.map(i => i.value),
          borderColor: COLORS[idx],
          backgroundColor: COLORS[idx],
        });
      })
    });
  }, [dataSource]);
  return <Bar options={options} data={data} />;
};

export default BarComponent;
