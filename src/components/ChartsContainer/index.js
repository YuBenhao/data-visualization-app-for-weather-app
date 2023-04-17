import React from 'react';

import LineComponent from './LineComponent';
import BarComponent from './BarComponent';
import Chart from './ChartComponent';
import { Empty } from 'antd';

import './index.css';

const ChartsContainer = ({ data }) => {
  const temperatureData = data.filter(i => i.parameter.startsWith('t_'));
  const humidityData = data.filter(i => i.parameter.startsWith('relative_humidity_'));
  const moonLightData = data.filter(i => i.parameter.startsWith('moon_'));
  const sunshineData = data.filter(i => i.parameter.startsWith('sunshine_duration_'));
  return (
    <>
      {
        data.length ? (
          <div className='wrapper'>
            { /**only display when temperature data data exists*/}
            {
              temperatureData.length ? (
                <div className='temperature'>
                  <LineComponent dataSource={temperatureData || []} />
                </div>
              ) : null
            }
            { /**only display when humidity data exists*/}
            {
              humidityData.length ? (
                <div className='humidity'>
                  <BarComponent dataSource={humidityData || []} />
                </div>
              ) : null
            }
            { /**only display when sunshine and moon light data exist*/}
            {
              moonLightData.length && sunshineData.length ? (
                <div className='sunMoonLight'>
                  <Chart
                    moonData={moonLightData || []}
                    sunshineData={sunshineData || []}
                  />
                </div>
              ) : null
            }
          </div>
        ) : <div className='emptyWrapper'><Empty /></div>
      }
    </>
  );
};

export default ChartsContainer;