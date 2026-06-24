import { useState } from "react";
import Sidebar from "../components/Sidebar";

function CreatePost() {
    const [ image, setImage ] = useState(null);
    const [ preview, setPreview ] = useState("");
    const [ caption, setCaption ]= useState("");
    const [ loading, setLoading ]= useState(false);
    const [ error, setError ] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setImage(file);

        if (file){
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="
            min-h-screen
            bg-zinc-950flex
            flex
        ">
            <Sidebar />
            <div className="
                flex-1
                flex
                justify-center
                items-center
                p-6
            ">
                <div className="
                w-full
                max-w-xl
                bg-zinc-900
                p-6
                rounded-xl
                border
                border-zinc-800

                ">
                    <h1 className="
                        text-2xl
                        font-bold
                        text-white
                        mb-6
                    ">
                        Create Post
                    
                    </h1>

                    <div className="mt-6">
                        <input 
                            type="file"
                            accept= "image/*"
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

                            " 
                        />
                        {preview &&(
                            <img
                                src = {preview}
                                alt= "preview"
                                className = "
                                    w-full
                                    rounded-xl
                                    mt-4
                                    mah-h-[500px]
                                    object-contain
                                    bg-zinc-950
                                "
                            />
                        )}
                    </div>
                    <div className="
                w-full
                max-w-xl
                bg-zinc-900
                p-6
                rounded-xl
                border
                border-zinc-800
                "
                >
                    
                </div>
 

                </div>

            </div>
            
        </div>
    );
}

export default CreatePost;