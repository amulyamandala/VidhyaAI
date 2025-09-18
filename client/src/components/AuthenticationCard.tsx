import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Shield, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

interface AuthFormData {
  securityPassword: string;
  confirmPassword: string;
}

interface AuthenticationCardProps {
  onGoogleLogin: () => void;
  onSecurityPasswordSet: (password: string) => void;
  isLoading?: boolean;
}

export default function AuthenticationCard({ 
  onGoogleLogin, 
  onSecurityPasswordSet,
  isLoading = false 
}: AuthenticationCardProps) {
  const [step, setStep] = useState<'login' | 'security'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AuthFormData>();
  const securityPassword = watch("securityPassword");

  const handleGoogleSignIn = () => {
    console.log('Google sign-in initiated'); // todo: remove mock functionality
    onGoogleLogin();
    setStep('security');
  };

  const handleSecurityPasswordSubmit = (data: AuthFormData) => {
    console.log('Security password set:', data.securityPassword); // todo: remove mock functionality
    onSecurityPasswordSet(data.securityPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-chart-2/5 p-4">
      <div className="w-full max-w-md">
        {/* VidyaAI Branding */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-2" data-testid="text-brand-title">
            VidyaAI
          </h1>
          <p className="text-muted-foreground">
            AI-Powered Education Platform
          </p>
        </div>

        <Card className="w-full shadow-lg">
          {step === 'login' ? (
            <>
              <CardHeader className="text-center space-y-1 pb-4">
                <CardTitle className="text-2xl font-semibold" data-testid="text-login-title">
                  Welcome to VidyaAI
                </CardTitle>
                <CardDescription>
                  Sign in with your Google account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 text-base"
                  data-testid="button-google-signin"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {isLoading ? 'Signing in...' : 'Continue with Google'}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure OAuth authentication</p>
                  <p className="text-xs mt-1">We never store your Google password</p>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center space-y-1 pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold" data-testid="text-security-title">
                  Create Security Password
                </CardTitle>
                <CardDescription>
                  Set a personal password for additional security when accessing VidyaAI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(handleSecurityPasswordSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="securityPassword">Security Password</Label>
                    <div className="relative">
                      <Input
                        id="securityPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a secure password"
                        className="pr-10"
                        data-testid="input-security-password"
                        {...register("securityPassword", {
                          required: "Security password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          }
                        })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.securityPassword && (
                      <p className="text-sm text-destructive" data-testid="text-password-error">
                        {errors.securityPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pr-10"
                        data-testid="input-confirm-password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === securityPassword || "Passwords do not match"
                        })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        data-testid="button-toggle-confirm-password"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive" data-testid="text-confirm-error">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Why a security password?</p>
                        <p className="text-xs text-muted-foreground">
                          This adds an extra layer of protection to your educational data and ensures 
                          only you can access your VidyaAI dashboard.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                    data-testid="button-set-password"
                  >
                    {isLoading ? 'Setting up...' : 'Complete Setup'}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Built specifically for rural educators</p>
          <p>Offline-capable • Culturally relevant • Multi-grade support</p>
        </div>
      </div>
    </div>
  );
}