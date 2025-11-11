import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/components/PageContainer';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const currentDate = new Date('2025-11-08');
  const formattedDate = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <PageContainer title={t('privacyPolicyTitle')}>
      <Helmet>
        <title>{t('privacyPolicyTitle')} | BestInvoiceGenerator.io</title>
        <meta name="description" content="Privacy Policy for BestInvoiceGenerator.io. Learn how we handle your data and respect your privacy." />
      </Helmet>
      
      <p>Last updated: {formattedDate}</p>

      <p>At BestInvoiceGenerator.io, we value your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
      
      <h3>Information We Collect</h3>
      <ul>
        <li><strong>Personal Data:</strong> When you contact us or use our premium features, we may collect your name, email, or payment details (processed securely through Stripe or PayPal).</li>
        <li><strong>Usage Data:</strong> Includes browser type, device information, pages visited, and time spent on the site.</li>
        <li><strong>Invoice Data:</strong> All data you enter into the invoice form is stored locally in your browser's localStorage and is never transmitted to our servers.</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Process payments securely.</li>
        <li>Send updates or promotional emails (if you consent).</li>
        <li>Comply with legal requirements.</li>
      </ul>

      <h3>Cookies</h3>
      <p>We use cookies to enhance your experience and serve personalized ads via Google AdSense. You may disable cookies in your browser settings.</p>
      
      <h3>Data Protection</h3>
      <p>Your data is encrypted and stored securely. Payment info is never stored on our servers — it is handled by trusted third-party providers (Stripe & PayPal).</p>
      
      <h3>Google AdSense</h3>
      <p>We use Google AdSense for monetization. AdSense may use cookies/web beacons to serve ads based on your visit. Learn more: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></p>

      <h3>Contact Us</h3>
      <p>Email: support@bestinvoicegenerator.io</p>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;