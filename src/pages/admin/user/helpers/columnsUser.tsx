import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { Avatar }                               from '@mui/material';
import DateUtils                                from '../../../../services/utils/DateUtils';

const { formatDate, FORMATS_DATE } = DateUtils;

export const ColumnsUser: GridColDef[] = [
  // { field: 'id', headerName: 'ID', flex: 30 },
  // {
  //   type: 'string',
  //   field: 'firstName_',
  //   headerName: 'Avatar',
  //   flex: 40,
  //   renderCell: (params) => {
  //     return (<Avatar>{ params.row.firstName?.split(' ')[0][0] }</Avatar>)
  //   },
  // },
  { field: 'lastName', headerName: 'Nombre', flex: 100,
    renderCell: (params) => {
      return (
        <div className="flex flex-row items-center">
          {/* <Avatar>{ params.row.firstName?.split(' ')[0][0] }</Avatar> */}
          <span> { params.row.firstName } { params.row.lastName }</span>
        </div>
      )
    },
  },
  { field: 'documentNumber', headerName: 'Documento', flex: 80,
    renderCell: (params) => {
      return (<span> <strong> { params.row.documentType?.name }:</strong> { params.row.documentNumber }</span>)
    },
  },
  { field: 'phoneNumber', headerName: 'Teléfono', flex: 65, },
  { field: 'email', headerName: 'Correo Electrónico', flex: 100, },
  { field: 'createdAt', headerName: 'Fecha de Creación', flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return formatDate(params.value, FORMATS_DATE.MM_DD_YYYY);
    },
  },
];
