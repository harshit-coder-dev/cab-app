import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DriverGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('receiveRequest')
  handleReceiveRequest(@MessageBody() data: string): string {
    // Handle receiving requests from customers
    return data;
  }

  notifyDriver(driverId: string, request: any) {
    this.server.emit(`request_${driverId}`, request);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
