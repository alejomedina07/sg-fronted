import { useGetUsersQuery }                     from '../redux/api/userApi';
import { SgTable }                              from '../../../../components/table/SgTable';
import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { Avatar }                               from '@mui/material';
import DateUtils                                from '../../../../services/utils/DateUtils';
import { ViewTitle }                            from '../../components/share/title/ViewTitle';
import { SgLink }                               from '../../../../components/form/button/SgLink';


const { formatDate, FORMATS_DATE } = DateUtils;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  {
    type: 'string',
    field: 'firstName_',
    headerName: 'Avatar',
    flex: 40,
    renderCell: (params) => {
      console.log(params.row);
      return (<Avatar>{ params.row.firstName?.split(' ')[0][0] }</Avatar>)
    },
  },
  { field: 'lastName', headerName: 'Nombre', flex: 100,
    renderCell: (params) => {
      return (<span> { params.row.firstName } { params.row.lastName }</span>)
    },
  },
  { field: 'documentNumber', headerName: 'Documento', flex: 100,
    renderCell: (params) => {
      return (<span> <strong> { params.row.documentType?.name }:</strong> { params.row.documentNumber }</span>)
    },
  },
  { field: 'phoneNumber', headerName: 'Teléfono', flex: 100, },
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


export const ListUser = () => {
  const { data, isLoading } = useGetUsersQuery('');

  return (
    <>
      <ViewTitle title="list_users">
        <SgLink label="create_user" to="/admin/users/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
