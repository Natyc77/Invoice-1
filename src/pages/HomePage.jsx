
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import InvoiceGenerator from '@/components/InvoiceGenerator';
import Banner from '@/components/Banner';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>BestInvoiceGenerator.io — Free Online Invoice Generator</title>
        <meta name="description" content="Generate elegant invoices online instantly — trusted by businesses globally. Create, export, and send professional PDF invoices for free." />
        <link rel="canonical" href="https://bestinvoicegenerator.io/" />
      </Helmet>
      
      <Banner />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-screen-lg mx-auto px-4"
      >
        <InvoiceGenerator />
      </motion.div>
    </>
  );
};

export default HomePage;
