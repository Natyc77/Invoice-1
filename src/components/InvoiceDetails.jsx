import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InvoiceDetails = ({ data, onDataChange }) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <Label htmlFor="invoiceNumber">{t('invoiceNumber')}</Label>
        <Input
          id="invoiceNumber"
          placeholder="INV-001"
          value={data.invoiceNumber}
          onChange={(e) => onDataChange('invoiceNumber', e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="invoiceDate">{t('invoiceDate')}</Label>
        <Input
          id="invoiceDate"
          type="date"
          value={data.invoiceDate}
          onChange={(e) => onDataChange('invoiceDate', e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="dueDate">{t('dueDate')}</Label>
        <Input
          id="dueDate"
          type="date"
          value={data.dueDate}
          onChange={(e) => onDataChange('dueDate', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default InvoiceDetails;