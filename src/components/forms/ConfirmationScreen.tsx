import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, ArrowRight } from 'lucide-react';
import { FormData } from '../SupplierOnboardingForm';

interface Props {
  data: FormData;
  onEdit: () => void;
  onConfirm: () => void;
}

const ConfirmationScreen: React.FC<Props> = ({ data, onEdit, onConfirm }) => {
  const formatAddress = () => {
    return `${data.shopNumber || ''}, ${data.streetName || ''}, ${data.area || ''}, ${data.landmark || ''}`.replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
  };

  const getDisplayValue = (option: string) => {
    switch (option) {
      case 'less-than-10': return 'Less than 10';
      case '10-50': return '10-50';
      case '50-100': return '50-100';
      case '100-500': return '100-500';
      case 'more-than-500': return 'More than 500';
      case 'more-than-100': return 'More than 100';
      case 'less-than-300': return 'Less than 300';
      case '300-500': return '300–500';
      case '500-1000': return '500–1000';
      case '1000-2000': return '1000–2000';
      case '2000-5000': return '2000–5000';
      case 'more-than-5000': return 'More than 5000';
      default: return option;
    }
  };

  return (
    <Card className="form-card">
      <div className="form-section">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary mb-2">Review Your Application</h2>
          <p className="text-muted-foreground">Please review all your details before final submission</p>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-secondary">Contact Information</h3>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><span className="font-medium">Full Name:</span> {data.fullName}</div>
              <div><span className="font-medium">Shop Name:</span> {data.businessName}</div>
              <div><span className="font-medium">Phone:</span> {data.phoneNumber}</div>
              <div><span className="font-medium">WhatsApp:</span> {data.sameAsPhone ? data.phoneNumber : data.whatsappNumber}</div>
              <div><span className="font-medium">Email:</span> {data.email}</div>
              <div><span className="font-medium">City:</span> {data.city}</div>
              <div className="md:col-span-2"><span className="font-medium">Pickup Address:</span> {formatAddress()}</div>
              <div className="md:col-span-2"><span className="font-medium">Return Address:</span> {data.sameAsPickup ? formatAddress() : data.returnAddress}</div>
            </div>
          </div>

          {/* Supplier Details */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-secondary">Supplier Details</h3>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><span className="font-medium">Supplier Type:</span> {data.supplierType}</div>
              <div><span className="font-medium">Main Category:</span> {data.mainCategory}</div>
              {data.secondaryCategory && (
                <div><span className="font-medium">Secondary Category:</span> {data.secondaryCategory}</div>
              )}
              <div><span className="font-medium">Product Count:</span> {getDisplayValue(data.productCount)}</div>
              <div><span className="font-medium">Stock per Product:</span> {getDisplayValue(data.stockPerProduct)}</div>
              <div><span className="font-medium">Listing Type:</span> {data.listingType}</div>
              <div><span className="font-medium">Experience:</span> {data.experience}</div>
              <div><span className="font-medium">Heard About Us:</span> {data.hearAbout}</div>
            </div>
            {data.sampleImage && (
              <div className="mt-3">
                <Badge variant="secondary">Sample image uploaded</Badge>
              </div>
            )}
          </div>

          {/* Business Verification */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-secondary">Business Verification</h3>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><span className="font-medium">CNIC Number:</span> {data.cnicNumber}</div>
              <div><span className="font-medium">Bank IBAN:</span> {data.bankIban}</div>
              <div><span className="font-medium">Account Title:</span> {data.bankAccountTitle}</div>
              <div><span className="font-medium">NTN Number:</span> {data.ntnNumber}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {data.cnicFront && <Badge variant="secondary">CNIC Front uploaded</Badge>}
              {data.cnicBack && <Badge variant="secondary">CNIC Back uploaded</Badge>}
              {data.chequeImage && <Badge variant="secondary">Cheque uploaded</Badge>}
              {data.taxCertificate && <Badge variant="secondary">TAX Certificate uploaded</Badge>}
              {data.businessLogo && <Badge variant="secondary">Business Logo uploaded</Badge>}
            </div>
          </div>
        </div>

        <div className="bg-accent/20 rounded-lg p-4 border border-accent/30 mt-6">
          <p className="text-sm text-secondary">
            By proceeding, you confirm that all information provided is accurate and you agree to our terms and conditions.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Go Back to Edit
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90">
            Confirm & Proceed to MCQ
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ConfirmationScreen;