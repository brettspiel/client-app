export class EventsApi {
  private source?: EventSource;
  private onEvent?: (event: MessageEvent) => void;
  constructor(private serverAddress: string) {}

  isConnecting = (): boolean => !!this.source && !!this.onEvent;

  connect = (userId: string, onEvent: (event: MessageEvent) => void) => {
    this.onEvent = onEvent;
    const source = new EventSource(`${this.serverAddress}/events/${userId}`);
    source.addEventListener("message", onEvent);
  };

  disconnect = () => {
    if (this.source && this.onEvent) {
      this.source.removeEventListener("message", this.onEvent);
    }
  };
}
