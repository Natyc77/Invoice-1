import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Notes = ({ notes, onNotesChange }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Label htmlFor="notes">{t('notesTitle')}</Label>
      <Textarea
        id="notes"
        placeholder={t('notesPlaceholder')}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="mt-1"
        rows={4}
      />
    </div>
  );
};

export default Notes;