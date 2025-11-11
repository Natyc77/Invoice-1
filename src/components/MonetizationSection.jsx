import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const MonetizationSection = () => {
    const { t } = useTranslation();
    const stripeUrl = 'https://buy.stripe.com/test_checkout_placeholder';
    const paypalUrl = 'https://www.paypal.com/checkoutnow?token=TEST_PLACEHOLDER';

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t pt-8 mt-12"
        >
            <h3 className="text-center text-2xl font-bold text-slate-800 mb-2">
                {t('unlockFullPotential')}
            </h3>
            <p className="text-center text-slate-500 mb-6">
                {t('upgradeToPremiumToday')}
            </p>
            <div className="flex items-center justify-center flex-wrap gap-4 mt-6">
                <Button
                    onClick={() => openInNewTab(stripeUrl)}
                    aria-label="Pay with Stripe"
                    className="payment-button stripe-button"
                >
                    Stripe
                </Button>
                <Button
                    onClick={() => openInNewTab(paypalUrl)}
                    aria-label="Pay with PayPal"
                    className="payment-button paypal-button"
                >
                    PayPal
                </Button>
            </div>
            <div className="payment-trust print-hidden mt-6">
                <p className="text-center text-sm text-slate-500 mb-2">Secure payments powered by:</p>
                <div className="payment-icons flex justify-center items-center gap-3">
                    <img src="/public/icons/stripe.svg" alt="Stripe logo" height="28" className="powered-by-logo" />
                    <img src="/public/icons/paypal.svg" alt="PayPal logo" height="28" className="powered-by-logo" />
                </div>
            </div>
        </motion.div>
    );
};

export default MonetizationSection;