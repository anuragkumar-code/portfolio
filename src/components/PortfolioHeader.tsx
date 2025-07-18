import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PortfolioHeaderProps {
  onResumeClick: () => void;
}

const PortfolioHeader = ({ onResumeClick }: PortfolioHeaderProps) => {
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/_anuragkumar",
      label: "Twitter",
      color: "hover:text-blue-400"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/anurag-kumar-03473a1a3",
      label: "LinkedIn", 
      color: "hover:text-blue-600"
    },
    {
      icon: Github,
      href: "https://github.com/anuragkumar-code", 
      label: "GitHub",
      color: "hover:text-purple-400"
    },
    {
      icon: Mail,
      href: "mailto:kumar.mairwa@gmail.com", 
      label: "Email",
      color: "hover:text-green-400"
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary animate-glow-pulse"></div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Jarwis
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-card hover:bg-secondary transition-all duration-300 ${social.color} group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <Button
              onClick={onResumeClick}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PortfolioHeader;