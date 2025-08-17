import logo from './logo.svg';
import './App.css';
import ShowEntries from './components/ShowEntries';
import AddItem from './components/AddItem';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
              <Route path="/show"  element={<ShowEntries />}></Route>
              <Route path="/" element={<AddItem />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
        <addItem></addItem>
    </div>
  );
}

export default App;
