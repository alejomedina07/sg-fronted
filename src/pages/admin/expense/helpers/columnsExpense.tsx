import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';
import { useTranslation } from 'react-i18next';

const dateManage = new DateFnsManager();

export const ColumnsExpense = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 50 },
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
    { field: 'amount', headerName: `${t('amount')}`, flex: 70 },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 70,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'createBy',
      headerName: `${t('created_by')}`,
      flex: 70,
      renderCell: (params) => {
        return (
          <span>
            {' '}
            {params.row.createdBy.firstName} {params.row.createdBy.lastName}
          </span>
        );
      },
    },
  ];
  return columns;
};
