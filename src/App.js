import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Rankings from './pages/Rankings'
import MockDraft from './pages/MockDraft'
// import Rankings2 from './pages/Rankings2'
import './css/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rankings' element={<Rankings/>} />
        <Route path='/MockDraft' element={<MockDraft/>} />
        {/* <Route path='/rankings2' element={<Rankings2/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
