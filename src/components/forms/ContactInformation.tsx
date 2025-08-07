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

const pakistaniCities = [
  'Islamabad', 'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 
  'Hyderabad', 'Peshawar', 'Quetta', 'Sialkot', 'Sargodha', 'Bahawalpur', 'Sukkur',
  'Jhang', 'Shekhupura', 'Larkana', 'Gujrat', 'Mardan', 'Kasur', 'Rahim Yar Khan',
  'Sahiwal', 'Okara', 'Wah Cantonment', 'Dera Ghazi Khan', 'Mirpur Khas', 'Nawabshah',
  'Mingora', 'Chiniot', 'Kamoke', 'Mandi Burewala', 'Jhelum', 'Sadiqabad', 'Jacobabad',
  'Shikarpur', 'Khanewal', 'Hafizabad', 'Kohat', 'Muzaffargarh', 'Khanpur', 'Gojra',
  'Bahawalnagar', 'Muridke', 'Pakpattan', 'Abottabad', 'Tando Adam', 'Jaranwala',
  'Khairpur', 'Chishtian', 'Daska', 'Mandi Bahauddin', 'Ahmadpur East', 'Kamalia',
  'Khushab', 'Wazirabad', 'Lodhran', 'Narowal', 'Chakwal', 'Attock', 'Mianwali'
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
          newErrors.businessName = 'Business name is required';
        } else {
          delete newErrors.businessName;
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

      case 'pickupAddress':
        if (!value.trim()) {
          newErrors.pickupAddress = 'Pickup address is required';
        } else {
          delete newErrors.pickupAddress;
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
    updateData({ [name]: value });
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
    updateData({ 
      sameAsPickup: checked,
      returnAddress: checked ? data.pickupAddress : ''
    });
    if (checked) {
      const newErrors = { ...errors };
      delete newErrors.returnAddress;
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const fields = ['fullName', 'businessName', 'phoneNumber', 'email', 'city', 'pickupAddress'];
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
        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
        
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
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter business name"
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
                {pakistaniCities.map((city) => (
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

        <div className="space-y-2">
          <Label htmlFor="pickupAddress">Pickup Address *</Label>
          <Textarea
            id="pickupAddress"
            value={data.pickupAddress}
            onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
            placeholder="Enter your complete pickup address"
            rows={3}
            className={errors.pickupAddress ? 'border-destructive' : ''}
          />
          {errors.pickupAddress && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.pickupAddress}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnAddress">Return Address *</Label>
          <Textarea
            id="returnAddress"
            value={data.sameAsPickup ? data.pickupAddress : data.returnAddress}
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