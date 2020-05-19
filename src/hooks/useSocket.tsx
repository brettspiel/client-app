import React, { createContext, useCallback, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { SocketEvent, SocketEventType } from "../types/io/SocketEvent";

export type SocketContextValue = {
  socket?: typeof Socket;
};

export const SocketContext = createContext<SocketContextValue>({});
export const SocketProvider: React.FunctionComponent = ({ children }) => {
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socketContextValue = useContext(SocketContext);

  const connect = useCallback(
    (serverAddress: string) => {
      socketContextValue.socket = io(serverAddress);
    },
    [socketContextValue.socket]
  );

  const disconnect = useCallback(() => {
    if (socketContextValue.socket) {
      socketContextValue.socket.disconnect();
    }
  }, [socketContextValue.socket]);

  const emit = useCallback(
    <T extends SocketEventType>(type: T, value: SocketEvent[T]) => {
      if (socketContextValue.socket) {
        socketContextValue.socket.emit(type, value);
      }
    },
    [socketContextValue.socket]
  );

  const subscribe = useCallback(
    <T extends SocketEventType>(
      type: T,
      subscriber: (value: SocketEvent[T]) => void
    ) => {
      if (socketContextValue.socket) {
        socketContextValue.socket.on(type, subscriber);
      }
    },
    [socketContextValue.socket]
  );

  const unsubscribe = useCallback(
    <T extends SocketEventType>(
      type: T,
      subscriber: (value: SocketEvent[T]) => void
    ) => {
      if (socketContextValue.socket) {
        socketContextValue.socket.off(type, subscriber);
      }
    },
    [socketContextValue.socket]
  );

  return {
    connect,
    disconnect,
    emit,
    subscribe,
    unsubscribe,
  };
};
