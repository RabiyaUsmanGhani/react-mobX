import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppsList, AddApp } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppsList />} />
        <Route path="/add" element={<AddApp />} />
      </Routes>
    </Router>
  );
}

export default App;
