import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { Avatar }                               from '@mui/material';
import { t }                                    from 'i18next';
import DateFnsManager                           from '../../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager()

export const ColumnsUser: GridColDef[] = [
  { field: 'lastName', headerName: `${t('name') || ''}`, flex: 100,
    renderCell: (params) => {
      return (
        <div className="flex flex-row items-center">
          <Avatar>{ params.row.firstName?.split(' ')[0][0] }</Avatar>
          <span className="ml-2"> { params.row.firstName } { params.row.lastName }</span>
        </div>
      )
    },
  },
  { field: 'documentNumber', headerName: `${t('document_number')}`, flex: 80,
    renderCell: (params) => {
      return (<span> <strong> { params.row.documentType?.name }:</strong> { params.row.documentNumber }</span>)
    },
  },
  { field: 'phoneNumber', headerName: `${t('phone_number') || ''}`, flex: 65, },
  { field: 'email', headerName: `${t('email')  || ''}`, flex: 100, },
  { field: 'createdAt', headerName: `${t('created_at') || ''}`, flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return dateManage.getFormatStandard(new Date(params.value));
    },
  },
];
