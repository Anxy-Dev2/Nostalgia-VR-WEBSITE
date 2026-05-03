"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";

export interface ChatUser {
  name: string;
  color: string;
  joinedAt: number;
}

export interface ChatMessage {
  id: string;
  user: ChatUser;
  text: string;
  timestamp: number;
}

export interface SystemMessage {
  text: string;
  timestamp: number;
}

export type DisplayMessage =
  | { type: "chat"; data: ChatMessage }
  | { type: "system"; data: SystemMessage };

interface SocketContextValue {
  connected: boolean;
  currentUser: ChatUser | null;
  messages: DisplayMessage[];
  onlineUsers: ChatUser[];
  onlineCount: number;
  typingUsers: ChatUser[];
  sendMessage: (text: string) => void;
  setTyping: (isTyping: boolean) => void;
  setName: (name: string) => void;
}

const SocketContext = createContext<SocketContextValue>({
  connected: false,
  currentUser: null,
  messages: [],
  onlineUsers: [],
  onlineCount: 0,
  typingUsers: [],
  sendMessage: () => {},
  setTyping: () => {},
  setName: () => {},
});

export function useSocket() {
  return useContext(SocketContext);
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3002";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<ChatUser[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const socket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("init", (data) => {
      setCurrentUser(data.user);
      setOnlineUsers(data.onlineUsers);
      setOnlineCount(data.onlineCount);
      // Load message history
      const history: DisplayMessage[] = data.messages.map((msg: ChatMessage) => ({
        type: "chat" as const,
        data: msg,
      }));
      setMessages(history);
    });

    socket.on("message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, { type: "chat", data: msg }]);
    });

    socket.on("system", (msg: SystemMessage) => {
      setMessages((prev) => [...prev, { type: "system", data: msg }]);
    });

    socket.on("presence", (data) => {
      setOnlineUsers(data.onlineUsers);
      setOnlineCount(data.onlineCount);
    });

    socket.on("typing", ({ user, isTyping }: { user: ChatUser; isTyping: boolean }) => {
      if (isTyping) {
        setTypingUsers((prev) => {
          if (prev.find((u) => u.name === user.name)) return prev;
          return [...prev, user];
        });
        // Auto-clear after 3 seconds
        const existing = typingTimeoutRef.current.get(user.name);
        if (existing) clearTimeout(existing);
        typingTimeoutRef.current.set(
          user.name,
          setTimeout(() => {
            setTypingUsers((prev) => prev.filter((u) => u.name !== user.name));
            typingTimeoutRef.current.delete(user.name);
          }, 3000)
        );
      } else {
        setTypingUsers((prev) => prev.filter((u) => u.name !== user.name));
        const existing = typingTimeoutRef.current.get(user.name);
        if (existing) {
          clearTimeout(existing);
          typingTimeoutRef.current.delete(user.name);
        }
      }
    });

    socket.on("nameUpdated", ({ name }: { name: string }) => {
      setCurrentUser((prev) => (prev ? { ...prev, name } : prev));
    });

    return () => {
      socket.disconnect();
      typingTimeoutRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    socketRef.current?.emit("message", { text });
  }, []);

  const setTyping = useCallback((isTyping: boolean) => {
    socketRef.current?.emit("typing", isTyping);
  }, []);

  const setName = useCallback((name: string) => {
    socketRef.current?.emit("setName", name);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        connected,
        currentUser,
        messages,
        onlineUsers,
        onlineCount,
        typingUsers,
        sendMessage,
        setTyping,
        setName,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
