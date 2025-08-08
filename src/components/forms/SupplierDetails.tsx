import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { FormData } from '../SupplierOnboardingForm';

interface Props {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const supplierTypes = [
  'Manufacturer',
  'Wholesaler', 
  'Distributor',
  'Retailer'
];

const categories = [
  'Auto & Bike Accessories',
  'Bags',
  'Bedding',
  'Books & Stationery',
  'Brands',
  'Cosmetics',
  'Electronic Accessories',
  'Electronics',
  'Fashion Accessories',
  'Festive Collection',
  'Fitness',
  'Home Decor',
  'Home Essentials',
  'Home Linen',
  'Islamic Accessories',
  'Jewellery',
  'Kids Accessories',
  'Kids Clothing',
  'Kitchenware',
  'Men\'s Shawls',
  'Men\'s Stitched',
  'Men\'s Undergarments',
  'Men\'s Unstitched',
  'Mother & Baby',
  'Other',
  'Perfumes',
  'Shoes',
  'Unisex Clothing',
  'Women\'s Handbags',
  'Women\'s Shawls',
  'Women\'s Stitched',
  'Women\'s Unstitched',
  'Women Undergarments'
];

const priceRanges = [
  '300–500',
  '500–1000',
  '1000–2000',
  '2000–5000',
  'More than 5000'
];

const experienceOptions = [
  'Less than 1 year',
  '1–3 years',
  '3+ years'
];

const hearAboutOptions = [
  'Social Media',
  'Referral',
  'Ads',
  'Other'
];

const SupplierDetails: React.FC<Props> = ({ data, updateData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string | File | undefined) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'supplierType':
        if (!value) {
          newErrors.supplierType = 'Supplier type is required';
        } else {
          delete newErrors.supplierType;
        }
        break;

      case 'mainCategory':
        if (!value) {
          newErrors.mainCategory = 'Main category is required';
        } else {
          delete newErrors.mainCategory;
        }
        break;

      case 'productCount':
        if (!value || value === '') {
          newErrors.productCount = 'Product count is required';
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.productCount = 'Please enter a valid number';
        } else {
          delete newErrors.productCount;
        }
        break;

      case 'stockPerProduct':
        if (!value || value === '') {
          newErrors.stockPerProduct = 'Stock per product is required';
        } else if (isNaN(Number(value)) || Number(value) < 100) {
          newErrors.stockPerProduct = 'Stock must be 100 or more to proceed';
        } else {
          delete newErrors.stockPerProduct;
        }
        break;

      case 'priceRange':
        if (!value) {
          newErrors.priceRange = 'Price range is required';
        } else {
          delete newErrors.priceRange;
        }
        break;

      case 'listingType':
        if (!value) {
          newErrors.listingType = 'Listing type is required';
        } else {
          delete newErrors.listingType;
        }
        break;

      case 'experience':
        if (!value) {
          newErrors.experience = 'Experience is required';
        } else {
          delete newErrors.experience;
        }
        break;

      case 'hearAbout':
        if (!value) {
          newErrors.hearAbout = 'Please tell us how you heard about Markaz';
        } else {
          delete newErrors.hearAbout;
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, sampleImage: 'Please upload a JPG or PNG image' }));
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, sampleImage: 'File size must be less than 5MB' }));
        return;
      }

      updateData({ sampleImage: file });
      const newErrors = { ...errors };
      delete newErrors.sampleImage;
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const requiredFields = [
      'supplierType', 'mainCategory', 'productCount', 'stockPerProduct', 
      'priceRange', 'listingType', 'experience', 'hearAbout'
    ];

    let isValid = true;
    requiredFields.forEach(field => {
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
        <h2 className="text-xl font-semibold mb-6">Supplier & Product Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="supplierType">Supplier Type *</Label>
            <Select value={data.supplierType} onValueChange={(value) => handleInputChange('supplierType', value)}>
              <SelectTrigger className={errors.supplierType ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select supplier type" />
              </SelectTrigger>
              <SelectContent>
                {supplierTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.supplierType && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.supplierType}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainCategory">Main Category *</Label>
            <Select value={data.mainCategory} onValueChange={(value) => handleInputChange('mainCategory', value)}>
              <SelectTrigger className={errors.mainCategory ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mainCategory && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.mainCategory}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryCategory">Secondary Category (Optional)</Label>
          <Select value={data.secondaryCategory} onValueChange={(value) => handleInputChange('secondaryCategory', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select secondary category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="productCount">Apkay paas kitni products hain? *</Label>
            <Input
              id="productCount"
              type="number"
              value={data.productCount}
              onChange={(e) => handleInputChange('productCount', e.target.value)}
              placeholder="Enter number of products"
              min="1"
              className={errors.productCount ? 'border-destructive' : ''}
            />
            {errors.productCount && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.productCount}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stockPerProduct">Apkay paas aik product ka kitna stock mojood hai? *</Label>
            <Input
              id="stockPerProduct"
              type="number"
              value={data.stockPerProduct}
              onChange={(e) => handleInputChange('stockPerProduct', e.target.value)}
              placeholder="Minimum 100 required"
              min="100"
              className={errors.stockPerProduct ? 'border-destructive' : ''}
            />
            {errors.stockPerProduct && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.stockPerProduct}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceRange">Product Price Range *</Label>
          <Select value={data.priceRange} onValueChange={(value) => handleInputChange('priceRange', value)}>
            <SelectTrigger className={errors.priceRange ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  PKR {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priceRange && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.priceRange}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label>Do you want to list your products yourself or via paid listing? *</Label>
          <RadioGroup value={data.listingType} onValueChange={(value) => handleInputChange('listingType', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="self-listing" id="self-listing" />
              <Label htmlFor="self-listing">Self-listing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid-listing" id="paid-listing" />
              <Label htmlFor="paid-listing">Paid Listing</Label>
            </div>
          </RadioGroup>
          {errors.listingType && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.listingType}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Experience with other e-commerce platforms? *</Label>
            <Select value={data.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experience && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.experience}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hearAbout">How did you hear about Markaz? *</Label>
            <Select value={data.hearAbout} onValueChange={(value) => handleInputChange('hearAbout', value)}>
              <SelectTrigger className={errors.hearAbout ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {hearAboutOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hearAbout && (
              <div className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.hearAbout}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sampleImage">Upload Sample Product Image (Optional)</Label>
          <div className="upload-zone">
            <input
              type="file"
              id="sampleImage"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="sampleImage" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {data.sampleImage ? data.sampleImage.name : 'Click to upload JPG, JPEG, or PNG'}
              </span>
              <span className="text-xs text-muted-foreground">Max size: 5MB</span>
            </label>
          </div>
          {errors.sampleImage && (
            <div className="error-message">
              <AlertCircle className="w-4 h-4" />
              {errors.sampleImage}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button onClick={handleNext} className="min-w-32">
            Next Step <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SupplierDetails;