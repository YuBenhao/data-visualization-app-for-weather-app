import React, { useMemo, useState } from "react";
import { DatePicker, Select, Button, message } from 'antd';
import dayjs from "dayjs";
import getLocation from '../../api/getLocation';
import getWeatherData from "../../api/getWeatherData";
import '../../style/searchForm.css';

const initialErrorState = {
  location: false,
  timeRange: false,
  params: false
};

const { RangePicker } = DatePicker;

export const TEMPATURE = 'Temperature';
export const HUMIDITY = 'Humidty';
export const SUNSHINE_MOON_LIGHT = 'Sunshine Duration & Moon Light (in percent) ';

const ParametersOptions = {
  [TEMPATURE]: 't_2m:C,t_20m:C,t_100m:C',
  [HUMIDITY]: 'relative_humidity_2m:p,relative_humidity_20m:p,relative_humidity_200m:p',
  [SUNSHINE_MOON_LIGHT]: 'moon_light:p,sunshine_duration_1h:h'
};

const SearchForm = ({ token, setDataSource }) => {
  const [location, setLocation] = useState(undefined);
  const [timeRange, setTimeRange] = useState([]);
  const [params, setParams] = useState([]);
  const [errors, setErrors] = useState(initialErrorState);
  const [locations, setLocations] = useState([]);

  const locationOptions = useMemo(() => locations.map(i => {
    const geometry = i.geometry;
    return ({
      value: `${geometry.lat},${geometry.lng}`,
      label: i.formatted
    });
  }), [locations]);
  const paramsOptions = useMemo(() => {
    return Object.keys(ParametersOptions)
      .map(i => ({
        label: i,
        value: ParametersOptions[i]
      }));
  }, []);

  const handleReset = () => {
    setLocation(undefined);
    setTimeRange([]);
    setParams([]);
    setErrors(initialErrorState);
  };

  const handleSearch = () => {

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
      return setErrors(prev => ({
        ...prev,
        location: !location,
        timeRange: !timeRange.length,
        params: !params.length,
      }));
    }
    getWeatherData({
      location,
      timeRange,
      params,
      token
    }).then(data => {
      if (data) {
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
    });
  };

  const handleTimeChange = value => setTimeRange(value || []);
  const handleLocationChange = value => setLocation(value);

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
            format='YYYY-MM-DD HH:mm'
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