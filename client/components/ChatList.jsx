import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Search, Plus } from "lucide-react";
import Chat from "./Chat";

// Mock chat data
const mockChats = [
  {
    id: 1,
    otherUser: {
      name: "Sarah Chen",
      role: "seller",
      isOnline: true,
    },
    item: {
      title: "MacBook Pro 13\" M1",
      price: 899,
    },
    lastMessage: {
      text: "Sure! I can meet you at the library today at 3 PM.",
      timestamp: "2 min ago",
      isRead: false,
    },
    messages: [
      {
        id: 1,
        text: "Hi! Is this MacBook still available?",
        sender: "me",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        text: "Yes, it's still available! Are you interested?",
        sender: "other",
        timestamp: "10:32 AM",
      },
      {
        id: 3,
        text: "Great! Can we meet to check it out?",
        sender: "me",
        timestamp: "10:35 AM",
      },
      {
        id: 4,
        text: "Sure! I can meet you at the library today at 3 PM.",
        sender: "other",
        timestamp: "10:37 AM",
      },
    ],
  },
  {
    id: 2,
    otherUser: {
      name: "Mike Rodriguez",
      role: "buyer",
      isOnline: false,
    },
    item: {
      title: "Calculus Textbook Bundle",
      price: 65,
    },
    lastMessage: {
      text: "What's the condition of the books?",
      timestamp: "1 hour ago",
      isRead: true,
    },
    messages: [
      {
        id: 1,
        text: "Hey, I'm interested in your calculus textbooks",
        sender: "other",
        timestamp: "9:15 AM",
      },
      {
        id: 2,
        text: "Hi! Which books are you looking for specifically?",
        sender: "me",
        timestamp: "9:20 AM",
      },
      {
        id: 3,
        text: "What's the condition of the books?",
        sender: "other",
        timestamp: "9:25 AM",
      },
    ],
  },
  {
    id: 3,
    otherUser: {
      name: "Emma Wilson",
      role: "buyer",
      isOnline: true,
    },
    item: {
      title: "IKEA Desk Chair",
      price: 45,
    },
    lastMessage: {
      text: "Perfect! I'll take it. When can we meet?",
      timestamp: "3 hours ago",
      isRead: true,
    },
    messages: [
      {
        id: 1,
        text: "Is the desk chair still available?",
        sender: "other",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        text: "Yes! It's in great condition, barely used.",
        sender: "me",
        timestamp: "Yesterday",
      },
      {
        id: 3,
        text: "Perfect! I'll take it. When can we meet?",
        sender: "other",
        timestamp: "Yesterday",
      },
    ],
  },
];

export default function ChatList({ onSelectChat }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);

  const filteredChats = mockChats.filter((chat) =>
    chat.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.item?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat?.(chat);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChatId === chat.id ? "bg-brand-purple/5 border-r-2 border-brand-purple" : ""
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-brand-purple text-white">
                        {chat.otherUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {chat.otherUser.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {chat.otherUser.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.lastMessage.timestamp}
                      </span>
                    </div>
                    
                    {chat.item && (
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {chat.otherUser.role === "seller" ? "Selling" : "Buying"}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {chat.item.title}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        !chat.lastMessage.isRead ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}>
                        {chat.lastMessage.text}
                      </p>
                      {!chat.lastMessage.isRead && (
                        <div className="w-2 h-2 bg-brand-purple rounded-full flex-shrink-0 ml-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? "No chats found" : "No messages yet"}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Start conversations when you find items you're interested in"
                }
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
