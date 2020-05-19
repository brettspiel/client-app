import { Socket } from "socket.io";
import { SocketEvent, SocketEventType } from "../src/types/SocketEvent";

export class SocketEventService {
  constructor(private socket: Socket) {}

  emit = <T extends SocketEventType>(
    type: T,
    value: SocketEvent[T],
    broadcast?: boolean
  ) => {
    if (broadcast) {
      this.socket.broadcast.emit(type, value);
    } else {
      this.socket.emit(type, value);
    }
  };

  subscribe = <T extends SocketEventType>(
    type: T,
    subscriber: (value: SocketEvent[T]) => void
  ) => {
    this.socket.on(type, subscriber);
  };

  unsubscribe = <T extends SocketEventType>(
    type: T,
    subscriber: (value: SocketEvent[T]) => void
  ) => {
    this.socket.off(type, subscriber);
  };
}
