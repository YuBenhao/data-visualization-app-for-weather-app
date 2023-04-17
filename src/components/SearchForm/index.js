import React, { useMemo, useState, useRef, useEffect } from "react";

import { DatePicker, Select, Button, message } from 'antd';

import dayjs from "dayjs";

import getLocation from '../../api/getLocation';
import getWeatherData from "../../api/getWeatherData";

import './index.css';

// initial  error states for search form items
const initialErrorState = {
  location: false,
  timeRange: false,
  params: false
};

const { RangePicker } = DatePicker;
// some constants
export const TEMPATURE = 'Temperature';
export const HUMIDITY = 'Humidty';
export const SUNSHINE_MOON_LIGHT = 'Sunshine Duration & Moon Light';

// weather parameter options object
const ParametersOptions = {
  [TEMPATURE]: 't_2m:C,t_20m:C,t_100m:C',
  [HUMIDITY]: 'relative_humidity_2m:p,relative_humidity_20m:p,relative_humidity_200m:p',
  [SUNSHINE_MOON_LIGHT]: 'moon_light:p,sunshine_duration_1h:h'
};

const SearchForm = ({ token, setDataSource }) => {
  // location, time range and weather parameters states
  const [location, setLocation] = useState(undefined);
  const [timeRange, setTimeRange] = useState([]);
  const [params, setParams] = useState([]);

  // error state for search item component
  const [errors, setErrors] = useState(initialErrorState);

  // options for location select component
  const [locations, setLocations] = useState([]);

  // controller for starting or stopping polling requests
  const [timer, setTimer] = useState(false);

  // cached parameters for polling request use
  const cachedParams = useRef({});
  const intervalRef = useRef(null);

  // transform to location options
  const locationOptions = useMemo(() => locations.map(i => {
    const geometry = i.geometry;
    return ({
      value: `${geometry.lat},${geometry.lng}`,
      label: i.formatted
    });
  }), [locations]);

  // transform to weather parameters options
  const paramsOptions = useMemo(() => {
    return Object.keys(ParametersOptions)
      .map(i => ({
        label: i,
        value: ParametersOptions[i]
      }));
  }, []);

  // polling weather data
  useEffect(() => {
    if (timer) {
      intervalRef.current = setInterval(() => {
        getWeatherData({
          token,
          ...cachedParams.current
        })
          .then(data => setDataSource(data.data || []))
          .catch(err => {
            setTimer(false);
            console.log(err);
          });
      }, 12000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timer, token, setDataSource]);

  // reset search form
  const handleReset = () => {
    setLocation(undefined);
    setTimeRange([]);
    setParams([]);
    setErrors(initialErrorState);
  };

  const checkValid = () => {
    // only search when all parameters exist
    if (!location || !timeRange.length || !params.length) {
      message.warning({
        content: 'Requied field(s) can\'t be empty',
        onClick: () => {
          message.destroy();
          setErrors(initialErrorState);
        },
        onClose: () => {
          setErrors(initialErrorState);
        },
        duration: 6,
      });
      // set error state for waring
      setErrors(prev => ({
        ...prev,
        location: !location,
        timeRange: !timeRange.length,
        params: !params.length,
      }));
      return false;
    }
    return true;
  };
  const handleSearch = () => {
    if (!checkValid()) return;
    // get weather data
    getWeatherData({
      location,
      timeRange,
      params,
      token
    }).then(data => {
      if (data) {
        // set cached params when requesting successflly
        cachedParams.current = {
          location,
          timeRange,
          params,
        };
        // start polling
        setTimer(true);
        setDataSource(data.data || []);
      } else {
        message.warning({
          content: `Start Date should be after ${dayjs().subtract(1, 'day').startOf('day').format()}`,
          onClick: () => {
            message.destroy();
            setErrors(initialErrorState);
          },
          onClose: () => {
            setErrors(initialErrorState);
          },
          duration: 6,
        });
      }
    }).catch(err => {
      // stop polling
      setTimer(false);
      console.log(err);
    });
  };

  const handleTimeChange = value => setTimeRange(value || []);
  const handleLocationChange = value => setLocation(value);

  // search locations
  const handleLocationSearch = value => {
    getLocation(value, token).then(res => {
      setLocations(res.results || []);
    });
  };

  const handleParamsChange = value => setParams(value);

  return (
    <form>
      <div className="searchItems">
        <span>
          <label>
            <abbr title="required">*</abbr>
            <span>Location:</span>
          </label>
          <Select
            className='location'
            status={`${errors.location ? `error` : undefined}`}
            placeholder="Format: <latitude>,<longtitude>"
            showSearch
            value={location}
            showArrow={true}
            filterOption={false}
            onSearch={handleLocationSearch}
            onChange={handleLocationChange}
            notFoundContent={null}
            options={locationOptions}
          />
        </span>
        <span>
          <label>
            <abbr title="required">*</abbr>
            <span>Time Range:</span>
          </label>
          <RangePicker
            className='time'
            status={`${errors.timeRange ? `error` : undefined}`}
            showTime
            onChange={handleTimeChange}
            value={timeRange}
            format='YY-MM-DD HH:mm'
          />
        </span>
        <span>
          <label>
            <abbr title="required">*</abbr>
            <span>Parameters:</span>
          </label>
          <Select
            className='params'
            status={`${errors.params ? `error` : undefined}`}
            options={paramsOptions}
            value={params}
            onChange={handleParamsChange}
            mode="multiple"
            placeholder='Please select parameters'
          />
        </span>
        <span className="btns">
          <Button onClick={() => handleReset()}>Reset</Button>
          <Button type="primary" onClick={() => handleSearch()}>Search</Button>
        </span>
      </div>
    </form>
  );
};

export default SearchForm;