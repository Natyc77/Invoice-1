import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/components/PageContainer';

const TermsOfUsePage = () => {
  const { t } = useTranslation();
  const currentDate = new Date('2025-11-08');
  const formattedDate = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });


  return (
    <PageContainer title={t('termsOfUseTitle')}>
      <Helmet>
        <title>{t('termsOfUseTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content="Terms of Service for BestInvoiceGenerator.io. By using our service, you agree to these terms." />
      </Helmet>
      
      <p>Effective Date: {formattedDate}</p>

      <p>By using BestInvoiceGenerator.io, you agree to these terms.</p>
      
      <h3>Use of Service</h3>
      <ul>
          <li>The service is provided “as is” for creating invoices and bills of sale.</li>
          <li>You are responsible for the accuracy of data entered and exported.</li>
          <li>Commercial use is allowed, but source code may not be copied or resold.</li>
          <li>All invoice data is stored locally in your browser; we do not have access to it.</li>
      </ul>

      <h3>Payments</h3>
      <ul>
          <li>Premium features are billed via Stripe or PayPal.</li>
          <li>All payments are final and non-refundable except where required by law.</li>
      </ul>

      <h3>Liability</h3>
      <p>We are not responsible for any losses or damages from incorrect data or third-party errors (including payment processors or ads).</p>

      <h3>Changes</h3>
      <p>We may update these terms at any time. Continued use means acceptance.</p>
    </PageContainer>
  );
};

export default TermsOfUsePage;