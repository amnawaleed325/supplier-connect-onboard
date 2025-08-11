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
                    <stop offset="0%" style="stop-color:#34d399;stop-opacity:1" />
                    <stop offset="25%" style="stop-color:#22d3ee;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
                    <stop offset="75%" style="stop-color:#6366f1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
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
      <div className="w-1/2 h-screen flex items-center justify-center relative z-10 pr-16">
        <div className="text-center text-white px-8 max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
            Become a Markaz Seller 🚀
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-16 leading-relaxed">
            Sell your products to thousands of customers with ease.
          </p>
          
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-20 py-10 text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
            style={{ 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(255, 255, 255, 0.1)'
            }}
          >
            Start Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;