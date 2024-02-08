import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';
import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager();

export const ColumnsMySurveys = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID', flex: 20 },
    { field: 'name', headerName: `${t('name')}`, flex: 70 },
    {
      field: 'description',
      headerName: `${t('description')}`,
      flex: 100,
    },
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 70,
      renderCell: (params) => {
        return <span> {params.row?.status ? t('active') : t('inactive')}</span>;
      },
    },
    {
      field: 'anonymous',
      headerName: `${t('anonymous')}`,
      flex: 70,
      renderCell: (params) => {
        return <span> {params.row?.anonymous ? t('yes') : t('no')}</span>;
      },
    },
    {
      field: 'allUsers',
      headerName: `${t('allUsers')}`,
      flex: 70,
      renderCell: (params) => {
        return <span> {params.row?.allUsers ? t('yes') : t('no')}</span>;
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
