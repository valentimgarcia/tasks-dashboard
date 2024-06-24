export interface TaskChart {
  name: string;
  amt: number;
}

export interface TaskHistory {
  usernameInitials: string;
  title: string;
  date: string;
  taskId: string;
}

export const tasksChart: TaskChart[] = [
  {
    name: "18-06",
    amt: 2,
  },
  {
    name: "19-06",
    amt: 1,
  },
  {
    name: "22-06",
    amt: 11,
  },
  {
    name: "23-06",
    amt: 3,
  },
  {
    name: "24-06",
    amt: 7,
  },
  {
    name: "25-06",
    amt: 4,
  },
];

export const tasksHistory: TaskHistory[] = [
  {
    usernameInitials: "AS",
    title: "Task created",
    date: "25-06-2024 12:09",
    taskId: "TASK-95027",
  },
  {
    usernameInitials: "JD",
    title: "Task title edited",
    date: "24-06-2024 16:09",
    taskId: "TASK-67481",
  },
  {
    usernameInitials: "CR",
    title: "Task marked as favorite",
    date: "24-06-2024 11:24",
    taskId: "TASK-38472",
  },
  {
    usernameInitials: "RD",
    title: "Task deleted",
    date: "23-06-2024 09:47",
    taskId: "TASK-15739",
  },
  {
    usernameInitials: "BO",
    title: "Task priority edited",
    date: "23-06-2024 08:53",
    taskId: "TASK-78234",
  },
  {
    usernameInitials: "JD",
    title: "Task status edited",
    date: "22-06-2024 21:14",
    taskId: "TASK-26982",
  },
  {
    usernameInitials: "DR",
    title: "Task created",
    date: "19-06-2024 21:14",
    taskId: "TASK-89412",
  },
  {
    usernameInitials: "CR",
    title: "Task deleted",
    date: "19-06-2024 19:35",
    taskId: "TASK-10983",
  },
  {
    usernameInitials: "AS",
    title: "Task type changed",
    date: "19-06-2024 17:42",
    taskId: "TASK-45027",
  },
];
