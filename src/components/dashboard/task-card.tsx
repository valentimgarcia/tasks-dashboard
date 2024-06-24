import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
  percentage: number;
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <Card className="bg-card">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{props.title}</CardTitle>
        <props.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <>
          <span className="text-2xl font-bold tracking-tight">
            {props.value}
          </span>

          <p className="text-xs text-muted-foreground">
            {props.percentage >= 15 ? (
              <span style={{ color: 'hsl(var(--primary))' }}>
                +{props.percentage}%
              </span>
            ) : (
              <span className="text-red-600">
                -{props.percentage}%
              </span>
            )}{" "}
            compared to last week
          </p>
        </>
      </CardContent>
    </Card>
  );
}
