import { GridColDef } from '@mui/x-data-grid';
import { t } from 'i18next';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsInventory = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 30 },
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
    { field: 'quantity', headerName: `${t('quantity')}`, flex: 40 },
    {
      field: 'statusId',
      headerName: `${t('status')}`,
      flex: 50,
      renderCell: (params) => {
        return <span> {params.row.status.name} </span>;
      },
    },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 70,
      renderCell: (params) => {
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'create_by',
      headerName: `${t('created_by')}`,
      flex: 70,
      renderCell: (params) => {
        return (
          <span>
            {params.row.createdBy.firstName} {params.row.createdBy.lastName}
          </span>
        );
      },
    },
  ];

  return columns;
};
