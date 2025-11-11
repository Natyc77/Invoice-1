import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const PremiumSection = () => {
  const { t } = useTranslation();
  const stripeUrl = 'https://buy.stripe.com/test_checkout_placeholder';
  const paypalUrl = 'https://www.paypal.com/checkoutnow?token=TEST_PLACEHOLDER';

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center border-t border-dashed border-slate-300 pt-8 mt-8"
    >
      <p className="text-slate-600 max-w-md mx-auto mb-6">
        {t('premiumHeader')}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={() => openInNewTab(stripeUrl)}
          size="lg"
          className="w-full sm:w-auto text-base font-semibold bg-[#3b82f6] hover:bg-[#2563eb] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40"
        >
          {t('stripeButton')}
        </Button>
        <Button
          onClick={() => openInNewTab(paypalUrl)}
          size="lg"
          className="w-full sm:w-auto text-base font-semibold bg-[#3b82f6] hover:bg-[#2563eb] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40"
        >
          {t('paypalButton')}
        </Button>
      </div>
    </motion.div>
  );
};

export default PremiumSection;