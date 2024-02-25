import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/ui/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;