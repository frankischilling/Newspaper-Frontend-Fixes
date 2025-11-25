import { useState } from "react";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CommentsSection = ({
  comments = [],
  onPostComment,
  disabled = false,
  allComments = [],
}) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { user, profile } = useAuth();
  const handleSubmitComment = async () => {
    if (!newComment.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await onPostComment?.(newComment.trim());
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setSubmitError("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="w-full mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      {/* Comment Input */}
      <div className="mb-4">
        <div className="flex gap-3">
          {user?.profilePicture ? (
            <img
              src={`${import.meta.env.VITE_ASSETS_API_URL}${
                user.profilePicture
              }`}
              alt={user.firstName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
              {user?.firstName?.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                disabled ? "Please log in to comment" : "Write a comment..."
              }
              disabled={disabled || isSubmitting}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || disabled || isSubmitting}
              className="px-3 py-2 cursor-pointer bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 ml-11">{submitError}</div>
        )}
      </div>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="ml-12 max-h-96 overflow-y-auto space-y-3">
          {displayedComments.map((comment, index) => (
            <div
              key={`comment-${comment.id || index}-${comment.time}`}
              className="flex gap-3"
            >
              {comment.avatar ? (
                <img
                  src={
                    comment.avatar.startsWith("/media/")
                      ? `${import.meta.env.VITE_ASSETS_API_URL}${
                          comment.avatar
                        }`
                      : comment.avatar
                  }
                  alt={`${comment.author}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
                  {comment.author?.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.time}
                    </span>
                    {comment.loved && (
                      <span className="text-xs text-red-500 dark:text-red-400">
                        ❤️ Loved this article
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See All Comments Button */}
      {comments.length > 2 && (
        <button
          onClick={() => setShowAllComments(!showAllComments)}
          className="text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 ml-11 mt-3"
        >
          {showAllComments
            ? "Show fewer comments"
            : `See all ${comments.length} comments`}
        </button>
      )}

      {/* No Comments Message */}
      {comments.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
