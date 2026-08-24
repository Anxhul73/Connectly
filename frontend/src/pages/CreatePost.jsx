import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Trash2, Plus } from "lucide-react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Sidebar/Loader";

function CreatePost() {
    const navigate = useNavigate();

    const [ images, setImages ] = useState([]);
    const [ previews, setPreviews ] = useState([]);
    const [ caption, setCaption ]= useState("");
    const [ loading, setLoading ]= useState(false);
    const [ error, setError ] = useState("");

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        setImages((prev) => [...prev, ...files]);

        setPreviews((prev) => [
            ...prev,
            ...files.map(file => URL.createObjectURL(file)),
        ]);
    }

    const handleImageDelete = (indexToDelete) => {
        setImages((prev) => 
            prev.filter((_, index) => index !== indexToDelete)
        );

        setPreviews((prev) => 
            prev.filter((_, index) => index !== indexToDelete)
        );
    }

    const handleSubmit = async () => {
        try {
          setLoading(true);
          setError("");

          const formData = new FormData();

          images.forEach((image) => {
            formData.append("images", image);
          });
          formData.append("caption", caption);

          const token = localStorage.getItem("token");

          const response = await api.post("/posts/create-post", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response.data);
          // Clear the form
          setImages([]);
          setPreviews([]);
          setCaption("");

          await new Promise(resolve => 
            setTimeout(resolve, 3000)
          );

          // Redirect to Feed
          navigate("/feed");
          
        } catch (error) {
            console.log(error);
            
            setError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    

    return (
      <>
        {loading && (
          <Loader
            open={loading}
            title="Uploading your post..."
            subtitle="Please wait while we process your images."
          />
        )}
        <div
          className="
            min-h-screen
            flex
        "
        >
          <Sidebar />
          <div
            className="
            flex-1
            min-h-screen
            flex
            justify-center
            items-center
            p-6    
          "
          >
            <div
              className="
              w-full
              max-w-2xl
              bg-zinc-900
              p-8
              rounded-2xl
              border
              border-zinc-800
              
            "
            >
              <h1
                className="
                text-2xl
                font-bold
                text-white
                mb-6
              "
              >
                Create Post
              </h1>

              <div className="mt-6 ">
                <input
                  type="file"
                  multiple
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="
                                w-full
                                text-zinc-300
                                border
                                border-zinc-700
                                rounded-lg
                                p-3
                                bg-zinc-800
                                overflow-hidden
                                hidden

                            "
                />

                {previews.length === 0 && (
                  <label
                    htmlFor="imageUpload"
                    className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-2
                                w-full
                                h-52
                                border-2
                                border-dashed
                                border-zinc-700
                                rounded-2xl
                                cursor-pointer
                                bg-zinc-900
                                hover:border-indigo-500
                                hover:bg-zinc-800
                                transition-all
                                duration-300
                                
                            "
                  >
                    <span className="text-3xl">📸</span>

                    <p className="text white- font-medium">PNG, JPG, JPEG</p>
                  </label>
                )}

                {previews.length > 0 && (
                  <div className="relative mt-4">
                    <div
                      className={`grid gap-3 ${
                        previews.length === 1 ? "grid-cols-1" : "grid-cols-2"
                      }`}
                    >
                      {previews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-xl"
                        >
                          <img
                            src={preview}
                            alt={`preview-${index}`}
                            className="
                            w-full
                                h-64
                                object-contain
                            "
                          />

                          <button
                            type="button"
                            onClick={() => handleImageDelete(index)}
                            className="
                            absolute
                            top-2
                            right-2
                            w-8
                            h-8
                            rounded-full
                            bg-zinc-800
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-zinc-700
                            transition-all
                            duration-300
                        "
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <input
                      type="file"
                      multiple
                      id="imageUploadFloating"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={loading}
                    />

                    <label
                      htmlFor="imageUploadFloating"
                      className="
                        absolute
                        bottom-4
                        right-4
                        w-12
                        h-12
                        rounded-full
                        bg-black/70
                        backdrop-blur-md
                        border
                        border-zinc-700
                        text-white
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover:bg-indigo-500
                        transition-all
                        duration-300
                      "
                    >
                      <Plus size={24} />
                    </label>
                  </div>
                )}
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                maxLength={400}
                disabled={loading}
                className="
                  w-full
                  bg-zinc-900
                  mt-4
                  p-6
                  rounded-xl
                  border
                  border-zinc-800
                  text-white
                  resize-none
                "
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  w-full
                  mt-4
                  py-3
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-400
                  text-white
                  font-semibold
                  transition-all
              "
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    Uploading Post...
                  </div>
                ) : (
                  "Upload Post"
                )}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </>
    );
}

export default CreatePost;