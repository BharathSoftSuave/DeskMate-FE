import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  try {
    if (!socket) {
      socket = io(import.meta.env.VITE_API_BASE_URL, {
        path: "/socket.io",
        query: { token },
        transports: ["websocket"], // force only websocket if you want
        reconnection: true, // auto reconnect if connection drops
        reconnectionAttempts: 5,
        reconnectionDelay: 1000, // 1 sec
      });
    } 
    return socket;
  } catch (error) {
    console.error("Socket connection error:", error);
  }
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
