import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import HRChatbot from "./components/HRChatbot";
import Sidebar, { type ModuleId } from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Analytics from "./components/modules/Analytics";
import Dashboard from "./components/modules/Dashboard";
import Learning from "./components/modules/Learning";
import Onboarding from "./components/modules/Onboarding";
import Performance from "./components/modules/Performance";
import Recognition from "./components/modules/Recognition";
import Recruitment from "./components/modules/Recruitment";

const moduleComponents: Record<ModuleId, React.ReactNode> = {
  dashboard: <Dashboard />,
  recruitment: <Recruitment />,
  onboarding: <Onboarding />,
  performance: <Performance />,
  learning: <Learning />,
  recognition: <Recognition />,
  analytics: <Analytics />,
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>("dashboard");

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar activeModule={activeModule} />

        {/* Module Content */}
        <main className="flex-1 overflow-y-auto">
          {moduleComponents[activeModule]}
        </main>
      </div>

      {/* AI Chatbot */}
      <HRChatbot />
    </div>
  );
}
