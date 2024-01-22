import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile/:id" element={<Profile/>}></Route>
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
