import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Upload, 
  Mic, 
  FileText, 
  Eye,
  Brain,
  AlertTriangle,
  TrendingUp,
  Download,
  Play,
  Pause,
  Volume2,
  Camera
} from "lucide-react";

interface CorrectionResult {
  id: string;
  studentName: string;
  subject: string;
  topic: string;
  type: 'handwritten' | 'audio' | 'typed';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  errors: Array<{
    question: number;
    error: string;
    correction: string;
    explanation: string;
  }>;
  dyslexiaRisk?: {
    riskLevel: 'low' | 'medium' | 'high';
    indicators: string[];
    recommendations: string[];
  };
  feedback: string;
  processingTime: number;
}

export default function AutoCorrection() {
  const [selectedType, setSelectedType] = useState<'handwritten' | 'audio' | 'typed'>('handwritten');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<CorrectionResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // todo: remove mock functionality - replace with real processing
  const mockResults: CorrectionResult[] = [
    {
      id: "1",
      studentName: "Ravi Kumar",
      subject: "Mathematics",
      topic: "Basic Addition", 
      type: "handwritten",
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8,
      errors: [
        {
          question: 3,
          error: "25 + 17 = 41",
          correction: "25 + 17 = 42", 
          explanation: "Carry-over error in addition. Student forgot to add the carried 1."
        },
        {
          question: 7,
          error: "48 + 36 = 74",
          correction: "48 + 36 = 84",
          explanation: "Basic addition error. Student may need more practice with two-digit addition."
        }
      ],
      feedback: "Good understanding of basic concepts. Focus on carry-over operations in two-digit addition.",
      processingTime: 2.3
    },
    {
      id: "2", 
      studentName: "Priya Sharma",
      subject: "English",
      topic: "Reading Comprehension",
      type: "audio",
      score: 70,
      totalQuestions: 5,
      correctAnswers: 4,
      errors: [
        {
          question: 2,
          error: "Student read 'through' as 'throw'",
          correction: "through [θruː]",
          explanation: "Phonetic confusion between similar-looking words."
        }
      ],
      dyslexiaRisk: {
        riskLevel: 'medium',
        indicators: ["Frequent letter reversal", "Inconsistent reading pace", "Difficulty with similar-looking words"],
        recommendations: ["Use phonetic exercises", "Provide visual word cards", "Allow extra reading time", "Schedule follow-up assessment"]
      },
      feedback: "Shows potential signs of reading difficulties. Recommended for specialized reading support.",
      processingTime: 4.7
    }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Processing file:', file.name); // todo: remove mock functionality
    setIsProcessing(true);

    // todo: remove mock functionality - simulate OCR processing
    setTimeout(() => {
      const newResult: CorrectionResult = {
        id: Date.now().toString(),
        studentName: "New Student",
        subject: "Mathematics",
        topic: "Practice Worksheet",
        type: selectedType,
        score: Math.floor(Math.random() * 40) + 60,
        totalQuestions: 10,
        correctAnswers: Math.floor(Math.random() * 4) + 6,
        errors: [
          {
            question: 1,
            error: "Sample error detected",
            correction: "Correct answer",
            explanation: "AI-generated explanation of the error"
          }
        ],
        feedback: "AI-generated personalized feedback based on performance patterns.",
        processingTime: Math.random() * 3 + 1
      };

      setResults([newResult, ...results]);
      setIsProcessing(false);
      setSelectedResult(newResult.id);
    }, 3000);
  };

  const handleRecording = () => {
    if (!isRecording) {
      console.log('Starting audio recording...'); // todo: remove mock functionality
      setIsRecording(true);
      
      // todo: remove mock functionality - simulate recording and processing
      setTimeout(() => {
        setIsRecording(false);
        setIsProcessing(true);

        setTimeout(() => {
          const newResult: CorrectionResult = {
            id: Date.now().toString(),
            studentName: "Audio Student",
            subject: "English",
            topic: "Reading Assessment",
            type: 'audio',
            score: Math.floor(Math.random() * 30) + 60,
            totalQuestions: 5,
            correctAnswers: Math.floor(Math.random() * 2) + 3,
            errors: [
              {
                question: 1,
                error: "Mispronunciation detected",
                correction: "Correct pronunciation",
                explanation: "Phonetic analysis suggests difficulty with this sound pattern"
              }
            ],
            dyslexiaRisk: Math.random() > 0.5 ? {
              riskLevel: 'medium',
              indicators: ["Reading hesitation", "Word reversal patterns"],
              recommendations: ["Additional phonetic practice", "Visual reading aids"]
            } : undefined,
            feedback: "Speech analysis complete. Consider additional reading support exercises.",
            processingTime: Math.random() * 2 + 2
          };

          setResults([newResult, ...results]);
          setIsProcessing(false);
          setSelectedResult(newResult.id);
        }, 2000);
      }, 5000);
    } else {
      setIsRecording(false);
      console.log('Recording stopped'); // todo: remove mock functionality
    }
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'text-chart-2';
      case 'medium': return 'text-chart-4';
      case 'high': return 'text-destructive';
    }
  };

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4 text-chart-2" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-chart-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-display text-3xl font-bold" data-testid="text-auto-correction-title">
            AI Auto Correction & Reading Analysis
          </h1>
          <p className="text-muted-foreground">
            OCR-based worksheet correction with dyslexia-aware reading feedback
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload/Input Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-upload-title">
                <Upload className="h-5 w-5" />
                Submit Work for Correction
              </CardTitle>
              <CardDescription>
                Upload handwritten worksheets, record audio reading, or paste typed answers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Type Selection */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={selectedType === 'handwritten' ? 'default' : 'outline'}
                  className="flex-col h-20 gap-2"
                  onClick={() => setSelectedType('handwritten')}
                  data-testid="button-handwritten-type"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-xs">Handwritten</span>
                </Button>
                <Button
                  variant={selectedType === 'audio' ? 'default' : 'outline'}
                  className="flex-col h-20 gap-2"
                  onClick={() => setSelectedType('audio')}
                  data-testid="button-audio-type"
                >
                  <Volume2 className="h-5 w-5" />
                  <span className="text-xs">Audio Reading</span>
                </Button>
                <Button
                  variant={selectedType === 'typed' ? 'default' : 'outline'}
                  className="flex-col h-20 gap-2"
                  onClick={() => setSelectedType('typed')}
                  data-testid="button-typed-type"
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Typed Text</span>
                </Button>
              </div>

              <Separator />

              {/* Upload Interface */}
              {selectedType === 'handwritten' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Upload Handwritten Work</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Take a photo or upload scanned worksheets for AI analysis
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      data-testid="input-file-upload"
                    />
                    <Button asChild disabled={isProcessing}>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        {isProcessing ? 'Processing...' : 'Choose File'}
                      </label>
                    </Button>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Advanced OCR Features</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Handwriting recognition with error detection</li>
                          <li>• Letter shape and spacing analysis</li>
                          <li>• Motor skill pattern identification</li>
                          <li>• Cultural context adaptation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'audio' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Mic className={`h-12 w-12 mx-auto mb-4 ${isRecording ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold mb-2">Record Reading Session</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Record student reading for pronunciation and fluency analysis
                    </p>
                    <Button
                      onClick={handleRecording}
                      disabled={isProcessing}
                      variant={isRecording ? 'destructive' : 'default'}
                      data-testid="button-record-audio"
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-destructive/5 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Dyslexia-Aware Analysis</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Speech pattern recognition for reading difficulties</li>
                          <li>• Phonetic accuracy and rhythm analysis</li>
                          <li>• Early intervention recommendations</li>
                          <li>• Multi-language dialect support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'typed' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="typed-answers">Paste Typed Answers</Label>
                    <Textarea
                      id="typed-answers"
                      placeholder="Paste student's typed responses here for analysis..."
                      rows={6}
                      data-testid="input-typed-answers"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select defaultValue="english">
                      <SelectTrigger className="w-48" data-testid="select-text-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      disabled={isProcessing}
                      data-testid="button-analyze-text"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      {isProcessing ? 'Analyzing...' : 'Analyze Text'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Processing Status */}
              {isProcessing && (
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary animate-pulse" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">AI Processing in Progress...</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedType === 'handwritten' && "OCR analysis and error detection"}
                        {selectedType === 'audio' && "Speech recognition and dyslexia screening"}
                        {selectedType === 'typed' && "Text analysis and pattern recognition"}
                      </p>
                    </div>
                  </div>
                  <Progress value={33} className="mt-3" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {results.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle data-testid="text-recent-results-title">Recent Corrections</CardTitle>
                <CardDescription>AI-processed submissions with detailed feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className={`p-4 border rounded-lg hover-elevate cursor-pointer transition-colors ${
                        selectedResult === result.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedResult(result.id)}
                      data-testid={`card-result-${result.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{result.studentName}</h3>
                            <Badge variant="outline">{result.subject}</Badge>
                            <Badge variant={result.type === 'audio' ? 'secondary' : 'outline'}>
                              {result.type}
                            </Badge>
                            {result.dyslexiaRisk && getRiskIcon(result.dyslexiaRisk.riskLevel)}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Score:</span>
                              <span className="font-semibold ml-1">{result.score}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Correct:</span>
                              <span className="font-semibold ml-1">{result.correctAnswers}/{result.totalQuestions}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Errors:</span>
                              <span className="font-semibold ml-1">{result.errors.length}</span>
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" data-testid={`button-view-result-${result.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Details */}
        <div className="space-y-6">
          {/* Selected Result Details */}
          {selectedResult && (
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-correction-details-title">Correction Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const result = [...results, ...mockResults].find(r => r.id === selectedResult);
                  if (!result) return null;

                  return (
                    <div className="space-y-4">
                      {/* Score Summary */}
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold mb-1">{result.score}%</div>
                        <div className="text-sm text-muted-foreground">
                          {result.correctAnswers} out of {result.totalQuestions} correct
                        </div>
                        <Progress value={result.score} className="mt-2" />
                      </div>

                      {/* Dyslexia Risk Assessment */}
                      {result.dyslexiaRisk && (
                        <div className="p-4 bg-destructive/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            {getRiskIcon(result.dyslexiaRisk.riskLevel)}
                            <h4 className="font-semibold">Dyslexia Risk Assessment</h4>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium">Risk Level: 
                                <span className={`ml-1 ${getRiskColor(result.dyslexiaRisk.riskLevel)}`}>
                                  {result.dyslexiaRisk.riskLevel.toUpperCase()}
                                </span>
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-semibold mb-1">Indicators:</p>
                              <ul className="text-xs space-y-1">
                                {result.dyslexiaRisk.indicators.map((indicator, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <div className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                                    {indicator}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-sm font-semibold mb-1">Recommendations:</p>
                              <ul className="text-xs space-y-1">
                                {result.dyslexiaRisk.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <CheckCircle className="w-3 h-3 text-chart-2 mt-0.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Errors & Corrections */}
                      {result.errors.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Errors & Corrections:</h4>
                          <div className="space-y-3">
                            {result.errors.map((error, index) => (
                              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-start gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">Q{error.question}</Badge>
                                  <div className="flex-1">
                                    <p className="text-sm"><strong>Error:</strong> {error.error}</p>
                                    <p className="text-sm text-chart-2"><strong>Correct:</strong> {error.correction}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">{error.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Feedback */}
                      <div>
                        <h4 className="font-semibold mb-2">AI Feedback:</h4>
                        <p className="text-sm bg-primary/5 p-3 rounded-lg">{result.feedback}</p>
                      </div>

                      {/* Processing Stats */}
                      <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                        Processed in {result.processingTime.toFixed(1)}s using advanced AI models
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" data-testid="button-download-report">
                          <Download className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" data-testid="button-remedial-plan">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Remedial Plan
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base" data-testid="text-processing-stats-title">Processing Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Processed:</span>
                <Badge variant="secondary">{results.length + mockResults.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dyslexia Screenings:</span>
                <Badge variant="outline">
                  {[...results, ...mockResults].filter(r => r.dyslexiaRisk).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Score:</span>
                <Badge variant="outline">
                  {Math.round([...results, ...mockResults].reduce((acc, r) => acc + r.score, 0) / ([...results, ...mockResults].length || 1))}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}