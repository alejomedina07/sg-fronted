import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgTable } from '../../../../components/table/SgTable';
import { ColumnsCustomer } from '../helpers';
import { useGetCustomersQuery } from '../redux/api/customerApi';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import useForms from '../../../../store/hooks/form/useForms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useService from '../../service/redux/hooks/useService';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NotesButton } from '../../components/notes/components/NotesButton';

export const ListCustomer = () => {
  const { data, isLoading, refetch } = useGetCustomersQuery('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { openModalServiceAction, selectCustomerAction } = useService();

  const onClicService = (params: GridRenderCellParams) => {
    openModalServiceAction({});
    selectCustomerAction(params.row);
  };

  const onClickAppointment = (params: GridRenderCellParams) => {};

  const columnsCustomer = ColumnsCustomer();

  useEffect(() => {
    setColumns([
      ...columnsCustomer,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 100,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() =>
                    navigate(`/admin/customer/edit/${params.row.id}`)
                  }
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('service')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClicService(params)}
                  aria-label="view"
                >
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('appointment')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClickAppointment(params)}
                  aria-label="view"
                >
                  <CalendarMonthIcon />
                </IconButton>
              </Tooltip>
              <NotesButton keyProp="customerId" id={params.row.id} />
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_customer')}>
        <SgLink label={t('create_customer')} to="/admin/customer/create" />
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          // onRowDoubleClick={handleRowDoubleClick}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
