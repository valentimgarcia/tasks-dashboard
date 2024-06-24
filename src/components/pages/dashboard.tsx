import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import UserDropdown from "../navbar/user-dropdown";
import {
  CircleCheck,
  ClipboardList,
  MoveUp,
  AlarmClock,
  PlusCircle,
} from "lucide-react";
import TaskCard from "../dashboard/task-card";
import TaskHistory from "../dashboard/task-history-card";
import TaskChartCard from "../dashboard/task-chart-card";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleTasks = () => {
    navigate("/");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between md:items-center">
        <div className="mr-2">
          <p className="text-2xl font-semibold">Dashboard</p>
          <p className="text-muted-foreground">
            Have a look into this week data!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center">
          <Button
            variant={"outline"}
            className="w-full md:w-auto md:mr-6 mr-0 md:mb-0 mb-4"
            onClick={handleTasks}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Tasks
          </Button>

          <UserDropdown />
        </div>
      </div>
      <div className="mx-auto pt-6">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 my-5">
          <TaskCard
            title="Tasks done"
            icon={CircleCheck}
            value={11}
            percentage={16}
          />
          <TaskCard
            title="Tasks in progress"
            icon={AlarmClock}
            value={4}
            percentage={9}
          />
          <TaskCard
            title="Tasks with high priority"
            icon={MoveUp}
            value={9}
            percentage={21}
          />
          <TaskCard
            title="Tasks created"
            icon={PlusCircle}
            value={7}
            percentage={14}
          />
        </div>

        <div className="grid lg:grid-cols-10 md:grid-cols-7 gap-4">
          <div className="lg:col-span-6 md:col-span-4">
            <TaskChartCard />
          </div>
          <div className="lg:col-span-4 md:col-span-3">
            <TaskHistory />
          </div>
        </div>
      </div>
    </div>
  );
}