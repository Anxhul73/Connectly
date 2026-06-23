function PostList({ posts }) {
  console.log(posts);

  return (
    <>
      {posts?.map((post) => {
        return (
          <div
            key={post?._id}
            className="
                            w-full
                            max-w-lg
                            rounded-xl
                            border
                            bg-zinc-900
                            border-zinc-800
                            overflow-hidden
                            mb-8
                            shadow-lg
                            shadow-black/20
                            
                        "
          >
            <p
              className="
                                px-4
                                py-4
                                text-white
                                text-m
                            "
            >
              {post?.user?.username || "uuuuu"}
            </p>

            <img
              src={post?.image}
              alt="post"
              className="
                                w-full
                                max-h-[500px]
                                object-contain
                                bg-zinc-950
                            "
            />

            <p
              className="
                                px-4
                                py-4
                                text-zinc-300
                            "
            >
              {post?.caption}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default PostList;
