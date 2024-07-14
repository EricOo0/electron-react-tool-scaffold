import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './pages/homepage';
import Logo from './pages/logo';
import Setting from './pages/setting'
import reportWebVitals from './reportWebVitals';

// import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom';

// const routes = (

//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />s
//     </Routes>
//   </BrowserRouter>

// );
// ReactDOM.render(routes, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/index" element={<Logo />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  </HashRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
