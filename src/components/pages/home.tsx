import Page from "../data-table/page";
import { LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../navbar/user-dropdown";
import { Button } from "../ui/button";

export default function Home() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between md:items-center">
        <div className="mr-2">
          <p className="text-2xl font-semibold">Welcome back John Doe</p>
          <p className="text-muted-foreground">Here's a list of your taks!</p>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center">
          <Button
            variant={"outline"}
            className="w-full md:w-auto md:mr-6 mr-0 md:mb-0 mb-4"
            onClick={handleDashboard}
          >
            <LineChart className="h-4 w-4 mr-2" />
            Dashboard
          </Button>

          <UserDropdown />
        </div>
      </div>
      <div>
        <Page></Page>
      </div>
    </div>
  );
}
