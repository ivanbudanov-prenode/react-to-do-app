import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Tasks from "./Tasks";

const App = () => {
  return (
    
    <>
    <div className="App"> 
      <Router>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>

    </div>
        
    </>
  );
};


export default App;