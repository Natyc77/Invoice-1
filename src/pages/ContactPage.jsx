import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/components/PageContainer';
import { Mail, Globe } from 'lucide-react';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('contactTitle')}>
      <Helmet>
        <title>{t('contactTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content="Contact us at BestInvoiceGenerator.io. We welcome your feedback and questions." />
      </Helmet>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{t('contactFormHeader')}</h2>
        <div className="space-y-4 text-lg">
            <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-slate-500" />
                <a href={`mailto:${t('contactEmail')}`} className="text-primary hover:underline">
                    {t('contactEmail')}
                </a>
            </div>
            <div className="flex items-center justify-center gap-3">
                <Globe className="h-5 w-5 text-slate-500" />
                <a href={t('contactWebsite')} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {t('contactWebsite')}
                </a>
            </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ContactPage;