import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  Eye, 
  RefreshCw, 
  BookOpen,
  Languages,
  Users,
  Brain
} from "lucide-react";
import { useForm } from "react-hook-form";

interface WorksheetFormData {
  topic: string;
  subject: string;
  description: string;
  language: string;
  gradeLevel: string;
  difficultyCount: string;
}

export default function WorksheetGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorksheet, setGeneratedWorksheet] = useState<any>(null); // todo: remove mock functionality
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<WorksheetFormData>({
    defaultValues: {
      subject: '',
      language: '',
      gradeLevel: '',
      difficultyCount: '3'
    }
  });

  const handleGenerate = async (data: WorksheetFormData) => {
    console.log('Generating worksheet:', data); // todo: remove mock functionality
    setIsGenerating(true);
    
    // todo: remove mock functionality - simulate API call
    setTimeout(() => {
      setGeneratedWorksheet({
        title: `${data.subject} - ${data.topic}`,
        subject: data.subject,
        topic: data.topic,
        language: data.language,
        difficulties: ['Easy', 'Medium', 'Hard'].slice(0, parseInt(data.difficultyCount)),
        questions: {
          easy: [
            "What is 2 + 2?",
            "Name one fruit that grows on trees",
            "How many days are in a week?"
          ],
          medium: [
            "Calculate 15 × 7",
            "Explain the water cycle in 2 sentences",
            "What is the capital of your state?"
          ],
          hard: [
            "Solve for x: 2x + 5 = 15",
            "Compare and contrast renewable vs non-renewable energy",
            "Describe the importance of biodiversity"
          ]
        },
        generatedAt: new Date().toLocaleString()
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handlePreview = () => {
    console.log('Preview worksheet'); // todo: remove mock functionality
  };

  const handleDownload = () => {
    console.log('Download worksheet'); // todo: remove mock functionality
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-display text-3xl font-bold" data-testid="text-worksheet-title">
            Multi-Grade Worksheet Generator
          </h1>
          <p className="text-muted-foreground">
            Create culturally relevant worksheets with multiple difficulty levels
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" data-testid="text-form-title">
              <Brain className="h-5 w-5" />
              Worksheet Details
            </CardTitle>
            <CardDescription>
              Provide details about the worksheet you want to generate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleGenerate)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={watch('subject')} 
                    onValueChange={(value) => setValue('subject', value)}
                  >
                    <SelectTrigger data-testid="select-subject">
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
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Select 
                    value={watch('gradeLevel')} 
                    onValueChange={(value) => setValue('gradeLevel', value)}
                  >
                    <SelectTrigger data-testid="select-grade">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">Classes 1-2</SelectItem>
                      <SelectItem value="3-5">Classes 3-5</SelectItem>
                      <SelectItem value="6-8">Classes 6-8</SelectItem>
                      <SelectItem value="mixed">Mixed Grades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Chapter</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Fractions, Photosynthesis, Story Writing"
                  data-testid="input-topic"
                  {...register("topic", { required: "Topic is required" })}
                />
                {errors.topic && (
                  <p className="text-sm text-destructive">{errors.topic.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional context or specific requirements..."
                  rows={3}
                  data-testid="input-description"
                  {...register("description")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={watch('language')} 
                    onValueChange={(value) => setValue('language', value)}
                  >
                    <SelectTrigger data-testid="select-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                      <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyCount">Difficulty Levels</Label>
                  <Select 
                    value={watch('difficultyCount')} 
                    onValueChange={(value) => setValue('difficultyCount', value)}
                  >
                    <SelectTrigger data-testid="select-difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Levels (Easy, Hard)</SelectItem>
                      <SelectItem value="3">3 Levels (Easy, Medium, Hard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-3 gap-4 flex-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Languages className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Multi-lingual</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Multi-grade</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Culturally relevant</span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base"
                disabled={isGenerating}
                data-testid="button-generate"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Generate Worksheet
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Generated Worksheet Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between" data-testid="text-preview-title">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Generated Worksheet
              </span>
              {generatedWorksheet && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePreview} data-testid="button-preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload} data-testid="button-download">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!generatedWorksheet ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form and click "Generate Worksheet" to see your custom worksheet here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center border-b pb-4">
                  <h2 className="font-display text-xl font-bold" data-testid="text-worksheet-title">
                    {generatedWorksheet.title}
                  </h2>
                  <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{generatedWorksheet.subject}</Badge>
                    <Badge variant="outline">{generatedWorksheet.language}</Badge>
                  </div>
                </div>

                {/* Questions by Difficulty */}
                {generatedWorksheet.difficulties.map((difficulty: string, index: number) => (
                  <div key={difficulty} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "secondary" : index === 1 ? "default" : "destructive"}>
                        {difficulty}
                      </Badge>
                      <h3 className="font-semibold">{difficulty} Level Questions</h3>
                    </div>
                    <div className="space-y-2 ml-4">
                      {generatedWorksheet.questions[difficulty.toLowerCase()]?.map((question: string, qIndex: number) => (
                        <div key={qIndex} className="flex items-start gap-3">
                          <span className="text-sm font-medium text-muted-foreground mt-1">
                            {qIndex + 1}.
                          </span>
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                  Generated on {generatedWorksheet.generatedAt} | Powered by VidyaAI
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}