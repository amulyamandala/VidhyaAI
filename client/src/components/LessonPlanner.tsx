import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Target,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Save,
  Brain
} from "lucide-react";
import { useForm } from "react-hook-form";

interface LessonPlan {
  id: string;
  week: string;
  subject: string;
  topic: string;
  objectives: string[];
  activities: string[];
  materials: string[];
  assessment: string;
  adaptations: string[];
  estimatedDuration: number;
  attendanceRate: number;
  masteryLevel: number;
}

interface LessonFormData {
  subject: string;
  topic: string;
  objectives: string;
  activities: string;
  materials: string;
  assessment: string;
  duration: string;
}

export default function LessonPlanner() {
  const [currentWeek, setCurrentWeek] = useState("Week 1");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<LessonFormData>({
    defaultValues: {
      subject: '',
      duration: '45'
    }
  });

  // todo: remove mock functionality - replace with real data
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([
    {
      id: "1",
      week: "Week 1",
      subject: "Mathematics",
      topic: "Basic Fractions",
      objectives: ["Understand what fractions represent", "Identify numerator and denominator", "Compare simple fractions"],
      activities: ["Fraction circles activity", "Pizza fraction exercise", "Group comparison game"],
      materials: ["Fraction manipulatives", "Chart paper", "Colored pencils"],
      assessment: "Oral questioning and hands-on demonstration",
      adaptations: ["Visual aids for struggling learners", "Advanced problems for quick learners"],
      estimatedDuration: 45,
      attendanceRate: 85,
      masteryLevel: 70
    },
    {
      id: "2", 
      week: "Week 1",
      subject: "Science",
      topic: "Plants Around Us",
      objectives: ["Identify different types of plants", "Understand plant parts", "Recognize importance of plants"],
      activities: ["Nature walk", "Leaf collection", "Plant parts labeling"],
      materials: ["Magnifying glass", "Collection bags", "Plant specimens"],
      assessment: "Drawing and labeling exercise",
      adaptations: ["Hands-on exploration for kinesthetic learners", "Detailed worksheets for advanced students"],
      estimatedDuration: 60,
      attendanceRate: 78,
      masteryLevel: 82
    }
  ]);

  const handleCreateLesson = async (data: LessonFormData) => {
    console.log('Creating lesson plan:', data); // todo: remove mock functionality
    setIsCreating(true);

    // todo: remove mock functionality - simulate AI generation
    setTimeout(() => {
      const newPlan: LessonPlan = {
        id: Date.now().toString(),
        week: currentWeek,
        subject: data.subject,
        topic: data.topic,
        objectives: data.objectives.split('\n').filter(obj => obj.trim()),
        activities: data.activities.split('\n').filter(act => act.trim()),
        materials: data.materials.split('\n').filter(mat => mat.trim()),
        assessment: data.assessment,
        adaptations: ["Differentiated instruction based on learning styles", "Additional support for struggling students"],
        estimatedDuration: parseInt(data.duration),
        attendanceRate: 80, // This would come from real attendance data
        masteryLevel: 75 // This would come from previous assessments
      };

      setLessonPlans([...lessonPlans, newPlan]);
      setIsCreating(false);
      setSelectedPlan(null);
      reset();
    }, 2000);
  };

  const getStatusIcon = (masteryLevel: number) => {
    if (masteryLevel >= 80) return <CheckCircle className="h-4 w-4 text-chart-2" />;
    if (masteryLevel >= 60) return <Clock className="h-4 w-4 text-chart-4" />;
    return <AlertCircle className="h-4 w-4 text-destructive" />;
  };

  const getStatusColor = (masteryLevel: number) => {
    if (masteryLevel >= 80) return "text-chart-2";
    if (masteryLevel >= 60) return "text-chart-4"; 
    return "text-destructive";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold" data-testid="text-lesson-planner-title">
              Adaptive Lesson Planner
            </h1>
            <p className="text-muted-foreground">
              AI-powered weekly lesson plans that adapt to class progress and attendance
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setSelectedPlan('new')}
          data-testid="button-create-lesson"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Lesson Plan
        </Button>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-4">
        <Label htmlFor="week-select">Planning Period:</Label>
        <Select value={currentWeek} onValueChange={setCurrentWeek}>
          <SelectTrigger className="w-48" data-testid="select-week">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Week 1">Week 1</SelectItem>
            <SelectItem value="Week 2">Week 2</SelectItem>
            <SelectItem value="Week 3">Week 3</SelectItem>
            <SelectItem value="Week 4">Week 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lesson Plans List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-lesson-plans-title">
                Lesson Plans - {currentWeek}
              </CardTitle>
              <CardDescription>
                Adaptive plans based on class progress and attendance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessonPlans
                  .filter(plan => plan.week === currentWeek)
                  .map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`p-4 border rounded-lg hover-elevate cursor-pointer transition-colors ${
                        selectedPlan === plan.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                      data-testid={`card-lesson-${plan.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{plan.subject}</h3>
                            <Badge variant="outline">{plan.topic}</Badge>
                            {getStatusIcon(plan.masteryLevel)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{plan.estimatedDuration} minutes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{plan.attendanceRate}% attendance</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Mastery Level:</span>
                                <span className={`font-semibold ${getStatusColor(plan.masteryLevel)}`}>
                                  {plan.masteryLevel}%
                                </span>
                              </div>
                              <Progress value={plan.masteryLevel} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Edit lesson:', plan.id); // todo: implement edit
                          }}
                          data-testid={`button-edit-${plan.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                
                {lessonPlans.filter(plan => plan.week === currentWeek).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No lesson plans for {currentWeek} yet</p>
                    <p className="text-sm">Create your first adaptive lesson plan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Details/Create */}
        <div className="space-y-6">
          {/* Create/Edit Form */}
          {selectedPlan === 'new' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-create-lesson-title">
                  <Brain className="h-5 w-5" />
                  Create Lesson Plan
                </CardTitle>
                <CardDescription>AI will adapt content based on class data</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(handleCreateLesson)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={watch('subject')} 
                      onValueChange={(value) => setValue('subject', value)}
                    >
                      <SelectTrigger data-testid="select-lesson-subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="social-studies">Social Studies</SelectItem>
                        <SelectItem value="environmental-science">Environmental Science</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-sm text-destructive">Subject is required</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic/Chapter</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Multiplication tables, Photosynthesis"
                      data-testid="input-lesson-topic"
                      {...register("topic", { required: "Topic is required" })}
                    />
                    {errors.topic && (
                      <p className="text-sm text-destructive">{errors.topic.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objectives">Learning Objectives (one per line)</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Students will be able to...&#10;Understand the concept of...&#10;Apply knowledge to..."
                      rows={3}
                      data-testid="input-lesson-objectives"
                      {...register("objectives", { required: "Objectives are required" })}
                    />
                    {errors.objectives && (
                      <p className="text-sm text-destructive">{errors.objectives.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activities">Activities (one per line)</Label>
                    <Textarea
                      id="activities"
                      placeholder="Group discussion&#10;Hands-on experiment&#10;Interactive game"
                      rows={3}
                      data-testid="input-lesson-activities"
                      {...register("activities", { required: "Activities are required" })}
                    />
                    {errors.activities && (
                      <p className="text-sm text-destructive">{errors.activities.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="materials">Materials Needed (one per line)</Label>
                    <Textarea
                      id="materials"
                      placeholder="Textbook&#10;Chart paper&#10;Colored pencils"
                      rows={2}
                      data-testid="input-lesson-materials"
                      {...register("materials")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessment">Assessment Method</Label>
                    <Textarea
                      id="assessment"
                      placeholder="How will you evaluate student understanding?"
                      rows={2}
                      data-testid="input-lesson-assessment"
                      {...register("assessment", { required: "Assessment method is required" })}
                    />
                    {errors.assessment && (
                      <p className="text-sm text-destructive">{errors.assessment.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      max="120"
                      data-testid="input-lesson-duration"
                      {...register("duration", { required: "Duration is required" })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isCreating}
                      data-testid="button-save-lesson"
                    >
                      {isCreating ? (
                        <>
                          <Brain className="mr-2 h-4 w-4 animate-pulse" />
                          AI Generating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Plan
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setSelectedPlan(null)}
                      data-testid="button-cancel-lesson"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Selected Plan Details */}
          {selectedPlan && selectedPlan !== 'new' && (
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-lesson-details-title">Lesson Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const plan = lessonPlans.find(p => p.id === selectedPlan);
                  if (!plan) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {plan.subject}: {plan.topic}
                          {getStatusIcon(plan.masteryLevel)}
                        </h3>
                        <p className="text-sm text-muted-foreground">Duration: {plan.estimatedDuration} minutes</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Learning Objectives:</h4>
                        <ul className="text-sm space-y-1">
                          {plan.objectives.map((obj, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Activities:</h4>
                        <ul className="text-sm space-y-1">
                          {plan.activities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <BookOpen className="h-3 w-3 mt-1 text-chart-2 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Materials:</h4>
                        <ul className="text-sm space-y-1">
                          {plan.materials.map((material, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              {material}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Assessment:</h4>
                        <p className="text-sm">{plan.assessment}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Adaptive Elements:</h4>
                        <ul className="text-sm space-y-1">
                          {plan.adaptations.map((adaptation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Brain className="h-3 w-3 mt-1 text-chart-3 flex-shrink-0" />
                              {adaptation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2" data-testid="text-ai-insights-title">
                <Brain className="h-4 w-4" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-chart-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">High Engagement Topics</p>
                    <p className="text-xs text-muted-foreground">Science experiments and hands-on activities show 90%+ engagement</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-destructive/5 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Attention Needed</p>
                    <p className="text-xs text-muted-foreground">Mathematics concepts need more visual aids and practice time</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-chart-4/5 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-chart-4 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Timing Suggestion</p>
                    <p className="text-xs text-muted-foreground">Consider shorter activity blocks (15-20 min) for better focus</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}