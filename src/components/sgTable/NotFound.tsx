import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center w-full !h-full container items-center justify-center h-40">
        <TroubleshootIcon sx={{ fontSize: 80 }}></TroubleshootIcon>
        <br />
        <span>{t('not_found_message')}</span>
      </div>
    </>
  );
};
