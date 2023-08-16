import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import AddEdit from './components/pages/AddEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from './components/pages/View';
import About from './components/pages/About';
import Search from './components/pages/Search';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Header />
    <ToastContainer position='top-center' />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/add" Component={AddEdit} />
        <Route exact path="/update/:id" Component={AddEdit} />
        <Route exact path="/view/:id" Component={View} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/search" Component={Search } />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
