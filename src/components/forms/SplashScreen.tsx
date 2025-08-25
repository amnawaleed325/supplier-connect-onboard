import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onStart: () => void;
}

const SplashScreen: React.FC<Props> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasNumber && hasLetter && isLongEnough;
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and contain both letters and numbers');
      return;
    }
    onStart();
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col md:flex-row"
         style={{
           backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
             <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2b987c;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#1c6e9d;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#0e2869;stop-opacity:1" />
                  </linearGradient>
               </defs>
               <rect width="1920" height="1080" fill="url(#grad1)"/>
             </svg>
           `)}')`
         }}>
      
      {/* Lady PNG - positioned left side */}
      <div className="w-full md:w-1/2 h-64 md:h-screen relative order-2 md:order-1">
        <img 
          src="/lovable-uploads/9b4732a0-1f01-491f-884d-51c857f6c82c.png"
          alt="Markaz representative" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Right side content - Sign Up Form */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center relative z-10 px-4 md:pr-16 py-8 order-1 md:order-2">
        <div className="text-center text-white px-4 md:px-8 max-w-md w-full">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            Become a Markaz Seller 🚀
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-90 mb-8 md:mb-12 leading-relaxed">
            Register now in less than 5 minutes and start selling
          </p>
          
          {/* Sign Up Form */}
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="text-left">
              <Label htmlFor="email" className="text-white text-sm md:text-base font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-12 md:h-14 text-base"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="password" className="text-white text-sm md:text-base font-medium mb-2 block">
                Create Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-12 md:h-14 text-base"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="confirmPassword" className="text-white text-sm md:text-base font-medium mb-2 block">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Rewrite password"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-12 md:h-14 text-base"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSignUp}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 px-8 py-4 md:py-6 text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
            style={{ 
              color: '#ffffff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(255, 255, 255, 0.1)'
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;