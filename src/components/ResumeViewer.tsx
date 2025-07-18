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
  const resumeUrl = "/anurag.pdf";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'anurag_kumar.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalView = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-card border-border flex flex-col">
        <DialogHeader className="p-4 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Resume</DialogTitle>
            <div className="flex items-center gap-2 pr-12">
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
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 relative bg-muted/20 flex">
          {/* PDF Viewer */}
          <div className="w-full h-full flex-1">
            <iframe
              src={resumeUrl}
              className="w-full h-full flex-1 border-0"
              title="Resume PDF"
              onLoad={() => setIsLoading(false)}
            />
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