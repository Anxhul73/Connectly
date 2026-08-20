import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import Post from "./components/Post"

function App() {
  return (
    <Routes>

      <Route
          path="/login"
          element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Profile/:id"
        element = {
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route 
        path= "/create-post"
        element = {
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
        />

      <Route 
        path = "/posts/:id"
        element = {<Post />}
      />
    </Routes>
    
  );
}

export default App;
