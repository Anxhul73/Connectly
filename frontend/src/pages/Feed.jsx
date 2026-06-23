import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { useEffect, useState } from "react";

// import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

function Feed() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const getPosts = async () => {
    setError("");

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await api.get("/users/feed");

      setPosts(res.data.posts);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Sidebar handleLogout={handleLogout} />

        <div
          className="
            min-h-[70vh]
            flex
            items-center
            justify-center    
        "
        >
          <div className="text-center">
            <h2
              className="
                text-2xl
                font-semibold
                 text-red-500
            "
            >
              Something went wrong!
            </h2>

            <p className="text-zinc-400 mt-2">{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <Sidebar handleLogout={handleLogout} />

        <div
          className="
            min-h-[70vh]
            flex
            justify-center
            items-center
        "
        >
          <div className="text-center">
            <h2
              className="
                text-2xl
                font-semibold
                 text-white
            "
            >
              No posts yet
            </h2>

            <p
              className="
                 text-zinc-400
                    mt-2
                "
            >
              Follow users to start building your feed.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 border-2 border-zinc-600 flex">
      {/* <Navbar handleLogout={handleLogout} /> */}
      <Sidebar handleLogout={handleLogout} />

      <div
        className=" 
            flex-1
            flex
            flex-col
            items-center                                 
            px-4 
            mt-6
        "
      >
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default Feed;
