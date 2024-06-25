import { format, subDays, setHours, setMinutes } from "date-fns";

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

const generateTaskChartData = () => {
  const today = new Date();
  const amtValues = [2, 1, 11, 3, 7, 4];
  return amtValues.map((amt, index) => {
    const date = subDays(today, amtValues.length - index - 1);
    return {
      name: format(date, "dd-MM"),
      amt: amt,
    };
  });
};

const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 10) + 8;
  const randomMinute = Math.floor(Math.random() * 60);
  return { randomHour, randomMinute };
};

const generateTaskHistoryData = () => {
  const today = new Date();
  const taskDetails = [
    { usernameInitials: "AS", title: "Task created", taskId: "TASK-95027" },
    {
      usernameInitials: "DV",
      title: "Task type changed",
      taskId: "TASK-12094",
    },
    {
      usernameInitials: "JD",
      title: "Task title edited",
      taskId: "TASK-67481",
    },
    {
      usernameInitials: "CR",
      title: "Task marked as favorite",
      taskId: "TASK-38472",
    },
    { usernameInitials: "RD", title: "Task deleted", taskId: "TASK-15739" },
    {
      usernameInitials: "BO",
      title: "Task priority edited",
      taskId: "TASK-78234",
    },
    {
      usernameInitials: "JD",
      title: "Task status edited",
      taskId: "TASK-26982",
    },
    { usernameInitials: "DR", title: "Task created", taskId: "TASK-89412" },
    { usernameInitials: "CR", title: "Task deleted", taskId: "TASK-10983" },
    {
      usernameInitials: "AS",
      title: "Task type changed",
      taskId: "TASK-45027",
    },
    {
      usernameInitials: "RD",
      title: "Task marked as favorite",
      taskId: "TASK-25734",
    },
    { usernameInitials: "BO", title: "Task created", taskId: "TASK-38269" },
  ];

  return taskDetails.map((taskDetail, index) => {
    const date = subDays(today, Math.floor(index / 2)); // 2 tasks per day
    const { randomHour, randomMinute } = getRandomTime();
    const randomDate = setMinutes(setHours(date, randomHour), randomMinute);
    return {
      ...taskDetail,
      date: format(randomDate, "dd-MM-yyyy HH:mm"),
    };
  });
};

export const tasksChart: TaskChart[] = generateTaskChartData();
export const tasksHistory: TaskHistory[] = generateTaskHistoryData();
