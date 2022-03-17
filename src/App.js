import "./App.css";
import Authentification from "./pages/Authentifcation";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Dashbored from "./pages/Dashbored";
import {useSelector} from "react-redux";

function App() {
  const logedIn = useSelector(state => state.userReducer.logedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Authentification />} />
        {logedIn && <Route path="/dashbored/*" element={<Dashbored />} />}
        <Route
          path="*"
          element={<Navigate to={logedIn ? "/dashbored" : "/auth"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
