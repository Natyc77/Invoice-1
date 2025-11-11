import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/components/PageContainer';

const DisclaimerPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('disclaimerTitle')}>
      <Helmet>
        <title>{t('disclaimerTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content="Disclaimer for BestInvoiceGenerator.io. Our tool does not provide legal or financial advice." />
      </Helmet>
      
      <p>The tools and resources on BestInvoiceGenerator.io are provided for informational and business purposes only.</p>
      
      <p>We do not provide legal, accounting, or tax advice. Users are responsible for verifying all invoice information and complying with local tax laws.</p>
      
      <p>We are not liable for any losses resulting from the use of our service.</p>
    </PageContainer>
  );
};

export default DisclaimerPage;