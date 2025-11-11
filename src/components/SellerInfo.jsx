import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

const SellerInfo = ({ data, onDataChange }) => {
  const { t } = useTranslation();
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDataChange('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onDataChange('logo', null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('fromSeller')}</h3>
      <div className="space-y-4">
        <div>
          <Label>{t('companyLogo')}</Label>
          <div className="mt-1 flex items-center gap-4">
            {data.logo ? (
              <div className="relative">
                <img src={data.logo} alt="Company Logo" className="h-16 w-auto max-w-xs rounded-md object-contain bg-slate-100 p-1 border" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-200 hover:bg-slate-300"
                  onClick={removeLogo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline">
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('upload')}
                  <Input id="logo-upload" type="file" className="sr-only" accept="image/*" onChange={handleLogoUpload} />
                </Label>
              </Button>
            )}
            <p className="text-xs text-slate-500">{t('uploadLogoPrompt')}</p>
          </div>
        </div>

        <div>
          <Label htmlFor="fromCompany">{t('yourName')}</Label>
          <Input
            id="fromCompany"
            placeholder="Your Company"
            value={data.fromCompany}
            onChange={(e) => onDataChange('fromCompany', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fromAddress">{t('address')}</Label>
          <Textarea
            id="fromAddress"
            placeholder="Street, City, ZIP Code"
            value={data.fromAddress}
            onChange={(e) => onDataChange('fromAddress', e.target.value)}
            className="mt-1"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="fromTaxId">{t('taxId')}</Label>
          <Input
            id="fromTaxId"
            placeholder="Your Tax ID"
            value={data.fromTaxId}
            onChange={(e) => onDataChange('fromTaxId', e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">{t('taxIdOptional')}</p>
        </div>
        <div>
          <Label htmlFor="fromEmail">{t('email')}</Label>
          <Input
            id="fromEmail"
            type="email"
            placeholder="your@email.com"
            value={data.fromEmail}
            onChange={(e) => onDataChange('fromEmail', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fromPhone">{t('phone')}</Label>
          <Input
            id="fromPhone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.fromPhone}
            onChange={(e) => onDataChange('fromPhone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;