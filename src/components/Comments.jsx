import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState } from "react";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [commentText, setCommentText] = useState(""); // State to track textarea value
  
    const { isPending, error, data } = useQuery({
      queryKey: ["comments", postId],
      queryFn: () => fetchComments(postId),
    });
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (newComment) => {
        const token = await getToken();
        return axios.post(
          `${import.meta.env.VITE_API_URL}/comments/${postId}`,
          newComment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        setCommentText(""); // Clear textarea after successful submission
      },
      onError: (error) => {
        toast.error(error.response.data);
      },
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!commentText.trim()) return; // Prevent empty submissions
  
      mutation.mutate({ desc: commentText });
    };
  
    return (
      <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
        <h1 className="text-xl text-gray-500 underline">Comments</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-8 w-full"
        >
          <textarea
            name="desc"
            placeholder="Write a comment..."
            className="w-full p-4 rounded-xl"
            value={commentText} // Bind value to state
            onChange={(e) => setCommentText(e.target.value)} // Update state on change
          />
          <button
            type="submit"
            className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl"
          >
            Send
          </button>
        </form>
        {isPending ? (
          "Loading..."
        ) : error ? (
          "Error loading comments!"
        ) : (
          <>
            {mutation.isPending && (
              <Comment
                comment={{
                  desc: `${mutation.variables.desc} (Sending...)`,
                  createdAt: new Date(),
                  user: {
                    img: user.imageUrl,
                    username: user.username,
                  },
                }}
              />
            )}
            
            {data.map((comment) => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))}
          </>
        )}
      </div>
    );
  };
  
  export default Comments;