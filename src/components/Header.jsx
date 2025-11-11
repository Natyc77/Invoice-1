import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import AdPlaceholder from './AdPlaceholder';

const Header = () => {
  const { t } = useTranslation();
  const [hidden, setHidden] = React.useState(false);
  const { scrollY } = useScroll();
  const logoUrl = "https://horizons-cdn.hostinger.com/c97fe8f5-ccbf-4ead-a26b-e078673a0360/45e81f84d41fff7276d18843fffd8bb2.jpg";
  
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="sticky top-0 z-50 w-full bg-slate-100/80 backdrop-blur-lg border-b border-slate-200/80 print-hidden"
    >
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between p-3 px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
               <img src={logoUrl} alt="BestInvoiceGenerator.io logo" className="header-logo" loading="lazy" />
               <span className="text-xl font-bold text-slate-800 hidden sm:block">BestInvoiceGenerator.io</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <Link to="/premium">{t('upgradeToPremium')}</Link>
              </Button>
              <LanguageSwitcher />
            </div>
        </div>
      </div>
       <div className="w-full bg-slate-100/50">
          <AdPlaceholder adSlot="1111111111" className="mx-auto" style={{minHeight: '50px'}}/>
       </div>
    </motion.header>
  );
};

export default Header;