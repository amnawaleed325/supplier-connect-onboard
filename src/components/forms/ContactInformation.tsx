import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { FormData } from '../SupplierOnboardingForm';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const CITIES = [
  'Lahore',
  'Karachi', 
  'Faisalabad',
  'Rawalpindi',
  'Peshawar',
  'Islamabad',
  'Multan',
  'Gujrat',
  'Gujranwala',
  'Sialkot'
];

const ContactInformation: React.FC<Props> = ({ data, updateData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'businessName':
        if (!value.trim()) {
          newErrors.businessName = 'Shop name is required';
        } else {
          const specialChars = /[$%&#@*()^!~`;:"'\-_+=|/?><]/;
          if (specialChars.test(value)) {
            newErrors.businessName = 'Special characters are not allowed';
          } else if (value.length > 25) {
            newErrors.businessName = 'Maximum 25 characters allowed';
          } else {
            delete newErrors.businessName;
          }
        }
        break;

      case 'phoneNumber':
        const phoneRegex = /^(\+92|03)[0-9]{9,10}$/;
        if (!value.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors.phoneNumber = 'Phone must start with +92 or 03';
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case 'whatsappNumber':
        if (!data.sameAsPhone) {
          const whatsappRegex = /^(\+92|03)[0-9]{9,10}$/;
          if (!value.trim()) {
            newErrors.whatsappNumber = 'WhatsApp number is required';
          } else if (!whatsappRegex.test(value)) {
            newErrors.whatsappNumber = 'WhatsApp must start with +92 or 03';
          } else {
            delete newErrors.whatsappNumber;
          }
        } else {
          delete newErrors.whatsappNumber;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;

      case 'city':
        if (!value) {
          newErrors.city = 'City is required';
        } else {
          delete newErrors.city;
        }
        break;

      case 'shopNumber':
        if (!value.trim()) {
          newErrors.shopNumber = 'Shop number is required';
        } else {
          delete newErrors.shopNumber;
        }
        break;

      case 'streetName':
        if (!value.trim()) {
          newErrors.streetName = 'Street name is required';
        } else {
          delete newErrors.streetName;
        }
        break;

      case 'area':
        if (!value.trim()) {
          newErrors.area = 'Area is required';
        } else {
          delete newErrors.area;
        }
        break;

      case 'landmark':
        if (!value.trim()) {
          newErrors.landmark = 'Landmark is required';
        } else {
          delete newErrors.landmark;
        }
        break;

      case 'returnAddress':
        if (!data.sameAsPickup && !value.trim()) {
          newErrors.returnAddress = 'Return address is required';
        } else {
          delete newErrors.returnAddress;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    const updates: Partial<FormData> = { [name]: value };
    
    // If updating address fields, also update pickupAddress
    if (['shopNumber', 'streetName', 'area', 'landmark'].includes(name)) {
      const currentData = { ...data, [name]: value };
      const pickupAddress = [
        currentData.shopNumber,
        currentData.streetName,
        currentData.area,
        currentData.landmark
      ].filter(Boolean).join(', ');
      updates.pickupAddress = pickupAddress;
    }
    
    updateData(updates);
    validateField(name, value);
  };

  const handlePhoneToggle = (checked: boolean) => {
    updateData({ 
      sameAsPhone: checked,
      whatsappNumber: checked ? data.phoneNumber : ''
    });
    if (checked) {
      const newErrors = { ...errors };
      delete newErrors.whatsappNumber;
      setErrors(newErrors);
    }
  };

  const handleAddressToggle = (checked: boolean) => {
    const pickupAddress = `${data.shopNumber || ''}, ${data.streetName || ''}, ${data.area || ''}, ${data.landmark || ''}`.replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
    updateData({ 
      sameAsPickup: checked,
      returnAddress: checked ? pickupAddress : ''
    });
    if (checked) {
      const newErrors = { ...errors };
      delete newErrors.returnAddress;
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const fields = ['fullName', 'businessName', 'phoneNumber', 'email', 'city', 'shopNumber', 'streetName', 'area', 'landmark'];
    if (!data.sameAsPhone) fields.push('whatsappNumber');
    if (!data.sameAsPickup) fields.push('returnAddress');

    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field, data[field as keyof FormData] as string)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <Card className="form-card">
      <div className="form-section">
          <div className="text-left text-sm text-muted-foreground space-y-1 mb-6 bg-accent/10 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-destructive">⚠️</span>
              <span>All information provided must be correct. Incorrect or false details will result in rejection of your application.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-destructive">⚠️</span>
              <span>Approval is subject to verification by the Markaz team.</span>
            </div>
          </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">Markaz Shop Name *</Label>
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter shop name (max 25 chars)"
              maxLength={25}
              className={errors.businessName ? 'border-destructive' : ''}
            />
            {errors.businessName && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.businessName}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+92 or 03xxxxxxxxx"
              className={errors.phoneNumber ? 'border-destructive' : ''}
            />
            {errors.phoneNumber && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
            <Input
              id="whatsappNumber"
              value={data.sameAsPhone ? data.phoneNumber : data.whatsappNumber}
              onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
              placeholder="+92 or 03xxxxxxxxx"
              disabled={data.sameAsPhone}
              className={errors.whatsappNumber ? 'border-destructive' : ''}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsPhone"
                checked={data.sameAsPhone}
                onCheckedChange={handlePhoneToggle}
              />
              <Label htmlFor="sameAsPhone" className="text-sm">Same as phone number</Label>
            </div>
            {errors.whatsappNumber && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.whatsappNumber}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Select value={data.city} onValueChange={(value) => handleInputChange('city', value)}>
              <SelectTrigger className={errors.city ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.city}
              </div>
            )}
          </div>
        </div>

        {/* Pickup Address Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Pickup Address *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopNumber">Shop Number / House Number *</Label>
              <Input
                id="shopNumber"
                value={data.shopNumber || ''}
                onChange={(e) => handleInputChange('shopNumber', e.target.value)}
                placeholder="Shop/House number"
                className={errors.shopNumber ? 'border-destructive' : ''}
              />
              {errors.shopNumber && (
                <div className="error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.shopNumber}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="streetName">Street Number / Street Name *</Label>
              <Input
                id="streetName"
                value={data.streetName || ''}
                onChange={(e) => handleInputChange('streetName', e.target.value)}
                placeholder="Street name"
                className={errors.streetName ? 'border-destructive' : ''}
              />
              {errors.streetName && (
                <div className="error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.streetName}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Area / Locality *</Label>
              <Input
                id="area"
                value={data.area || ''}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="Area/Locality"
                className={errors.area ? 'border-destructive' : ''}
              />
              {errors.area && (
                <div className="error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.area}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Famous Nearby Location / Landmark *</Label>
              <Input
                id="landmark"
                value={data.landmark || ''}
                onChange={(e) => handleInputChange('landmark', e.target.value)}
                placeholder="Nearby landmark"
                className={errors.landmark ? 'border-destructive' : ''}
              />
              {errors.landmark && (
                <div className="error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.landmark}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnAddress">Return Address *</Label>
          <Textarea
            id="returnAddress"
            value={data.sameAsPickup ? `${data.shopNumber || ''}, ${data.streetName || ''}, ${data.area || ''}, ${data.landmark || ''}`.replace(/^,+|,+$/g, '').replace(/,+/g, ', ') : data.returnAddress}
            onChange={(e) => handleInputChange('returnAddress', e.target.value)}
            placeholder="Enter your return address"
            rows={3}
            disabled={data.sameAsPickup}
            className={errors.returnAddress ? 'border-destructive' : ''}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsPickup"
              checked={data.sameAsPickup}
              onCheckedChange={handleAddressToggle}
            />
            <Label htmlFor="sameAsPickup" className="text-sm">Same as pickup address</Label>
          </div>
          {errors.returnAddress && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.returnAddress}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} className="min-w-32">
            Next Step <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContactInformation;