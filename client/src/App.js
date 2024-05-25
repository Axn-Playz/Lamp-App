import logo from './logo.svg';
import './App.css';
import Home from './Components/Regular/Home';

import {BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './Components/Regular/Login';
import Register from './Components/Regular/Register';
import Setup from './Components/Regular/SetUp'
import UserInterface from './Components/Regular/UserInterface';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/setup' element={<Setup/>} />
        <Route path='/user' element={<UserInterface/>} />
      </Routes>
    </Router>
  );
}

export default App;
