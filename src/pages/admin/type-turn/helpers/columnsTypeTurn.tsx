import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsTypeTurn = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 40 },
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    {
      field: 'typeTurn',
      headerName: `${t('type_turn')}`,
      flex: 100,
      valueGetter: (params: any) => {
        return params.row.typeTurn?.name;
      },
    },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 50,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value == null) {
          return '';
        }
        return params.value ? `${t('active')}` : `${t('inactive')}`;
      },
    },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 100,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
  ];
  return columns;
};
