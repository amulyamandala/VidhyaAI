import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Target,
  Eye,
  Download
} from "lucide-react";
import { useState } from "react";

interface Student {
  id: number;
  name: string;
  grade: number;
  overallScore: number;
  subjects: {
    mathematics: number;
    science: number;
    english: number;
    hindi: number;
  };
  weakAreas: string[];
  strengths: string[];
}

export default function ProgressTracker() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  // todo: remove mock functionality - replace with real data
  const mockStudents: Student[] = [
    {
      id: 1,
      name: "Ravi Kumar",
      grade: 4,
      overallScore: 85,
      subjects: { mathematics: 78, science: 88, english: 82, hindi: 92 },
      weakAreas: ["Fractions", "English Grammar"],
      strengths: ["Basic Arithmetic", "Hindi Literature"]
    },
    {
      id: 2,
      name: "Priya Sharma", 
      grade: 5,
      overallScore: 92,
      subjects: { mathematics: 95, science: 89, english: 90, hindi: 94 },
      weakAreas: ["Science Experiments"],
      strengths: ["Mathematics", "Language Skills"]
    },
    {
      id: 3,
      name: "Arjun Patel",
      grade: 3,
      overallScore: 65,
      subjects: { mathematics: 60, science: 72, english: 58, hindi: 70 },
      weakAreas: ["Mathematics", "English Reading"],
      strengths: ["Science Concepts", "Hindi Speaking"]
    }
  ];

  const getPerformanceBand = (score: number) => {
    if (score >= 75) return { label: "Top 75%", color: "bg-chart-2", textColor: "text-chart-2" };
    if (score >= 65) return { label: "Above 65%", color: "bg-chart-3", textColor: "text-chart-3" };
    if (score >= 55) return { label: "Above 55%", color: "bg-chart-4", textColor: "text-chart-4" };
    return { label: "Below 45%", color: "bg-destructive", textColor: "text-destructive" };
  };

  const filteredStudents = mockStudents.filter(student => {
    const gradeMatch = selectedGrade === 'all' || student.grade.toString() === selectedGrade;
    return gradeMatch;
  });

  const classStats = {
    averageScore: Math.round(filteredStudents.reduce((acc, s) => acc + s.overallScore, 0) / filteredStudents.length),
    topPerformers: filteredStudents.filter(s => s.overallScore >= 75).length,
    needsAttention: filteredStudents.filter(s => s.overallScore < 55).length,
    commonWeakAreas: ["Mathematics - Fractions", "English Grammar", "Science Experiments"]
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold" data-testid="text-progress-title">
              Student Progress Tracker
            </h1>
            <p className="text-muted-foreground">
              Monitor student performance and identify areas for improvement
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48" data-testid="select-subject-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-48" data-testid="select-grade-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="1">Grade 1</SelectItem>
            <SelectItem value="2">Grade 2</SelectItem>
            <SelectItem value="3">Grade 3</SelectItem>
            <SelectItem value="4">Grade 4</SelectItem>
            <SelectItem value="5">Grade 5</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-average-score">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                <p className="text-2xl font-bold">{classStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-top-performers">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-chart-2" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Top Performers</p>
                <p className="text-2xl font-bold">{classStats.topPerformers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-students">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-chart-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{filteredStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-needs-attention">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold">{classStats.needsAttention}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-student-performance-title">Student Performance</CardTitle>
              <CardDescription>Individual student progress and achievement bands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => {
                  const band = getPerformanceBand(student.overallScore);
                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover-elevate">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold" data-testid={`text-student-name-${student.id}`}>
                            {student.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right min-w-0">
                          <div className="flex items-center gap-2">
                            <Progress value={student.overallScore} className="w-24 h-2" />
                            <span className="text-sm font-semibold">{student.overallScore}%</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 text-xs ${band.textColor}`}
                            data-testid={`badge-performance-${student.id}`}
                          >
                            {band.label}
                          </Badge>
                        </div>

                        <Button variant="ghost" size="sm" data-testid={`button-view-details-${student.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Insights */}
        <div className="space-y-6">
          {/* Common Weak Areas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-destructive" data-testid="text-weak-areas-title">
                <AlertTriangle className="h-4 w-4" />
                Common Weak Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {classStats.commonWeakAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
                  <div className="text-sm font-medium">{area}</div>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 15) + 5} students
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3" data-testid="button-remediation">
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Remediation
              </Button>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-performance-distribution-title">
                Performance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                    <span className="text-sm">Top 75%</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {filteredStudents.filter(s => s.overallScore >= 75).length} students
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                    <span className="text-sm">65% - 74%</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {filteredStudents.filter(s => s.overallScore >= 65 && s.overallScore < 75).length} students
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                    <span className="text-sm">55% - 64%</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {filteredStudents.filter(s => s.overallScore >= 55 && s.overallScore < 65).length} students
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm">Below 45%</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {filteredStudents.filter(s => s.overallScore < 45).length} students
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-quick-actions-title">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-parent-reports">
                <Users className="h-4 w-4 mr-2" />
                Generate Parent Reports
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-remedial-plan">
                <Target className="h-4 w-4 mr-2" />
                Create Remedial Plan
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-class-analysis">
                <BarChart3 className="h-4 w-4 mr-2" />
                Detailed Class Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}