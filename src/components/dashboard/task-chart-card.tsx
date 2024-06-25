import { tasksChart } from "../data/dashboard-mock";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface TaskChartCardProps {
  totalTasks: number;
}

export default function TaskChartCard({ totalTasks }: TaskChartCardProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Card className="dark:bg-gradient-to-b dark:from-[rgba(28,25,23,1)] dark:to-[rgba(28,25,23,0)]">
      <CardHeader className="space-y-0 ">
        <CardTitle className="text-base font-semibold">Tasks Created</CardTitle>
        <p className="text-muted-foreground">
          Your team created {totalTasks} tasks this week in {currentYear}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[350px] overflow-y-auto">
        <ResponsiveContainer width="100%" height={326}>
          <LineChart
            data={tasksChart}
            style={{ fontSize: 13 }}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid className="stroke-muted" />

            <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
            <YAxis axisLine={false} tickLine={false} />

            <Line
              type="monotone"
              dataKey="amt"
              stroke="hsl(var(--primary))"
              animationBegin={750}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
