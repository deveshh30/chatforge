import { useChatStore } from "../store/useChat";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {selectedUser && (
            <>
              <div className="avatar">
                <div className="size-10 rounded-full relative">
                  <img
                    src={selectedUser.profileImage || "/avatar.png"}
                    alt={selectedUser.fullName}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{selectedUser.fullName}</h3>
                <p className="text-sm text-base-500">Online</p>
              </div>
            </>
          )}
        </div>
        {selectedUser && (
          <button onClick={() => setSelectedUser(null)}>
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
