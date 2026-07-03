import ImageCarousel from "./ImageCarousel";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaEllipsisH, 
} from "react-icons/fa";
import api from "../services/axios";
import{ useState } from "react";

function PostList({ posts, setPosts }) {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  )

  const [ followingIds, setFollowingIds ] = useState(
        currentUser?.following || []
      );

  const handleLike = async (postId) => {
  try {
    const res = await api.post(`/posts/${postId}/like`);

    const { liked } = res.data;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;

        let updatedLikes;

        if (liked) {
          updatedLikes = post.likes.includes(currentUser._id)
          ? post.likes
          : [ ...post.likes, currentUser._id ];
        } else {
          updatedLikes = post.likes.filter(
            (id) => id !== currentUser._id
          );
        }

        return {
          ...post,
          likes: updatedLikes,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const handleFollow = async (userId) => {
  try {
    const res = await api.post(`/users/${userId}/follow`);
    
    const { following } = res.data;

    if(following) {
      setFollowingIds((prev) => [
        ...prev,
        userId
      ]);
    } else {
      setFollowingIds((prev) => 
        prev.filter((id) => id !== userId )
      );
    }

    // setPosts((prevPosts) => 
    //   prevPosts.map((post) => {
    //     if(post.user._id  !== userId) return post;

    //     return post;
    //   })
    // );
  } catch (error) {
    console.log(error);
        
  }
}


  return (
    <div className="flex flex-col gap-8">
      {posts?.map((post) => {

        
      
      const isLiked = post?.likes?.includes(
        currentUser?._id
      );

      const isFollowing = followingIds.includes(
        post?.user?._id
      );

      const isOwnPost = currentUser?._id === post?.user?._id ;

      console.log({
          currentUserId: currentUser?._id,
          postUserId: post?.user?._id,
          isOwnPost,
        });

    return (
          <div
            key={post?._id}
            className="
                w-full
                max-w-xl
                pt-4
                border
                bg-zinc-900
                border-zinc-800
                overflow-hidden
                shadow-lg
                shadow-black/20

            "
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <img 
                  src={
                    post?.user?.profilePic || 
                    `https://ui-avatars.com/api/?name=${post?.user?.username}`
                   }
                   alt = "profile"
                   className="
                    w-9
                    h-9
                    rounded-full
                    object-cover
                    shrink-0
                   "
                />
                <div className="flex flex-col min-w-0 flex-1 text-right">
                  <p className="text-white font-semibold text-sm truncate max-w-[120px] sm:max-w-[180px]">
                    {post?.user?.username}
                  </p>
                </div>

                {!isOwnPost && (
                  <button
                    onClick={() => handleFollow(post.user._id)}
                    className={`
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-zinc-400
                      border
                      border-zinc-500
                      rounded-lg
                      hover:bg-zinc-800
                      hover:text-white
                      transition
                      ${
                        isFollowing
                          ? "bg-zinc-800 text-white border border-zinc-700"
                          : "text-zinc-400 border border-zinc-500 hover:bg-zinc-800 hover:text-white"
                      }
                    `}
                      
                    
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}

              </div>

              <FaEllipsisH
                className="
                  text-zinc-500
                  cursor-pointer
                  hover:text-white
                  transition
                "
              />

              {/* <button
                className="
                  text-zinc-500
                  text-xl
                  hover:text-white
                  transition
                  ml-4
                "
              >
                ⋯
              </button> */}

            </div>

            <ImageCarousel images={post.images} />
            
            {/* Action Bar */}
            <div className=" flex items-center justify-between px-5 pt-4 pb-3">
              <div className="flex gap-5 text-[22px] text-zinc-300">
                {isLiked ? (
                  <FaHeart
                    onClick={() => handleLike(post._id)}
                    className="
                      text-red-500
                      cursor-pointer
                      hover:scale-110
                      transition
                    "
                  />
                ) : (
                  <FaRegHeart
                    onClick={() => handleLike(post._id)}
                    className="
                      cursor-pointer
                      hover:text-red-500
                      hover:scale-110
                      transition
                    "
                  />
                )}
                <FaRegComment 
                  className="
                   cursor-pointer
                   hover:text-blue-500
                   hover:scale-110
                   transition
                  "/>
              </div>
              <FaRegBookmark 
                  className="
                  text-2xl 
                  text-zinc-400
                   cursor-pointer
                   hover:text-white
                   hover:scale-110
                   transition
                  "/>
            </div>

            <div className=" px-5 pt-1 pb-5 text-sm text-zinc-300 font-semibold">
              {post?.likes?.length || 0} likes
            </div>

            <div className="px-5 pt-2 pb-5 text-zinc-300 text-sm leading-relaxed">
              <span className="font-semibold text-white mr-2">
                {post?.user?.username}
              </span>
              &ensp;              
              <span>{post?.caption}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
