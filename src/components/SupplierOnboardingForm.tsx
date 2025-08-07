import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactInformation from './forms/ContactInformation';
import SupplierDetails from './forms/SupplierDetails';
import BusinessVerification from './forms/BusinessVerification';
import ThankYou from './forms/ThankYou';

export interface FormData {
  // Step 1: Contact Information
  fullName: string;
  businessName: string;
  phoneNumber: string;
  whatsappNumber: string;
  sameAsPhone: boolean;
  email: string;
  city: string;
  pickupAddress: string;
  returnAddress: string;
  sameAsPickup: boolean;

  // Step 2: Supplier Details
  supplierType: string;
  mainCategory: string;
  secondaryCategory: string;
  productCount: string;
  stockPerProduct: string;
  priceRange: string;
  listingType: string;
  experience: string;
  hearAbout: string;
  sampleImage?: File;

  // Step 3: Business Verification
  cnicNumber: string;
  cnicFront?: File;
  cnicBack?: File;
  bankIban: string;
  bankAccountTitle: string;
  ntnNumber: string;
  fbrCertificate?: File;
  businessLogo?: File;
}

const STEPS = [
  { title: 'Contact Information', subtitle: 'Basic contact details' },
  { title: 'Supplier Details', subtitle: 'Business & product info' },
  { title: 'Verification', subtitle: 'Document verification' }
];

const SupplierOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    businessName: '',
    phoneNumber: '',
    whatsappNumber: '',
    sameAsPhone: true,
    email: '',
    city: '',
    pickupAddress: '',
    returnAddress: '',
    sameAsPickup: true,
    supplierType: '',
    mainCategory: '',
    secondaryCategory: '',
    productCount: '',
    stockPerProduct: '',
    priceRange: '',
    listingType: '',
    experience: '',
    hearAbout: '',
    cnicNumber: '',
    bankIban: '',
    bankAccountTitle: '',
    ntnNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Convert to structured JSON
    const submissionData = {
      contactInfo: {
        fullName: formData.fullName,
        businessName: formData.businessName,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,
        city: formData.city,
        pickupAddress: formData.pickupAddress,
        returnAddress: formData.returnAddress
      },
      supplierDetails: {
        supplierType: formData.supplierType,
        mainCategory: formData.mainCategory,
        secondaryCategory: formData.secondaryCategory,
        productCount: parseInt(formData.productCount),
        stockPerProduct: parseInt(formData.stockPerProduct),
        priceRange: formData.priceRange,
        listingType: formData.listingType,
        experience: formData.experience,
        hearAbout: formData.hearAbout
      },
      verification: {
        cnicNumber: formData.cnicNumber,
        bankIban: formData.bankIban,
        bankAccountTitle: formData.bankAccountTitle,
        ntnNumber: formData.ntnNumber
      },
      submittedAt: new Date().toISOString()
    };

    console.log('Supplier Application Submitted:', submissionData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactInformation
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <SupplierDetails
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <BusinessVerification
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-secondary">Markaz Supplier</h1>
          </div>
          <p className="text-muted-foreground">Join Pakistan's fastest growing marketplace</p>
        </div>

        {/* Progress Indicator */}
        <Card className="form-card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`step-indicator ${
                    index === currentStep ? 'active' : 
                    index < currentStep ? 'completed' : 'pending'
                  }`}>
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center mt-2 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground sm:hidden">
              <span>Step {currentStep + 1} of {STEPS.length}</span>
              <span>{STEPS[currentStep].title}</span>
            </div>
          </div>
        </Card>

        {/* Form Content */}
        {renderStep()}
      </div>
    </div>
  );
};

export default SupplierOnboardingForm;