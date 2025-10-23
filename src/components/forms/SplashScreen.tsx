import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Users, ShoppingCart, TrendingUp } from 'lucide-react';

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
      
      {/* Left side - Marketing Content */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center relative z-10 px-6 md:px-12 py-6">
        <div className="text-center text-white max-w-xl w-full space-y-6">
          {/* Main Headline */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
              Join the Fastest-Growing Selling Network in Pakistan!
            </h1>
            
            <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed">
              Register and list your products to instantly reach thousands of active resellers.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-5 border border-white/20">
              <Download className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-white" />
              <div className="text-2xl md:text-3xl font-bold">5M+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">App Downloads</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-5 border border-white/20">
              <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-white" />
              <div className="text-2xl md:text-3xl font-bold">350K+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Resellers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-5 border border-white/20">
              <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-white" />
              <div className="text-2xl md:text-3xl font-bold">4M+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Orders Placed</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-5 border border-white/20">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-white" />
              <div className="text-2xl md:text-3xl font-bold">1B+</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Reseller Earnings</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Sign Up Form */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center relative z-10 px-6 md:px-12 py-6 bg-white/5 backdrop-blur-sm">
        <div className="text-center text-white max-w-md w-full space-y-4">
          {/* Picture at top */}
          <div className="rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20 mb-4">
            <img 
              src="/lovable-uploads/9b4732a0-1f01-491f-884d-51c857f6c82c.png"
              alt="Markaz representative" 
              className="w-full h-40 md:h-48 object-cover object-center"
            />
          </div>
          
          {/* Form Header */}
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Become a Markaz Supplier
            </h2>
            <p className="text-xs md:text-sm opacity-90">
              Quick, guided registration in under 5 minutes - start selling in minutes!
            </p>
          </div>
          
          {/* Sign Up Form */}
          <div className="space-y-3">
            <div className="text-left">
              <Label htmlFor="email" className="text-white text-xs md:text-sm font-medium mb-1 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-10 md:h-11 text-sm"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="password" className="text-white text-xs md:text-sm font-medium mb-1 block">
                Create Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-10 md:h-11 text-sm"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="confirmPassword" className="text-white text-xs md:text-sm font-medium mb-1 block">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Rewrite password"
                className="w-full bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white/50 h-10 md:h-11 text-sm"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSignUp}
            size="lg"
            className="w-full bg-white text-[#1c6e9d] hover:bg-white/90 px-6 py-4 md:py-5 text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
          >
            Sign Up
          </Button>
          
          {/* Footer Benefits */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 text-xs opacity-90 mt-4 pt-4 border-t border-white/20">
            <span>✓ Faster approval</span>
            <span>✓ Zero setup cost</span>
            <span>✓ Dedicated support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;