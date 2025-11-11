import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/PageContainer';

const PremiumPage = () => {
  const { t } = useTranslation();
  const stripeUrl = 'https://buy.stripe.com/test_checkout_placeholder';
  const paypalUrl = 'https://www.paypal.com/checkoutnow?token=TEST_PLACEHOLDER';

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const features = [
    t('featureRemoveAds'),
    t('featureExtraTemplates'),
    t('featureCustomBranding'),
    t('featurePrioritySupport'),
  ];

  return (
    <>
      <Helmet>
        <title>{t('premiumTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content={t('premiumSubheader')} />
      </Helmet>
      <PageContainer title={t('premiumHeader')}>
        <div className="text-center">
            <p className="text-xl text-slate-600 mb-8">{t('premiumSubheader')}</p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('premiumFeaturesTitle')}</h3>
                <ul className="space-y-3 text-left">
                    {features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-slate-700">{feature}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => openInNewTab(stripeUrl)}
                size="lg"
                className="w-full sm:w-auto text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/40"
              >
                {t('payWithStripe')}
              </Button>
              <Button
                onClick={() => openInNewTab(paypalUrl)}
                size="lg"
                className="w-full sm:w-auto text-base font-semibold bg-blue-800 hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/40"
              >
                {t('payWithPayPal')}
              </Button>
            </div>
        </div>
      </PageContainer>
    </>
  );
};

export default PremiumPage;