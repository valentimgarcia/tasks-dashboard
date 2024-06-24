import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { TaskHistory, tasksHistory } from "../data/dashboard-mock";

async function getTasksHistory(): Promise<TaskHistory[]> {
  return tasksHistory;
}

export default function TaskHistoryCard() {
  const [tasksHistory, setTasksHistory] = useState<TaskHistory[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tasks = await getTasksHistory();
    setTasksHistory(tasks);
  };

  return (
    <Card className="dark:bg-gradient-to-b dark:from-[rgba(28,25,23,1)] dark:to-[rgba(28,25,23,0)]">
      <CardHeader className="space-y-0 ">
        <CardTitle className="text-base font-semibold">Tasks History</CardTitle>
        <p className="text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
          Your team managed {tasksHistory.length} tasks this week
        </p>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[350px] overflow-y-auto scrollbar-thin">
        {tasksHistory.map((taskHistory) => {
          return (
            <div className="flex items-center" key={taskHistory.taskId}>
              <Avatar className="rounded-full bg-slate-100 dark:bg-zinc-800 p-3 mr-4">
                <AvatarImage src="" />
                <AvatarFallback>{taskHistory.usernameInitials}</AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-between w-full">
                <div>
                  <p>{taskHistory.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {taskHistory.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-right">{taskHistory.taskId}</p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
