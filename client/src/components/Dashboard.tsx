import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface DashboardProps {
  onWorksheetGenerator?: () => void;
  onLessonPlanner?: () => void;
  onProgressTracker?: () => void;
  onAutoCorrection?: () => void;
}

export default function Dashboard({ 
  onWorksheetGenerator = () => console.log('Worksheet Generator clicked'), // todo: remove mock functionality
  onLessonPlanner = () => console.log('Lesson Planner clicked'), // todo: remove mock functionality
  onProgressTracker = () => console.log('Progress Tracker clicked'), // todo: remove mock functionality
  onAutoCorrection = () => console.log('Auto Correction clicked') // todo: remove mock functionality
}: DashboardProps) {
  // todo: remove mock functionality - replace with real data
  const mockStats = {
    totalStudents: 45,
    activeWorksheets: 8,
    completionRate: 78,
    weakTopics: ['Mathematics - Fractions', 'Science - Photosynthesis']
  };

  const mockRecentActivity = [
    { id: 1, type: 'worksheet', title: 'Mathematics - Basic Addition', status: 'completed', students: 23 },
    { id: 2, type: 'lesson', title: 'English - Story Reading', status: 'in-progress', students: 18 },
    { id: 3, type: 'assessment', title: 'Science Quiz - Plants', status: 'pending', students: 0 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground" data-testid="text-dashboard-title">
            Welcome back, Teacher
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your classroom today
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20" data-testid="badge-online-status">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Online
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-stat-students">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{mockStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stat-worksheets">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-chart-2" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Worksheets</p>
                <p className="text-2xl font-bold">{mockStats.activeWorksheets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stat-completion">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-chart-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-stat-alerts">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Weak Topics</p>
                <p className="text-2xl font-bold">{mockStats.weakTopics.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-quick-actions-title">
                <BookOpen className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Generate content and manage your classroom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={onWorksheetGenerator}
                  className="h-24 flex-col gap-2 text-left justify-start"
                  variant="outline"
                  data-testid="button-worksheet-generator"
                >
                  <FileText className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Worksheet Generator</div>
                    <div className="text-xs text-muted-foreground">Create multi-grade worksheets</div>
                  </div>
                </Button>

                <Button 
                  onClick={onLessonPlanner}
                  className="h-24 flex-col gap-2 text-left justify-start"
                  variant="outline"
                  data-testid="button-lesson-planner"
                >
                  <Calendar className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Lesson Planner</div>
                    <div className="text-xs text-muted-foreground">Plan adaptive weekly lessons</div>
                  </div>
                </Button>

                <Button 
                  onClick={onProgressTracker}
                  className="h-24 flex-col gap-2 text-left justify-start"
                  variant="outline"
                  data-testid="button-progress-tracker"
                >
                  <BarChart3 className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Progress Tracker</div>
                    <div className="text-xs text-muted-foreground">View student analytics</div>
                  </div>
                </Button>

                <Button 
                  onClick={onAutoCorrection}
                  className="h-24 flex-col gap-2 text-left justify-start"
                  variant="outline"
                  data-testid="button-auto-correction"
                >
                  <CheckCircle className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Auto Correction</div>
                    <div className="text-xs text-muted-foreground">OCR-based grading</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Weak Topics Alert */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-destructive" data-testid="text-weak-topics-title">
                <AlertCircle className="h-4 w-4" />
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockStats.weakTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                  <div className="text-sm font-medium">{topic}</div>
                  <Badge variant="outline" className="text-xs">Review</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-recent-activity-title">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' && <CheckCircle className="h-5 w-5 text-chart-2" />}
                    {activity.status === 'in-progress' && <Clock className="h-5 w-5 text-chart-3" />}
                    {activity.status === 'pending' && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.students > 0 ? `${activity.students} students` : 'Not started'}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Class Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-class-progress-title">Class Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Completion</span>
                    <span>{mockStats.completionRate}%</span>
                  </div>
                  <Progress value={mockStats.completionRate} className="h-2" />
                </div>
                <div className="text-xs text-muted-foreground">
                  Great progress! Students are actively engaged with the material.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}