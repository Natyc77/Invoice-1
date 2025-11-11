import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Totals = ({ subtotal, tax, total, taxRate, onTaxRateChange }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="taxRate">{t('taxRate')}</Label>
        <Input
          id="taxRate"
          type="number"
          min="0"
          step="any"
          value={taxRate}
          onChange={(e) => onTaxRateChange(e.target.value)}
          className="mt-1"
          placeholder="0"
        />
      </div>
      <div className="bg-slate-50/50 rounded-md border p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t('subtotal')}</span>
          <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{t('tax')} ({taxRate || 0}%):</span>
          <span className="font-medium text-slate-800">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
          <span className="text-slate-900">{t('total')}</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Totals;