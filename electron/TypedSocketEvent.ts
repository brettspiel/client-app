import { Socket } from "socket.io";
import { SocketEvent, SocketEventType } from "../src/types/io/SocketEvent";

export class TypedSocketEvent {
  constructor(private socket: Socket, private isBroadcaster: boolean = false) {}

  public broadcast = this.isBroadcaster
    ? null
    : new TypedSocketEvent(this.socket.broadcast, true);

  emit = <T extends SocketEventType>(type: T, value: SocketEvent[T]) => {
    if (this.broadcast) {
      this.socket.broadcast.emit(type, value);
    } else {
      this.socket.emit(type, value);
    }
  };

  on = <T extends SocketEventType>(
    type: T,
    listener: (value: SocketEvent[T]) => void
  ) => {
    this.socket.on(type, listener);
  };

  off = <T extends SocketEventType>(
    type: T,
    listener: (value: SocketEvent[T]) => void
  ) => {
    this.socket.off(type, listener);
  };
}
