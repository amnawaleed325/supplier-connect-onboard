import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onStart: () => void;
}

const SplashScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
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
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      {/* Lady PNG - positioned bottom-right */}
      <div className="absolute bottom-0 right-0 w-1/3 md:w-1/4 h-auto">
        <img 
          src="/lovable-uploads/9b4732a0-1f01-491f-884d-51c857f6c82c.png"
          alt="Markaz representative" 
          className="w-full h-auto object-contain"
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Become a Markaz Seller 🚀
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
          Sell your products to thousands of customers with ease.
        </p>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Registration
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;