import React, { useState, useEffect } from 'react';

import SearchForm from './components/SearchForm';
import ChartsContainer from './components/ChartsContainer';

import './App.css';
import 'antd/dist/reset.css';

import getAuthToken from './api/getAuthToken';

const App = () => {
  const [token, setToken] = useState('');
  const [dataSource, setDataSource] = useState([]);
  // get auth token
  useEffect(() => {
    getAuthToken().then(data => setToken(data.access_token)).catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <div className="content">
        <SearchForm
          token={token}
          setDataSource={setDataSource}
        />
        <ChartsContainer data={dataSource} />
      </div>
    </div>

  );
};

export default App;
