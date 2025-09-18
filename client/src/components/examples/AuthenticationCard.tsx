import AuthenticationCard from '../AuthenticationCard';

export default function AuthenticationCardExample() {
  return (
    <AuthenticationCard 
      onGoogleLogin={() => console.log('Google login initiated')}
      onSecurityPasswordSet={(password) => console.log('Security password set:', password)}
    />
  );
}