import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Version1 from './version1';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/version" element={<Version1/>}/>
      </Routes>
    </Router>
  );
}

export default App
