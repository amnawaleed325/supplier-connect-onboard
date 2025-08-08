import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ChevronLeft, Upload, Send } from 'lucide-react';
import { FormData } from '../SupplierOnboardingForm';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const BusinessVerification: React.FC<Props> = ({ data, updateData, onSubmit, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string | File | undefined) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'cnicNumber':
        const cnicRegex = /^[0-9]{13}$/;
        if (!value || value === '') {
          newErrors.cnicNumber = 'CNIC number is required';
        } else if (!cnicRegex.test(value as string)) {
          newErrors.cnicNumber = 'CNIC must be exactly 13 digits';
        } else {
          delete newErrors.cnicNumber;
        }
        break;

      case 'cnicFront':
        if (!value) {
          newErrors.cnicFront = 'CNIC front image is required';
        } else {
          delete newErrors.cnicFront;
        }
        break;

      case 'cnicBack':
        if (!value) {
          newErrors.cnicBack = 'CNIC back image is required';
        } else {
          delete newErrors.cnicBack;
        }
        break;

      case 'bankIban':
        const ibanRegex = /^PK[0-9]{22}$/;
        if (!value || value === '') {
          newErrors.bankIban = 'Bank IBAN is required';
        } else if (!ibanRegex.test(value as string)) {
          newErrors.bankIban = 'IBAN must start with PK and be 24 characters total';
        } else {
          delete newErrors.bankIban;
        }
        break;

      case 'bankAccountTitle':
        if (!value || value === '') {
          newErrors.bankAccountTitle = 'Bank account title is required';
        } else {
          delete newErrors.bankAccountTitle;
        }
        break;

      case 'ntnNumber':
        if (!value || value === '') {
          newErrors.ntnNumber = 'NTN number is required';
        } else {
          const ntnRegex = /^[0-9A-Za-z]{7}$/;
          if (!ntnRegex.test(value as string)) {
            newErrors.ntnNumber = 'NTN must be 7 characters (numeric or alphanumeric)';
          } else {
            delete newErrors.ntnNumber;
          }
        }
        break;

      case 'chequeImage':
        if (!value) {
          newErrors.chequeImage = 'Cheque image is required';
        } else {
          delete newErrors.chequeImage;
        }
        break;

      case 'taxCertificate':
        if (!value) {
          newErrors.taxCertificate = 'TAX certificate is required';
        } else {
          delete newErrors.taxCertificate;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    updateData({ [name]: value });
    validateField(name, value);
  };

  const handleFileUpload = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type based on field
      let allowedTypes: string[] = [];
      
      if (name === 'taxCertificate') {
        allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      } else {
        allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      }

      if (!allowedTypes.includes(file.type)) {
        const fileTypes = name === 'taxCertificate' ? 'PDF or image' : 'JPG or PNG';
        setErrors(prev => ({ ...prev, [name]: `Please upload a ${fileTypes} file` }));
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: 'File size must be less than 10MB' }));
        return;
      }

      updateData({ [name]: file });
      validateField(name, file);
    }
  };

  const validateStep = () => {
    const requiredFields = ['cnicNumber', 'cnicFront', 'cnicBack', 'bankIban', 'bankAccountTitle', 'ntnNumber', 'chequeImage', 'taxCertificate'];

    let isValid = true;

    // Validate required fields
    requiredFields.forEach(field => {
      let value = data[field as keyof FormData];
      if (!validateField(field, value as string | File)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        onSubmit();
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const FileUploadField = ({ 
    name, 
    label, 
    required = false, 
    accept 
  }: { 
    name: keyof FormData, 
    label: string, 
    required?: boolean,
    accept: string 
  }) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label} {required && '*'}</Label>
      <div className={`upload-zone ${errors[name] ? 'border-destructive' : ''}`}>
        <input
          type="file"
          id={name}
          accept={accept}
          onChange={(e) => handleFileUpload(name, e)}
          className="hidden"
        />
        <label htmlFor={name} className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground text-center">
            {data[name] ? (data[name] as File).name : `Click to upload ${accept.replace(/\./g, '').toUpperCase()}`}
          </span>
          <span className="text-xs text-muted-foreground">Max size: 10MB</span>
        </label>
      </div>
      {errors[name] && (
        <div className="error-message">
          <AlertCircle className="w-4 h-4" />
          {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <Card className="form-card">
      <div className="form-section">
        <h2 className="text-xl font-semibold mb-6">Business Verification</h2>

        <div className="space-y-2">
          <Label htmlFor="cnicNumber">CNIC Number *</Label>
          <Input
            id="cnicNumber"
            value={data.cnicNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 13);
              handleInputChange('cnicNumber', value);
            }}
            placeholder="1234567890123 (13 digits only)"
            maxLength={13}
            className={errors.cnicNumber ? 'border-destructive' : ''}
          />
          {errors.cnicNumber && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.cnicNumber}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FileUploadField
            name="cnicFront"
            label="CNIC Front Image"
            required
            accept=".jpg,.jpeg,.png"
          />
          <FileUploadField
            name="cnicBack"
            label="CNIC Back Image"
            required
            accept=".jpg,.jpeg,.png"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankIban">Bank IBAN Number *</Label>
          <Input
            id="bankIban"
            value={data.bankIban}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 24);
              handleInputChange('bankIban', value);
            }}
            placeholder="PK12ABCD0123456789012345"
            maxLength={24}
            className={errors.bankIban ? 'border-destructive' : ''}
          />
          {errors.bankIban && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.bankIban}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bankAccountTitle">Bank Account Title *</Label>
          <Input
            id="bankAccountTitle"
            value={data.bankAccountTitle}
            onChange={(e) => handleInputChange('bankAccountTitle', e.target.value)}
            placeholder="Must match CNIC or Business Name"
            className={errors.bankAccountTitle ? 'border-destructive' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Account title must match your CNIC name or registered business name
          </p>
          {errors.bankAccountTitle && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.bankAccountTitle}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ntnNumber">NTN Number *</Label>
          <Input
            id="ntnNumber"
            value={data.ntnNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 7);
              handleInputChange('ntnNumber', value);
            }}
            placeholder="1234567 (7 characters)"
            maxLength={7}
            className={errors.ntnNumber ? 'border-destructive' : ''}
          />
          {errors.ntnNumber && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.ntnNumber}
            </div>
          )}
        </div>

        <FileUploadField
          name="chequeImage"
          label="Cheque Image Upload"
          required
          accept=".jpg,.jpeg,.png"
        />

        <FileUploadField
          name="taxCertificate"
          label="TAX Payer Registration Certificate Upload"
          required
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <FileUploadField
          name="businessLogo"
          label="Business Logo (Optional)"
          accept=".jpg,.jpeg,.png"
        />

        {/* Pre-submission Notice */}
        <div className="bg-accent/20 rounded-lg p-4 border border-accent/30">
          <p className="text-sm text-secondary">
            After submitting, you will be directed to our education modules page. You must pass a short MCQ quiz to qualify for activation.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                I'm Ready → Next Step <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BusinessVerification;