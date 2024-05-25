import { useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";

async function getTasks(): Promise<Task[]> {
  return [
    {
      id: "75484",
      type: "Feature",
      title: "Create a new sort system in header component",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "38291",
      type: "Bug",
      title: "Error adding new customer into database",
      status: "Todo",
      priority: "High",
    },
    {
      id: "57294",
      type: "Documentation",
      title: "History app study",
      status: "Done",
      priority: "Low",
    },
    {
      id: "95027",
      type: "Improvement",
      title:
        "Adding new customer should be able to accept more than one at the same time",
      status: "Testing",
      priority: "Medium",
    },
    {
      id: "29384",
      type: "Bug",
      title: "Fix alignment issue on dashboard",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "98421",
      type: "Feature",
      title: "Integrate third-party payment gateway",
      status: "Todo",
      priority: "High",
    },
    {
      id: "12837",
      type: "Feature",
      title: "Implement dark mode in user settings",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "38472",
      type: "Documentation",
      title: "Update API usage guidelines",
      status: "Todo",
      priority: "Low",
    },
    {
      id: "47562",
      type: "Improvement",
      title: "Optimize database queries for reporting",
      status: "Done",
      priority: "Medium",
    },
    {
      id: "24397",
      type: "Documentation",
      title: "Update installation guide",
      status: "Done",
      priority: "Low",
    },
    {
      id: "58291",
      type: "Feature",
      title: "Add multi-language support",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "69374",
      type: "Bug",
      title: "Resolve memory leak in analytics service",
      status: "Backlog",
      priority: "High",
    },
    {
      id: "78461",
      type: "Documentation",
      title: "Document new authentication flow",
      status: "Done",
      priority: "Low",
    },
    {
      id: "87534",
      type: "Improvement",
      title: "Refactor codebase to use TypeScript",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "10983",
      type: "Bug",
      title: "Fix crash on login with invalid credentials",
      status: "Testing",
      priority: "High",
    },
    {
      id: "12094",
      type: "Documentation",
      title: "Write setup guide for new developers",
      status: "In Progress",
      priority: "Low",
    },
    {
      id: "23891",
      type: "Improvement",
      title: "Enhance security for API endpoints",
      status: "Todo",
      priority: "Medium",
    },
    {
      id: "34982",
      type: "Feature",
      title: "Develop mobile app for iOS and Android",
      status: "Backlog",
      priority: "High",
    },
    {
      id: "45027",
      type: "Bug",
      title: "Fix issue with email notifications not sending",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "56293",
      type: "Documentation",
      title: "Update user manual with new features",
      status: "Todo",
      priority: "Low",
    },
    {
      id: "67481",
      type: "Improvement",
      title: "Improve load times on homepage",
      status: "Done",
      priority: "Medium",
    },
    {
      id: "78234",
      type: "Feature",
      title: "Add support for exporting data to CSV",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "89412",
      type: "Bug",
      title: "Resolve issue with user profile images not loading",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "90134",
      type: "Documentation",
      title: "Document backup and restore procedures",
      status: "Done",
      priority: "Low",
    },
    {
      id: "10385",
      type: "Improvement",
      title: "Migrate legacy code to modern framework",
      status: "Testing",
      priority: "Medium",
    },
    {
      id: "11594",
      type: "Feature",
      title: "Implement advanced search functionality",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "12983",
      type: "Bug",
      title: "Fix pagination issue on user list",
      status: "Todo",
      priority: "High",
    },
    {
      id: "14382",
      type: "Documentation",
      title: "Create API reference documentation",
      status: "Done",
      priority: "Low",
    },
    {
      id: "15721",
      type: "Improvement",
      title: "Enhance user activity logging",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "16984",
      type: "Feature",
      title: "Add real-time notifications",
      status: "Backlog",
      priority: "High",
    },
    {
      id: "18093",
      type: "Bug",
      title: "Fix intermittent logout issue",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "19273",
      type: "Documentation",
      title: "Document database schema",
      status: "Todo",
      priority: "Low",
    },
    {
      id: "20462",
      type: "Improvement",
      title: "Improve search algorithm accuracy",
      status: "Done",
      priority: "Medium",
    },
    {
      id: "21841",
      type: "Feature",
      title: "Implement user role management",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "25734",
      type: "Improvement",
      title: "Refactor authentication module",
      status: "Testing",
      priority: "Medium",
    },
    {
      id: "26982",
      type: "Feature",
      title: "Add user feedback system",
      status: "Todo",
      priority: "High",
    },
  ];
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="mx-auto py-8">
      <DataTable columns={columns(deleteTask)} data={tasks} />
    </div>
  );
}
