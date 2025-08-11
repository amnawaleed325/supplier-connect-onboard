import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onStart: () => void;
}

const SplashScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex"
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
      
      {/* Lady PNG - positioned left side, full screen */}
      <div className="w-1/2 h-screen relative">
        <img 
          src="/lovable-uploads/9b4732a0-1f01-491f-884d-51c857f6c82c.png"
          alt="Markaz representative" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Right side content */}
      <div className="w-1/2 h-screen flex items-center justify-center relative z-10">
        <div className="text-center text-white px-8 max-w-lg">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Become a Markaz Seller 🚀
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
            Sell your products to thousands of customers with ease.
          </p>
          
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-white/20"
          >
            Start Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;