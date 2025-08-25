import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, MessageCircle, Home } from 'lucide-react';

const ThankYou: React.FC = () => {
  const handleNewApplication = () => {
    window.location.reload();
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/923001234567?text=Hello%20Markaz%2C%20I%20have%20submitted%20my%20supplier%20application.', '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card className="form-card text-center">
          <div className="form-section">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-2xl font-bold text-secondary mb-4">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Thank you for your interest in becoming a Markaz supplier. We have received your application and our team will review it within 2-3 business days.
            </p>

            {/* Next Steps */}
            <div className="bg-accent/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-secondary mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Document verification (1-2 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Account setup and approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Welcome kit and training materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Start listing your products</span>
                </div>
              </div>
            </div>

            {/* Application ID */}
            <div className="bg-muted/50 rounded-lg p-3 mb-6">
              <p className="text-xs text-muted-foreground mb-1">Application Reference ID</p>
              <p className="font-mono text-sm font-medium">MKZ-{Date.now().toString().slice(-8)}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="outline" onClick={handleNewApplication} className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Submit Another Application
              </Button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-muted-foreground mt-6">
              You will receive email and WhatsApp updates on your application status.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;