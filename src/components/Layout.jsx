import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import AdPlaceholder from '@/components/AdPlaceholder';

const Layout = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { to: '/privacy', label: t('privacyPolicyTitle') },
    { to: '/terms', label: t('termsOfUseTitle') },
    { to: '/disclaimer', label: t('disclaimerTitle') },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center py-8 bg-slate-100 print-hidden"
      >
        <div className="mb-6 px-4">
          <div className="flex flex-col items-center">
            <AdPlaceholder adSlot="3333333333" className="mx-auto" style={{minHeight: '90px'}}/>
            <span className="text-xs text-slate-400 mt-1">Advertisement</span>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4 px-4">
          {footerLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-sm text-slate-600 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-500 px-4">
          {t('footerText')}
        </p>
      </motion.footer>
    </div>
  );
};

export default Layout;