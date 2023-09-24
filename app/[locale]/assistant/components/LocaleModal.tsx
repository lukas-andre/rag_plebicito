import { useChangeLocale, useI18n } from '@/locales/client';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const t = useI18n();
  const changeLocale = useChangeLocale();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='z-10 rounded-lg bg-white p-4 shadow-xl'>
        <h2 className='mb-4 text-lg font-semibold'>{t('select_language')}</h2>
        <button
          onClick={() => {
            changeLocale('en');
            onClose();
          }}
          className='block w-full rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
        >
          {t('english')}
        </button>
        <button
          onClick={() => {
            changeLocale('es');
            onClose();
          }}
          className='mt-2 block w-full rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
        >
          {t('spanish')}
        </button>
        <button
          onClick={onClose}
          className='mt-4 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300'
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}
