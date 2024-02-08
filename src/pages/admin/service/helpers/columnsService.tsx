import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsService = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID', flex: 30 },
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
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 70,
      // filterParams: {
      //   valueGetter: (params: GridValueGetterParams) => {
      //     return params.row.status.name;
      //   },
      // },
      renderCell: (params) => {
        return <span> {params.row?.status?.name || ''}</span>;
      },
    },
    // {
    //   field: 'status',
    //   headerName: `${t('status')}`,
    //   flex: 70,
    //   filterParams: {
    //     valueGetter: (params: any) => {
    //       return params.data.status.name;
    //     },
    //   },
    //   renderCell: (params) => {
    //     return <span> {params.row?.status?.name || ''}</span>;
    //   },
    // },
    {
      field: 'type',
      headerName: `${t('type')}`,
      flex: 70,
      renderCell: (params) => {
        // TODO cambio en el backend
        return <span> {params.row?.type?.name || ''}</span>;
      },
    },
    { field: 'amount', headerName: `${t('amount')}`, flex: 70 },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
  ];
  return columns;
};
