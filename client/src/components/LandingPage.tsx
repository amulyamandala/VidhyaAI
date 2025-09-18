import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, BarChart3, Lightbulb } from "lucide-react";
import heroImage from "@assets/generated_images/Rural_teacher_with_technology_671a2a8c.png";
import worksheetImage from "@assets/generated_images/AI_worksheet_generation_illustration_89755984.png";
import progressImage from "@assets/generated_images/Student_progress_analytics_dashboard_7375e61d.png";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        <div 
          className="relative h-[80vh] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-display text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
                VidyaAI
              </h1>
              <p className="text-xl text-white/90 mb-2 font-medium">
                Empowering Rural Teachers with AI
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                Multi-agent AI platform designed for rural Indian teachers managing multi-grade classes. 
                Generate worksheets, track progress, and create culturally relevant content - all offline capable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-3 h-auto"
                  onClick={onGetStarted}
                  data-testid="button-get-started"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base px-8 py-3 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
              AI-Powered Educational Tools
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Designed specifically for rural educators managing diverse, multi-grade classrooms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover-elevate" data-testid="card-feature-worksheets">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Multi-Grade Worksheets</h3>
                <p className="text-sm text-muted-foreground">
                  Generate culturally relevant worksheets with multiple difficulty levels for diverse classrooms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate" data-testid="card-feature-planning">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Adaptive Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Weekly lesson plans that adapt based on attendance, progress, and class dynamics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate" data-testid="card-feature-tracking">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Progress Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track student progress and identify weak areas with automated performance insights
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate" data-testid="card-feature-offline">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Offline Support</h3>
                <p className="text-sm text-muted-foreground">
                  Core features work without internet, syncing automatically when connected
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4" data-testid="text-how-it-works">
              Built for Rural Education
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-6">Smart Worksheet Generation</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Input Topic or Chapter</h4>
                    <p className="text-muted-foreground text-sm">Simply enter the subject matter you want to cover</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">AI Creates Multi-Level Content</h4>
                    <p className="text-muted-foreground text-sm">Generates easy, medium, and hard difficulty variations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Culturally Relevant Examples</h4>
                    <p className="text-muted-foreground text-sm">Uses local context and regional language support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={worksheetImage} 
                alt="Worksheet generation process illustration" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="lg:order-2">
              <h3 className="font-display text-2xl font-semibold mb-6">Real-Time Progress Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Automatic Performance Segmentation</h4>
                    <p className="text-muted-foreground text-sm">Students grouped by achievement levels (75%, 65%, 55%, below 45%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Weak Topic Detection</h4>
                    <p className="text-muted-foreground text-sm">AI identifies subjects where multiple students struggle</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Adaptive Remediation</h4>
                    <p className="text-muted-foreground text-sm">Generates targeted follow-up activities and tutorials</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-1 flex justify-center">
              <img 
                src={progressImage} 
                alt="Student progress analytics dashboard" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join rural educators across India who are using VidyaAI to create more engaging, effective learning experiences
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-base px-8 py-3 h-auto"
            onClick={onGetStarted}
            data-testid="button-start-now"
          >
            Start Using VidyaAI
          </Button>
        </div>
      </section>
    </div>
  );
}