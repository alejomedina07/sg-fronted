import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { t } from 'i18next';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsCustomer = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'bloodType', headerName: `${t('blood_type')}`, flex: 70 },
    {
      field: 'document',
      headerName: `${t('document_number')}`,
      flex: 100,
      renderCell: (params) => {
        return (
          <span>
            <strong> {params.row?.documentType?.name || ''}:</strong>{' '}
            {params.row.document}
          </span>
        );
      },
    },
    {
      field: 'phoneNumber',
      headerName: `${t('phone_number')}`,
      flex: 70,
    },
    {
      field: 'address',
      headerName: `${t('address')}`,
      flex: 100,
      // editable: true,
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
