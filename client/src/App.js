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
import Ai from './Components/Ai/Ai';
import LoadText from './Components/Reusable/LoadText.js'
import Suggestion from './Components/Reusable/Suggestion.js';
import QuesCamp from './Components/Reusable/QuestionCamp.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/setup' element={<Setup/>} />
        <Route path='/user' element={<UserInterface/>} />
        <Route path='/ai' element={<Ai/>} />
        <Route path='/load' element={<LoadText/>} />
        <Route path='/suggestion' element={<Suggestion/>}/>
        <Route path='/quescamp' element={<QuesCamp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
