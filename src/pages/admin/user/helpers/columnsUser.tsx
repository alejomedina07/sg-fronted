import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

const dateManage = new DateFnsManager();

export const ColumnsUser = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    {
      field: 'firstName',
      headerName: t('name'),
      flex: 100,
      valueGetter: (params: any) => {
        return params.row.firstName + ' ' + params.row.lastName;
      },
      // renderCell: (params) => {
      //   const chart = params.value?.split(' ')[0][0] || 'A';
      //   return (
      //     <div className="flex flex-row items-center">
      //       <Avatar>{chart}</Avatar>
      //       <span className="ml-2">
      //         {params.row.firstName} {params.row.lastName}
      //       </span>
      //     </div>
      //   );
      // },
    },
    {
      field: 'documentNumber',
      headerName: t('document_number'),
      flex: 80,
      renderCell: (params) => {
        return (
          <span>
            <strong> {params.row.documentType?.name}:</strong>{' '}
            {params.row.documentNumber}
          </span>
        );
      },
    },
    {
      field: 'phoneNumber',
      headerName: t('phone_number'),
      flex: 65,
    },
    { field: 'email', headerName: t('email'), flex: 100 },
    {
      field: 'createdAt',
      headerName: t('created_at'),
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
