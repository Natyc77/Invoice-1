import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

const ThankYouPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('thankYouTitle')} - BestInvoiceGenerator.io</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">{t('thankYouTitle')}</h1>
          <p className="text-slate-600 mb-8 text-lg">
            {t('thankYouMessage')}
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/">{t('backToGenerator')}</Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default ThankYouPage;