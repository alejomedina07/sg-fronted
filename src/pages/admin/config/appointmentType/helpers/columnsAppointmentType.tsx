import { GridColDef } from '@mui/x-data-grid';
import { t } from 'i18next';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsAppointmentType = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 100 },
    {
      field: 'status',
      headerName: `${t('status')}`,
      flex: 30,
      renderCell: (params) => {
        return (
          <span> {params.row.status == true ? 'Activo' : 'Inactivo'} </span>
        );
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
  ];
  return columns;
};
