import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Footer from './Footer';
import Outfit from './Outfit';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<><Home /><Footer/></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/outfit" element={<><Outfit /><Footer /></>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
