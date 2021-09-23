import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized');
  }
  handleConnection(client: Socket, ...args): any {
    this.logger.log(`Client successfully connected ${client.id}`);
  }
  handleDisconnect(client: Socket): any {
    this.logger.log(`Client has been disconnected ${client.id}`);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return { event: 'message', data: payload };
  }
}
