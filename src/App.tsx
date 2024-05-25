import { ThemeProvider } from "@/components/theme-provider"
import Main from "./components/main";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Main />
        <Toaster />
      </ThemeProvider>
    </>
  );
}
