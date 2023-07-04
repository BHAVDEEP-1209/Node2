import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
     <Routes >
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/homepage" element={<Homepage />} />
     </Routes>
    </div>
  );
}

export default App;
