import { useState, useEffect, useCallback } from 'react';

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useWebSocket({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
}: UseWebSocketOptions) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    websocket.onerror = (error) => {
      setIsConnected(false);
      onError?.(error);
    };

    websocket.onclose = () => {
      setIsConnected(false);
      onClose?.();
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [url, onMessage, onError, onOpen, onClose]);

  const send = useCallback(
    (data: any) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    },
    [ws]
  );

  return { ws, isConnected, send };
}
