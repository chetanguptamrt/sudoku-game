import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
const Routes = lazy(() => import('./routes/Routes'));

function App() {
  return (
    <Loader>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes />
        </div>
      </BrowserRouter>
    </Loader>
  );
}

export default App;
