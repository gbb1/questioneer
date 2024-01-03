import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface Props {
  children: React.ReactNode;
}

const PORT = 8089;
const SERVER_URL = `http://localhost:${PORT}`;

const socket = io(SERVER_URL);

interface socketContextType {
  socket: Socket | null;
  socketLoading: Boolean;
}

export const SocketContext = createContext<socketContextType>({
    socket: null,
    socketLoading: true,
})

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const [socketLoading, setSocketLoading] = useState<Boolean>(true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("connection-success", (id) => {
      console.log("Connected with id:", id);
      setSocketLoading(false);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  const contextObject = {
    socket,
    socketLoading,
  }

  return (
    <SocketContext.Provider value={contextObject}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
