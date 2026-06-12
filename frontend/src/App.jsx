import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route>
        path="/login"
        element={<Login />}
      </Route>

      <Route>
        path="/register"
        element={<Register />}
      </Route>

      <Route>
        path="/feed"
        element={<Feed />}
      </Route>

      <Route>
        path="/Profile/:id"
        element = {<Profile />}
      </Route>
    </Routes>
  );
}

export default App;