export interface Message {
  message: string;
  sender: string | true;
}

export interface MessageData {
  message: string;
  room: string;
}
