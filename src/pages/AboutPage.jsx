import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/components/PageContainer';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t('aboutTitle')}>
      <Helmet>
        <title>{t('aboutTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content="Learn about BestInvoiceGenerator.io, a free tool designed to help freelancers and small businesses create professional invoices." />
      </Helmet>
      
      <p>BestInvoiceGenerator.io is a free online tool for creating professional PDF invoices instantly.</p>
      <p>We help freelancers and small businesses streamline billing with customizable templates, automatic totals, and quick exports.</p>
      <p>Our goal: make invoicing elegant, fast, and effortless.</p>
    </PageContainer>
  );
};

export default AboutPage;