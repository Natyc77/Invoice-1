
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AdPlaceholder from '@/components/AdPlaceholder';

const Banner = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-50 py-4 px-4 max-h-[120px] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <img alt="Invoice icon logo" className="h-12 w-12" src="https://images.unsplash.com/photo-1678993437662-d6acc3bf4d5d" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              BestInvoiceGenerator.io
            </h1>
            <p className="text-lg text-slate-600 mt-1">
              Generate elegant invoices in seconds — trusted by businesses globally.
            </p>
          </div>
        </div>
        <div className="mt-4 w-full">
            <AdPlaceholder adSlot="2222222222" className="mx-auto top-ad-banner" />
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
