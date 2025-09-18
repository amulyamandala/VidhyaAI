import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Plus, 
  Edit, 
  Search,
  Settings,
  Download,
  Upload,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useForm } from "react-hook-form";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  grade: number;
  dateOfBirth: string;
  parentContact: string;
  subjects: {
    [key: string]: {
      marksSecured: number;
      totalMarks: number;
      percentage: number;
      grade: string;
    };
  };
  overallPercentage: number;
  overallGrade: string;
  attendance: number;
  lastUpdated: string;
}

interface GradingCriteria {
  name: string;
  ranges: Array<{
    min: number;
    max: number;
    grade: string;
    color: string;
  }>;
}

interface StudentFormData {
  name: string;
  rollNo: string;
  grade: string;
  dateOfBirth: string;
  parentContact: string;
}

export default function StudentDatabase() {
  const [students, setStudents] = useState<Student[]>([
    // todo: remove mock functionality - replace with real data
    {
      id: "1",
      name: "Ravi Kumar",
      rollNo: "2024001",
      grade: 4,
      dateOfBirth: "2015-03-15",
      parentContact: "9876543210",
      subjects: {
        mathematics: { marksSecured: 78, totalMarks: 100, percentage: 78, grade: "B+" },
        science: { marksSecured: 85, totalMarks: 100, percentage: 85, grade: "A" },
        english: { marksSecured: 72, totalMarks: 100, percentage: 72, grade: "B" },
        hindi: { marksSecured: 88, totalMarks: 100, percentage: 88, grade: "A" }
      },
      overallPercentage: 81,
      overallGrade: "A",
      attendance: 92,
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      name: "Priya Sharma",
      rollNo: "2024002", 
      grade: 5,
      dateOfBirth: "2014-07-22",
      parentContact: "9876543211",
      subjects: {
        mathematics: { marksSecured: 92, totalMarks: 100, percentage: 92, grade: "A+" },
        science: { marksSecured: 89, totalMarks: 100, percentage: 89, grade: "A" },
        english: { marksSecured: 94, totalMarks: 100, percentage: 94, grade: "A+" },
        hindi: { marksSecured: 87, totalMarks: 100, percentage: 87, grade: "A" }
      },
      overallPercentage: 91,
      overallGrade: "A+",
      attendance: 98,
      lastUpdated: "2024-01-15"
    },
    {
      id: "3",
      name: "Arjun Patel",
      rollNo: "2024003",
      grade: 3,
      dateOfBirth: "2016-11-08",
      parentContact: "9876543212",
      subjects: {
        mathematics: { marksSecured: 58, totalMarks: 100, percentage: 58, grade: "C" },
        science: { marksSecured: 65, totalMarks: 100, percentage: 65, grade: "B-" },
        english: { marksSecured: 52, totalMarks: 100, percentage: 52, grade: "D+" },
        hindi: { marksSecured: 68, totalMarks: 100, percentage: 68, grade: "B-" }
      },
      overallPercentage: 61,
      overallGrade: "C+",
      attendance: 78,
      lastUpdated: "2024-01-15"
    }
  ]);

  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria>({
    name: "Standard Grading",
    ranges: [
      { min: 90, max: 100, grade: "A+", color: "bg-chart-2" },
      { min: 80, max: 89, grade: "A", color: "bg-chart-3" },
      { min: 70, max: 79, grade: "B+", color: "bg-chart-4" },
      { min: 60, max: 69, grade: "B", color: "bg-primary" },
      { min: 50, max: 59, grade: "C+", color: "bg-chart-1" },
      { min: 40, max: 49, grade: "C", color: "bg-muted" },
      { min: 0, max: 39, grade: "F", color: "bg-destructive" }
    ]
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isEditingCriteria, setIsEditingCriteria] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormData>();

  const getGradeFromPercentage = (percentage: number): { grade: string; color: string } => {
    const range = gradingCriteria.ranges.find(r => percentage >= r.min && percentage <= r.max);
    return range ? { grade: range.grade, color: range.color } : { grade: "F", color: "bg-destructive" };
  };

  const calculateOverallGrade = (subjects: Student['subjects']): { percentage: number; grade: string } => {
    const totalMarks = Object.values(subjects).reduce((acc, subject) => acc + subject.totalMarks, 0);
    const marksSecured = Object.values(subjects).reduce((acc, subject) => acc + subject.marksSecured, 0);
    const percentage = Math.round((marksSecured / totalMarks) * 100);
    const { grade } = getGradeFromPercentage(percentage);
    return { percentage, grade };
  };

  const filteredStudents = students.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const gradeMatch = selectedGrade === "all" || student.grade.toString() === selectedGrade;
    return nameMatch && gradeMatch;
  });

  const handleAddStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: data.name,
      rollNo: data.rollNo,
      grade: parseInt(data.grade),
      dateOfBirth: data.dateOfBirth,
      parentContact: data.parentContact,
      subjects: {
        mathematics: { marksSecured: 0, totalMarks: 100, percentage: 0, grade: "N/A" },
        science: { marksSecured: 0, totalMarks: 100, percentage: 0, grade: "N/A" },
        english: { marksSecured: 0, totalMarks: 100, percentage: 0, grade: "N/A" },
        hindi: { marksSecured: 0, totalMarks: 100, percentage: 0, grade: "N/A" }
      },
      overallPercentage: 0,
      overallGrade: "N/A",
      attendance: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setStudents([...students, newStudent]);
    setIsAddingStudent(false);
    reset();
    console.log('Added new student:', newStudent); // todo: remove mock functionality
  };

  const updateStudentMarks = (studentId: string, subject: string, marksSecured: number, totalMarks: number) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const percentage = Math.round((marksSecured / totalMarks) * 100);
        const { grade } = getGradeFromPercentage(percentage);
        
        const updatedSubjects = {
          ...student.subjects,
          [subject]: { marksSecured, totalMarks, percentage, grade }
        };

        const overall = calculateOverallGrade(updatedSubjects);

        return {
          ...student,
          subjects: updatedSubjects,
          overallPercentage: overall.percentage,
          overallGrade: overall.grade,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return student;
    }));
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 80) return <Award className="h-4 w-4 text-chart-2" />;
    if (percentage >= 60) return <CheckCircle className="h-4 w-4 text-chart-3" />;
    return <AlertCircle className="h-4 w-4 text-destructive" />;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold" data-testid="text-student-database-title">
              Student Database
            </h1>
            <p className="text-muted-foreground">
              Comprehensive student records with customizable grading criteria
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Dialog open={isEditingCriteria} onOpenChange={setIsEditingCriteria}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-grading-settings">
                <Settings className="h-4 w-4 mr-2" />
                Grading Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Customize Grading Criteria</DialogTitle>
                <DialogDescription>
                  Set your own percentage ranges and grades to match your teaching standards
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  {gradingCriteria.ranges.map((range, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 items-center p-3 border rounded-lg">
                      <Input 
                        type="number" 
                        value={range.min} 
                        onChange={(e) => {
                          const newRanges = [...gradingCriteria.ranges];
                          newRanges[index].min = parseInt(e.target.value);
                          setGradingCriteria({...gradingCriteria, ranges: newRanges});
                        }}
                        className="text-sm"
                        placeholder="Min %"
                      />
                      <Input 
                        type="number" 
                        value={range.max}
                        onChange={(e) => {
                          const newRanges = [...gradingCriteria.ranges];
                          newRanges[index].max = parseInt(e.target.value);
                          setGradingCriteria({...gradingCriteria, ranges: newRanges});
                        }}
                        className="text-sm"
                        placeholder="Max %"
                      />
                      <Input 
                        value={range.grade}
                        onChange={(e) => {
                          const newRanges = [...gradingCriteria.ranges];
                          newRanges[index].grade = e.target.value;
                          setGradingCriteria({...gradingCriteria, ranges: newRanges});
                        }}
                        className="text-sm"
                        placeholder="Grade"
                      />
                      <div className={`w-6 h-6 rounded ${range.color}`}></div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const newRanges = gradingCriteria.ranges.filter((_, i) => i !== index);
                          setGradingCriteria({...gradingCriteria, ranges: newRanges});
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    const newRange = { min: 0, max: 0, grade: "", color: "bg-muted" };
                    setGradingCriteria({...gradingCriteria, ranges: [...gradingCriteria.ranges, newRange]});
                  }}>
                    Add Range
                  </Button>
                  <Button onClick={() => setIsEditingCriteria(false)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-student">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>Enter student details to add to the database</DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(handleAddStudent)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter student's full name"
                    data-testid="input-student-name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      placeholder="e.g., 2024001"
                      data-testid="input-roll-no"
                      {...register("rollNo", { required: "Roll number is required" })}
                    />
                    {errors.rollNo && <p className="text-sm text-destructive">{errors.rollNo.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/Class</Label>
                    <Select onValueChange={(value) => register("grade", { value })}>
                      <SelectTrigger data-testid="select-student-grade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8].map(grade => (
                          <SelectItem key={grade} value={grade.toString()}>Class {grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    data-testid="input-date-birth"
                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                  />
                  {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentContact">Parent/Guardian Contact</Label>
                  <Input
                    id="parentContact"
                    placeholder="Phone number"
                    data-testid="input-parent-contact"
                    {...register("parentContact", { required: "Contact is required" })}
                  />
                  {errors.parentContact && <p className="text-sm text-destructive">{errors.parentContact.message}</p>}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Add Student</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddingStudent(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-students"
          />
        </div>

        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-48" data-testid="select-filter-grade">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {[1,2,3,4,5,6,7,8].map(grade => (
              <SelectItem key={grade} value={grade.toString()}>Class {grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" data-testid="button-export-data">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <Button variant="outline" size="sm" data-testid="button-import-data">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-students-list-title">
                Students ({filteredStudents.length})
              </CardTitle>
              <CardDescription>
                Complete student records with performance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 border rounded-lg hover-elevate cursor-pointer transition-colors ${
                      selectedStudent === student.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                    data-testid={`card-student-${student.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <Badge variant="outline">Roll: {student.rollNo}</Badge>
                          <Badge variant="secondary">Class {student.grade}</Badge>
                          {getPerformanceIcon(student.overallPercentage)}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Overall:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-semibold">{student.overallPercentage}%</span>
                              <Badge className={getGradeFromPercentage(student.overallPercentage).color}>
                                {student.overallGrade}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Attendance:</span>
                            <div className="mt-1">
                              <span className="font-semibold">{student.attendance}%</span>
                              <Progress value={student.attendance} className="h-1 mt-1" />
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Contact:</span>
                            <p className="font-semibold mt-1">{student.parentContact}</p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit student:', student.id); // todo: implement edit
                        }}
                        data-testid={`button-edit-student-${student.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No students found matching your search</p>
                    <p className="text-sm">Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Student Details */}
        <div className="space-y-6">
          {/* Selected Student Details */}
          {selectedStudent && (
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-student-details-title">Student Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const student = students.find(s => s.id === selectedStudent);
                  if (!student) return null;

                  return (
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Roll: {student.rollNo} | Class {student.grade}
                        </p>
                      </div>

                      {/* Overall Performance */}
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold mb-1">{student.overallPercentage}%</div>
                        <Badge className={`${getGradeFromPercentage(student.overallPercentage).color} mb-2`}>
                          Grade {student.overallGrade}
                        </Badge>
                        <Progress value={student.overallPercentage} className="mt-2" />
                      </div>

                      {/* Subject-wise Performance */}
                      <div>
                        <h4 className="font-semibold mb-3">Subject Performance:</h4>
                        <div className="space-y-3">
                          {Object.entries(student.subjects).map(([subject, performance]) => (
                            <div key={subject} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm capitalize font-medium">{subject}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold">
                                    {performance.marksSecured}/{performance.totalMarks}
                                  </span>
                                  <Badge className={getGradeFromPercentage(performance.percentage).color}>
                                    {performance.grade}
                                  </Badge>
                                </div>
                              </div>

                              {/* Editable marks input */}
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  type="number"
                                  placeholder="Marks secured"
                                  value={performance.marksSecured || ''}
                                  onChange={(e) => updateStudentMarks(
                                    student.id, 
                                    subject, 
                                    parseInt(e.target.value) || 0, 
                                    performance.totalMarks
                                  )}
                                  className="text-sm"
                                  data-testid={`input-marks-${subject}-${student.id}`}
                                />
                                <Input
                                  type="number"
                                  placeholder="Total marks"
                                  value={performance.totalMarks || ''}
                                  onChange={(e) => updateStudentMarks(
                                    student.id, 
                                    subject, 
                                    performance.marksSecured, 
                                    parseInt(e.target.value) || 100
                                  )}
                                  className="text-sm"
                                  data-testid={`input-total-${subject}-${student.id}`}
                                />
                              </div>

                              <Progress value={performance.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">Contact Information:</h4>
                        <p className="text-sm"><strong>Parent/Guardian:</strong> {student.parentContact}</p>
                        <p className="text-sm"><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
                        <p className="text-sm"><strong>Last Updated:</strong> {student.lastUpdated}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Class Statistics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-class-stats-title">Class Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Students:</span>
                <Badge variant="secondary">{students.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Class Average:</span>
                <Badge variant="outline">
                  {Math.round(students.reduce((acc, s) => acc + s.overallPercentage, 0) / students.length)}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Top Performers (80%+):</span>
                <Badge variant="outline">
                  {students.filter(s => s.overallPercentage >= 80).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Need Support (&lt; 60%):</span>
                <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                  {students.filter(s => s.overallPercentage < 60).length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Current Grading Scale */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-grading-scale-title">Current Grading Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {gradingCriteria.ranges.map((range, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${range.color}`}></div>
                    <span>{range.min}-{range.max}%</span>
                  </div>
                  <Badge variant="outline">{range.grade}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}