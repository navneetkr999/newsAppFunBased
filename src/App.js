import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App () {
  let country='in';
  let pageSize = 9;
  let apiKey = process.env.REACT_APP_NEWS_API_KEY;
  
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route exact path="/home" element={<News setProgress={setProgress} apiKey={apiKey} key='general' country={country} category='general' pageSize={pageSize} />}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' country={country} category='sports' pageSize={pageSize} />}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' country={country} category='entertainment' pageSize={pageSize} />}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' country={country} category='health' pageSize={pageSize} />}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' country={country} category='business' pageSize={pageSize} />}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' country={country} category='science' pageSize={pageSize} />}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' country={country} category='technology' pageSize={pageSize} />}/>
        </Routes>
      </Router>
    </div>
  )
}
