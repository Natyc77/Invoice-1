import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

const ItemsTable = ({ items, onItemChange, addItem, removeItem }) => {
  const { t } = useTranslation();
  const handleItemChange = (index, field, value) => {
    onItemChange('items', { [field]: value }, index);
  };
  
  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{t('itemsServices')}</h3>
        <Button
          onClick={addItem}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('addItem')}
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="hidden sm:grid grid-cols-12 gap-3 px-4">
            <Label className="col-span-5 text-xs font-medium text-slate-500">{t('description')}</Label>
            <Label className="col-span-2 text-xs font-medium text-slate-500">{t('quantity')}</Label>
            <Label className="col-span-2 text-xs font-medium text-slate-500">{t('rate')}</Label>
            <Label className="col-span-2 text-xs font-medium text-slate-500">{t('amount')}</Label>
        </div>
        {items.map((item, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-2 sm:p-4 bg-slate-50/50 rounded-md border"
          >
            <div className="sm:col-span-5">
              <Label htmlFor={`desc-${index}`} className="text-xs sm:hidden">{t('description')}</Label>
              <Input
                id={`desc-${index}`}
                placeholder="Item or service description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`qty-${index}`} className="text-xs sm:hidden">{t('quantity')}</Label>
              <Input
                id={`qty-${index}`}
                type="number"
                min="0"
                step="any"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor={`rate-${index}`} className="text-xs sm:hidden">{t('rate')}</Label>
              <Input
                id={`rate-${index}`}
                type="number"
                min="0"
                step="any"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs sm:hidden">{t('amount')}</Label>
              <div className="mt-1 h-10 flex items-center font-semibold text-slate-800">
                ${item.amount.toFixed(2)}
              </div>
            </div>
            <div className="sm:col-span-1 flex items-end justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
                className="text-red-500 hover:text-red-600 hover:bg-red-50/50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ItemsTable;