"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/context/SocketContext";
import type { DisplayMessage } from "@/context/SocketContext";

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TypingIndicator({ users }: { users: { name: string; color: string }[] }) {
  if (users.length === 0) return null;

  const text =
    users.length === 1
      ? `${users[0].name} is typing`
      : users.length === 2
        ? `${users[0].name} and ${users[1].name} are typing`
        : `${users[0].name} and ${users.length - 1} others are typing`;

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 text-xs text-muted"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
    >
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accent/60"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <span>{text}</span>
    </motion.div>
  );
}

function MessageBubble({ msg, isOwn }: { msg: DisplayMessage; isOwn: boolean }) {
  if (msg.type === "system") {
    return (
      <motion.div
        className="flex justify-center py-1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="rounded-full bg-dark-400/30 px-3 py-1 text-[10px] text-dark-500">
          {msg.data.text}
        </span>
      </motion.div>
    );
  }

  const { user, text, timestamp } = msg.data;

  return (
    <motion.div
      className={`flex gap-2 ${isOwn ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Avatar */}
      <div
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          backgroundColor: `${user.color}20`,
          color: user.color,
          border: `1px solid ${user.color}40`,
        }}
      >
        {user.name.slice(0, 2)}
      </div>

      <div className={`max-w-[75%] ${isOwn ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
        {/* Name + Time */}
        <div className={`flex items-center gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
          <span className="text-[11px] font-semibold" style={{ color: user.color }}>
            {user.name}
          </span>
          <span className="text-[9px] text-dark-500">{formatTime(timestamp)}</span>
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
            isOwn
              ? "rounded-tr-sm bg-accent/15 text-heading"
              : "rounded-tl-sm bg-dark-300/80 text-body"
          }`}
          style={
            isOwn
              ? { border: "1px solid rgba(249, 115, 22, 0.2)" }
              : { border: "1px solid rgba(255,255,255,0.04)" }
          }
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function OnlineUsersList({
  users,
  show,
}: {
  users: { name: string; color: string }[];
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute right-0 bottom-full mb-2 w-48 overflow-hidden rounded-xl border border-dark-400/50 bg-dark-200 shadow-2xl shadow-black/40"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="border-b border-dark-400/30 px-3 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              Online — {users.length}
            </span>
          </div>
          <div className="max-h-40 overflow-y-auto p-2">
            {users.map((user, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                <div className="relative">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold"
                    style={{
                      backgroundColor: `${user.color}20`,
                      color: user.color,
                    }}
                  >
                    {user.name.slice(0, 2)}
                  </div>
                  <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-dark-200 bg-emerald-400" />
                </div>
                <span className="truncate text-xs text-body">{user.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LiveChat() {
  const {
    connected,
    currentUser,
    messages,
    onlineUsers,
    onlineCount,
    typingUsers,
    sendMessage,
    setTyping,
  } = useSocket();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const lastMessageCount = useRef(0);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // New message indicator when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > lastMessageCount.current && lastMessageCount.current > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.type === "chat" && lastMsg.data.user.name !== currentUser?.name) {
        setHasNewMessage(true);
      }
    }
    lastMessageCount.current = messages.length;
  }, [messages, isOpen, currentUser]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
    setTyping(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, [input, sendMessage, setTyping]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);

      // Typing indicator
      setTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTyping(false), 2000);
    },
    [setTyping]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="fixed right-6 bottom-6 z-50 md:right-8 md:bottom-8">
      {/* Online Users Popover */}
      <OnlineUsersList users={onlineUsers} show={showUsers && isOpen} />

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 bottom-16 w-[340px] overflow-hidden rounded-2xl border border-dark-400/40 bg-dark-200/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[380px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-dark-400/30 px-4 py-3">
              {/* Orange glow line */}
              <div className="absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <svg
                      className="h-4 w-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  {connected && (
                    <div className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-dark-200 bg-emerald-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-heading">
                    Live Chat
                  </h3>
                  <p className="text-[10px] text-muted">
                    {connected ? `${onlineCount} online` : "Connecting..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Online users button */}
                <button
                  onClick={() => setShowUsers(!showUsers)}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted transition-colors hover:bg-dark-300 hover:text-heading"
                >
                  <div className="flex -space-x-1.5">
                    {onlineUsers.slice(0, 3).map((u, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border border-dark-200 text-[6px] font-bold leading-4 text-center"
                        style={{
                          backgroundColor: `${u.color}30`,
                          color: u.color,
                        }}
                      >
                        {u.name[0]}
                      </div>
                    ))}
                  </div>
                  <span>{onlineCount}</span>
                </button>

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-muted transition-colors hover:bg-dark-300 hover:text-heading"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex h-[320px] flex-col overflow-y-auto overscroll-contain px-3 py-3 chat-scrollbar">
              {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <svg
                      className="h-6 w-6 text-accent/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">No messages yet</p>
                    <p className="text-[11px] text-muted">
                      Be the first to say something
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {messages.map((msg, i) => (
                    <MessageBubble
                      key={msg.type === "chat" ? msg.data.id : `sys-${i}`}
                      msg={msg}
                      isOwn={
                        msg.type === "chat" &&
                        msg.data.user.name === currentUser?.name
                      }
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Typing indicator */}
            <AnimatePresence>
              {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-dark-400/30 p-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={connected ? "Type a message..." : "Connecting..."}
                    disabled={!connected}
                    className="w-full rounded-xl border border-dark-400/40 bg-dark-300/60 px-4 py-2.5 text-[13px] text-heading placeholder-dark-500 outline-none transition-colors focus:border-accent/40 focus:bg-dark-300 disabled:opacity-50"
                    maxLength={500}
                  />
                </div>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || !connected}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent transition-all hover:bg-accent/25 disabled:opacity-30 disabled:hover:bg-accent/15"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Your identity */}
              {currentUser && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-dark-500">
                    Chatting as{" "}
                    <span style={{ color: currentUser.color }} className="font-semibold">
                      {currentUser.name}
                    </span>
                  </span>
                  <span className="text-[9px] text-dark-500/50">
                    {input.length}/500
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Orb */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-md transition-all group-hover:bg-accent/30 group-hover:blur-lg" />

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/30"
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        )}

        {/* Button body */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-accent/30 bg-dark-200">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                className="h-5 w-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                className="h-5 w-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* New message badge */}
        <AnimatePresence>
          {hasNewMessage && !isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-dark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              !
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online count badge */}
        {connected && onlineCount > 0 && !isOpen && (
          <div className="absolute -bottom-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-dark bg-emerald-500 px-1 text-[8px] font-bold text-white">
            {onlineCount}
          </div>
        )}
      </motion.button>
    </div>
  );
}
