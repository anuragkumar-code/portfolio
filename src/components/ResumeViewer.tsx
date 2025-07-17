import { useState } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeViewer = ({ isOpen, onClose }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Replace with your actual resume PDF URL
  const resumeUrl = "/path-to-your-resume.pdf";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Your_Name_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalView = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Resume</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={handleExternalView}
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-secondary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative bg-muted/20">
          {/* PDF Viewer */}
          <div className="w-full h-full">
            {/* Placeholder for PDF viewer - replace with actual PDF viewer implementation */}
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-primary/20 flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Preview</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Your resume PDF will be displayed here. You can download it or open it in a new tab for better viewing.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button onClick={handleExternalView} variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View in Browser
                </Button>
              </div>
            </div>
            
            {/* Uncomment and configure when you have a PDF viewer library */}
            {/* 
            <iframe
              src={resumeUrl}
              className="w-full h-full border-0"
              title="Resume PDF"
              onLoad={() => setIsLoading(false)}
            />
            */}
          </div>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Loading resume...</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;