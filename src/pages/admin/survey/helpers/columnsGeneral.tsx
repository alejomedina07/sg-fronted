import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';
import { GridValueFormatterParams } from '@mui/x-data-grid';

export const ColumnsGeneral = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 50 },
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 50,
      valueFormatter: (params: GridValueFormatterParams) => {
        // Assuming params.value is of type string
        if (params.value == null) {
          return '';
        }
        return params.value ? `${t('active')}` : `${t('inactive')}`;
      },
    },
  ];
  return columns;
};
