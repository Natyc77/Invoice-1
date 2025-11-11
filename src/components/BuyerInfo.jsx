import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const BuyerInfo = ({ data, onDataChange }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-slate-800">{t('toBuyer')}</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="toCompany">{t('clientName')}</Label>
          <Input
            id="toCompany"
            placeholder="Client's Name or Company"
            value={data.toCompany}
            onChange={(e) => onDataChange('toCompany', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="toAddress">{t('address')}</Label>
          <Textarea
            id="toAddress"
            placeholder="Street, City, ZIP Code"
            value={data.toAddress}
            onChange={(e) => onDataChange('toAddress', e.target.value)}
            className="mt-1"
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="toEmail">{t('email')}</Label>
          <Input
            id="toEmail"
            type="email"
            placeholder="client@email.com"
            value={data.toEmail}
            onChange={(e) => onDataChange('toEmail', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="toPhone">{t('phone')}</Label>
          <Input
            id="toPhone"
            type="tel"
            placeholder="+1 (555) 987-6543"
            value={data.toPhone}
            onChange={(e) => onDataChange('toPhone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo;