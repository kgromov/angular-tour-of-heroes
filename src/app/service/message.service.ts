import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  // aka repository
  private messages: string[] = [];

  constructor() { }

  public add(message: string): void {
    this.messages.push(message);
  }

  public clear(): void {
    this.messages = [];
  }

  public getMessages(): string[] {
    return this.messages;
  }
}
