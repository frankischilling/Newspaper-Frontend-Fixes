// src\components\common\InteractionButtons.jsx
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const InteractionButtons = ({
  className,
  size = "default",
  onCommentClick,
  showCommentsCount = 0,
  onLoveClick,
  isLoved = false,
  loveCount = 0,
  disabled = false,
  isLoggedIn = false,
  onAuthRequired = null,
}) => {
  const iconSize = size === "small" ? 16 : 18;
  const fontSize = size === "small" ? "text-xs" : "text-sm";
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoveClick = async () => {
    if (isProcessing) return;

    // Check authentication first
    if (!isLoggedIn) {
      onAuthRequired?.();
      return;
    }

    setIsProcessing(true);
    try {
      // Toggle love status - if currently loved, send false; if not loved, send true
      await onLoveClick?.(!isLoved);
    } catch (error) {
      console.error("Failed to toggle love:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommentClick = () => {
    // Check authentication first
    if (!isLoggedIn) {
      onAuthRequired?.();
      return;
    }

    onCommentClick?.();
  };

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      {/* Love Button */}
      <button
        onClick={handleLoveClick}
        disabled={isProcessing}
        className={cn(
          "flex cursor-pointer items-center transition-all duration-200 hover:scale-105",
          isLoved
            ? "text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
            : "text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400",
          isProcessing && "opacity-50 cursor-not-allowed hover:scale-100"
        )}
        aria-label={isLoved ? "Unlike this article" : "Like this article"}
      >
        <Heart
          size={iconSize}
          className={cn(
            "mr-2 transition-all duration-200",
            isLoved && "fill-current animate-pulse",
            isProcessing && "animate-spin"
          )}
        />
        <span className={cn(fontSize, "font-medium")}>
          {isLoved ? "Loved" : "Love"}
          {loveCount > 0 && ` (${loveCount})`}
        </span>
      </button>

      {/* Comment Button */}
      <button
        onClick={handleCommentClick}
        className={cn(
          "flex cursor-pointer items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
        )}
        aria-label="View comments"
      >
        <MessageCircle size={iconSize} className="mr-2" />
        <span className={cn(fontSize, "font-medium")}>
          Comment
          {showCommentsCount > 0 && ` (${showCommentsCount})`}
        </span>
      </button>
    </div>
  );
};

export default InteractionButtons;
