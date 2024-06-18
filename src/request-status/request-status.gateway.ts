import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RequestStatusGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('requestStatus')
  handleRequestStatus(@MessageBody() data: string): string {
    // Handle request status updates
    return data;
  }

  notifyUser(userId: string, status: string) {
    this.server.emit(`status_${userId}`, status);
  }
}
