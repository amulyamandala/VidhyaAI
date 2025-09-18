import { useState } from "react";
import LandingPage from "./LandingPage";
import AuthenticationCard from "./AuthenticationCard";
import Header from "./Header";
import Dashboard from "./Dashboard";
import WorksheetGenerator from "./WorksheetGenerator";
import ProgressTracker from "./ProgressTracker";
import LessonPlanner from "./LessonPlanner";
import AutoCorrection from "./AutoCorrection";
import StudentDatabase from "./StudentDatabase";

type AppState = 'landing' | 'auth' | 'dashboard' | 'worksheet-generator' | 'progress-tracker' | 'lesson-planner' | 'auto-correction' | 'student-database';

interface User {
  name: string;
  email: string;
  securityPasswordSet: boolean;
}

export default function MainApp() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    console.log('Get started clicked'); // todo: remove mock functionality
    setCurrentView('auth');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    console.log('Google login initiated'); // todo: remove mock functionality
    
    // todo: remove mock functionality - simulate OAuth
    setTimeout(() => {
      setUser({
        name: 'Priya Sharma',
        email: 'priya.sharma@school.edu',
        securityPasswordSet: false
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSecurityPasswordSet = (password: string) => {
    console.log('Security password set:', password); // todo: remove mock functionality
    
    if (user) {
      setUser({ ...user, securityPasswordSet: true });
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked'); // todo: remove mock functionality
    setUser(null);
    setCurrentView('landing');
  };

  const handleNavigation = (view: AppState) => {
    console.log('Navigation:', view); // todo: remove mock functionality
    setCurrentView(view);
  };

  // Landing page - show VidyaAI branding first
  if (currentView === 'landing') {
    return (
      <LandingPage 
        onGetStarted={handleGetStarted}
      />
    );
  }

  // Authentication flow
  if (currentView === 'auth' || (user && !user.securityPasswordSet)) {
    return (
      <AuthenticationCard
        onGoogleLogin={handleGoogleLogin}
        onSecurityPasswordSet={handleSecurityPasswordSet}
        isLoading={isLoading}
      />
    );
  }

  // Main application with header
  if (user && user.securityPasswordSet) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          userName={user.name}
          userEmail={user.email}
          onLogout={handleLogout}
          onSettingsClick={() => console.log('Settings clicked')}
        />
        
        <main className="min-h-[calc(100vh-4rem)]">
          {currentView === 'dashboard' && (
            <Dashboard
              onWorksheetGenerator={() => handleNavigation('worksheet-generator')}
              onProgressTracker={() => handleNavigation('progress-tracker')}
              onLessonPlanner={() => handleNavigation('lesson-planner')}
              onAutoCorrection={() => handleNavigation('auto-correction')}
              onStudentDatabase={() => handleNavigation('student-database')}
            />
          )}
          
          {currentView === 'worksheet-generator' && (
            <div>
              <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-2">
                  <button 
                    onClick={() => handleNavigation('dashboard')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <WorksheetGenerator />
            </div>
          )}
          
          {currentView === 'progress-tracker' && (
            <div>
              <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-2">
                  <button 
                    onClick={() => handleNavigation('dashboard')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <ProgressTracker />
            </div>
          )}

          {currentView === 'lesson-planner' && (
            <div>
              <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-2">
                  <button 
                    onClick={() => handleNavigation('dashboard')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <LessonPlanner />
            </div>
          )}

          {currentView === 'auto-correction' && (
            <div>
              <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-2">
                  <button 
                    onClick={() => handleNavigation('dashboard')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <AutoCorrection />
            </div>
          )}

          {currentView === 'student-database' && (
            <div>
              <div className="border-b bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-2">
                  <button 
                    onClick={() => handleNavigation('dashboard')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="button-back-to-dashboard"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <StudentDatabase />
            </div>
          )}
        </main>
      </div>
    );
  }

  return null;
}