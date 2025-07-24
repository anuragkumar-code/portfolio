import { useState, useEffect } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";
import ChatInterface from "@/components/ChatInterface";
import ResumeViewer from "@/components/ResumeViewer";
import { wakeBackend } from "@/service/wakeService";

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    wakeBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background text-foreground">
      <PortfolioHeader onResumeClick={() => setIsResumeOpen(true)} />
      
      {/* Main Chat Interface */}
      <main className="pt-16 h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-8">
          <ChatInterface />
        </div>
      </main>

      {/* Resume Viewer Modal */}
      <ResumeViewer 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Index;
