import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

export const ColumnsOptions = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 100 },
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 100,

      valueFormatter: (params: GridValueFormatterParams<boolean>) => {
        if (params.value == null) {
          return '';
        }
        return params.value ? `${t('active')}` : `${t('inactive')}`;
      },
    },
  ];
  return columns;
};
