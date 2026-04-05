const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-base-300 animate-pulse" />
          </div>
          <div className="chat-bubble bg-base-300 animate-pulse h-12 w-24" />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
