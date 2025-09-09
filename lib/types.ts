export interface User {
  id: number;
  username: string;
  email: string;
  profileimg: string;
}

export interface BingoCard {
  id: number;
  date: string;
  userid: number;
  status: string;
}

export interface Task {
  id: number;
  bingocardsid: number;
  taskname: string;
  iscompleted: boolean;
  islocated: string;
}

export interface TasksByCard {
  [key: number]: Task[];
}
