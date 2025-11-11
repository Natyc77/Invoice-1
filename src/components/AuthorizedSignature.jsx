import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';

const AuthorizedSignature = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Label htmlFor="authorizedSignature">{t('authorizedSignature')}</Label>
      <div className="mt-6 h-16 border-b border-slate-300 w-full sm:w-1/2 md:w-1/3"></div>
      <p className="text-xs text-slate-500 mt-1">{t('signAbove')}</p>
    </div>
  );
};

export default AuthorizedSignature;