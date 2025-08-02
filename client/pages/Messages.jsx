import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import ChatList from "@/components/ChatList";
import Chat from "@/components/Chat";

export default function Messages() {
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Check if there's a new chat to start from navigation
  useEffect(() => {
    if (location.state?.newChat) {
      const newChat = {
        id: Date.now(), // Generate temporary ID
        ...location.state.newChat,
      };
      setSelectedChat(newChat);
      setShowChat(true);

      // Clear the navigation state to prevent re-initialization
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedChat(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          {/* Chat List - Hidden on mobile when chat is open */}
          <div className={`lg:col-span-1 ${showChat ? "hidden lg:block" : ""}`}>
            <Card className="h-full">
              <ChatList onSelectChat={handleSelectChat} />
            </Card>
          </div>

          {/* Chat Area */}
          <div
            className={`lg:col-span-2 ${!showChat ? "hidden lg:block" : ""}`}
          >
            <Card className="h-full">
              {selectedChat ? (
                <Chat chatData={selectedChat} onBack={handleBackToList} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <MessageCircle className="w-24 h-24 text-muted-foreground/50 mb-6" />
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Welcome to Messages
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Select a conversation from the left to start chatting with
                    buyers and sellers.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
