export interface User {
  id: number;
  username: string;
  profileImg: string;
}

export interface BingoCard {
  id: number;
  date: string;
}

export interface Task {
  id: number;
  taskname: string;
  iscompleted: boolean;
}

export interface TasksByCard {
  [key: number]: Task[];
}
