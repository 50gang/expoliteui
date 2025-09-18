'use client';

import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({children}: {children: React.ReactNode})  {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(process.env.NEXT_PUBLIC_BACKEND_URL);

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return (<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>);
}

export const useSocketContext = () => {
    return useContext(SocketContext);
}