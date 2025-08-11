import React, { useState } from 'react';
import SplashScreen from '@/components/forms/SplashScreen';
import SupplierOnboardingForm from '@/components/SupplierOnboardingForm';

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return <SplashScreen onStart={() => setShowForm(true)} />;
  }

  return <SupplierOnboardingForm />;
};

export default Index;
