import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ChartsContainer from './components/ChartsContainer';
import './App.css';
import 'antd/dist/reset.css';
import getAuth from './api/getAuth';

const App = () => {
  const [token, setToken] = useState('');
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getAuth().then(data => setToken(data.access_token));
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
