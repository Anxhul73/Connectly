import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axios";

function Post (){
    const {id} = useParams();

    useEffect(() => {
        api.get(`/posts/${id}`);
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-white text-xl text-center flex items-center justify-center">
            <h1>Single Post Page Coming Soon</h1>
        </div>
    )
}

export default Post;
