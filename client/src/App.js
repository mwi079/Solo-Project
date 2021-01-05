import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import './App.css';

function App() {


  return (
    <>
      <NavBar /> 
      <div className="App">
        <LandingPage />
      </div>
    </>
  );
}

export default App;
