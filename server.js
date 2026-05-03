const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3002;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", process.env.CLIENT_URL].filter(Boolean),
    methods: ["GET", "POST"],
  },
});

// In-memory state
const onlineUsers = new Map(); // socketId -> { name, color, joinedAt }
const messageHistory = []; // Last 50 messages
const MAX_HISTORY = 50;

// Generate a random animal-based guest name
const animals = [
  "Fox", "Wolf", "Bear", "Hawk", "Lynx", "Raven", "Cobra", "Viper",
  "Falcon", "Tiger", "Panther", "Eagle", "Shark", "Phoenix", "Dragon",
  "Jaguar", "Cipher", "Ghost", "Shadow", "Spectre", "Ronin", "Maverick",
];

const adjectives = [
  "Silent", "Swift", "Dark", "Neon", "Cyber", "Stealth", "Chrome",
  "Quantum", "Void", "Pixel", "Binary", "Glitch", "Apex", "Zero",
];

function generateName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj}${animal}`;
}

// Generate a color from the portfolio palette
const userColors = [
  "#f97316", "#fb923c", "#f59e0b", "#10b981", "#3b82f6",
  "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#ef4444",
];

function generateColor() {
  return userColors[Math.floor(Math.random() * userColors.length)];
}

io.on("connection", (socket) => {
  const user = {
    name: generateName(),
    color: generateColor(),
    joinedAt: Date.now(),
  };
  onlineUsers.set(socket.id, user);

  // Send user their identity + history + online users
  socket.emit("init", {
    user,
    messages: messageHistory,
    onlineUsers: Array.from(onlineUsers.values()),
    onlineCount: onlineUsers.size,
  });

  // Broadcast updated user count
  io.emit("presence", {
    onlineUsers: Array.from(onlineUsers.values()),
    onlineCount: onlineUsers.size,
  });

  // Broadcast join notification
  io.emit("system", {
    text: `${user.name} joined the chat`,
    timestamp: Date.now(),
  });

  // Handle chat messages
  socket.on("message", (data) => {
    if (!data.text || typeof data.text !== "string") return;
    const text = data.text.trim().slice(0, 500); // Limit message length
    if (!text) return;

    const message = {
      id: `${socket.id}-${Date.now()}`,
      user: onlineUsers.get(socket.id),
      text,
      timestamp: Date.now(),
    };

    messageHistory.push(message);
    if (messageHistory.length > MAX_HISTORY) {
      messageHistory.shift();
    }

    io.emit("message", message);
  });

  // Handle typing indicators
  socket.on("typing", (isTyping) => {
    socket.broadcast.emit("typing", {
      user: onlineUsers.get(socket.id),
      isTyping,
    });
  });

  // Handle name change
  socket.on("setName", (name) => {
    if (!name || typeof name !== "string") return;
    const cleanName = name.trim().slice(0, 20);
    if (!cleanName) return;
    const oldName = onlineUsers.get(socket.id)?.name;
    onlineUsers.get(socket.id).name = cleanName;

    io.emit("system", {
      text: `${oldName} is now ${cleanName}`,
      timestamp: Date.now(),
    });
    io.emit("presence", {
      onlineUsers: Array.from(onlineUsers.values()),
      onlineCount: onlineUsers.size,
    });
    socket.emit("nameUpdated", { name: cleanName });
  });

  // Disconnect
  socket.on("disconnect", () => {
    const leaving = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);

    if (leaving) {
      io.emit("system", {
        text: `${leaving.name} left the chat`,
        timestamp: Date.now(),
      });
    }

    io.emit("presence", {
      onlineUsers: Array.from(onlineUsers.values()),
      onlineCount: onlineUsers.size,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`\n  Chat server running on http://localhost:${PORT}\n`);
});
