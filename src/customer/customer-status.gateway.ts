import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class CustomerStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyCustomer(requestId: number, status: string) {
    this.server.emit(`requestStatus:${requestId}`, { status });
  }

  @SubscribeMessage('updateCustomerStatus')
  handleUpdateCustomerStatus(client: Socket, payload: any) {
    console.log('Received updateCustomerStatus event:', payload);

    this.server.emit('customerStatusUpdated', payload);
  }
}
