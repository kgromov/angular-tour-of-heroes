import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable()
export class MessageService {
  // aka repository
  private messages: string[] = [];
  private isClear = true;

  constructor() { }

  public add(message: string): void {
    this.messages.push(message);
    this.isClear = false;
  }

  public clear(): void {
    this.messages = [];
    this.isClear = true;
  }

  public getMessages(): string[] {
    return this.messages;
  }

  public isReseted(): Observable<boolean> {
    return of(this.isClear);
  }
}
