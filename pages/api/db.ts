import Dexie, { Table } from 'dexie';

export interface ChatLists {
  id?: number;
  title: string;
}

export interface Message {
  id?: number;
  chatlistId?: string;
  name: string;
  message: string;
}

export class ChatApp extends Dexie {

  chatlists!: Table<ChatLists,number>; 
  messages!: Table<Message,number>; 

  constructor() {
    super('ChatApp');
    this.version(1).stores({
      chatlists: '++id, title',
      messages: '++id,chatlistId, name, message'
    });
  }
}

export const db = new ChatApp();


