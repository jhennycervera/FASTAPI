import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Version1 from "./version1";
import Version2 from "./version2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/version1" element={<Version1 />} />
        <Route path="/version2" element={<Version2 />} />
      </Routes>
    </Router>
  );
}

export default App;
