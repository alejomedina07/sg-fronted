import { ColumnsProvider } from '../helpers';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { useGetProvidersQuery } from '../redux/api/providerApi';
import { useNavigate } from 'react-router-dom';
import { SgLink } from '../../../../components/form/button/SgLink';
import AddCardIcon from '@mui/icons-material/AddCard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { FormPaymentDialog } from '../components/payment/FormPaymentDialog';
import { FormAccountPayableDialog } from '../components/accountPayable/FormAccountPayableDialog';

export const ListProvider = () => {
  const { t, i18n } = useTranslation();
  const columnsProviders = ColumnsProvider();
  const navigate = useNavigate();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [openAccountPayable, setOpenAccountPayable] = useState(false);
  const [providerSelected, setProviderSelected] = useState<any>();
  const [openPayment, setOpenPayment] = useState(false);
  const { data, isLoading } = useGetProvidersQuery('?list=false');

  const handleAccountPayable = (params: GridRenderCellParams) => {
    setProviderSelected(params.row);
    setOpenAccountPayable(true);
  };

  const handlePayment = (params: GridRenderCellParams) => {
    setProviderSelected(params.row);
    setOpenPayment(true);
  };

  const handleClose = () => {
    setProviderSelected(null);
    setOpenAccountPayable(false);
    setOpenPayment(false);
  };

  useEffect(() => {
    setColumns([
      {
        field: 'note',
        headerName: `${t('notes')}`,
        flex: 30,
        renderCell: (params) => {
          return (
            <NotesButton
              entityType={CONFIG_CONST.NOTE.ENTITY_PROVIDER}
              entityId={params.row.id}
            />
          );
        },
      },
      ...columnsProviders,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <SpeedDial
                FabProps={{ size: 'small' }}
                direction="left"
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', right: 35 }}
                icon={<SpeedDialIcon />}
              >
                <SpeedDialAction
                  onClick={() =>
                    navigate(`/admin/providers/edit/${params.row.id}`)
                  }
                  icon={<VisibilityIcon />}
                  tooltipTitle={t('edit')}
                />
                {/* <SpeedDialAction */}
                {/*   onClick={() => navigate(`/admin/providers/edit/${params.row.id}`)} */}
                {/*   icon={<VisibilityIcon />} */}
                {/*   tooltipTitle={t('view')} */}
                {/* /> */}
                <SpeedDialAction
                  onClick={() => handleAccountPayable(params)}
                  icon={<AddCardIcon />}
                  tooltipTitle={t('account_payable')}
                />
                <SpeedDialAction
                  onClick={() => handlePayment(params)}
                  icon={<PriceCheckIcon />}
                  tooltipTitle={t('payment')}
                />
              </SpeedDial>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_providers')}>
        <SgLink label={t('create_provider')} to="/admin/providers/create" />
      </ViewTitle>
      <div
        style={{
          height: '70vh',
          width: '100%',
          minWidth: '700px',
        }}
      >
        <SgTable
          columns={columns}
          data={data?.data || []}
          // onRowDoubleClick={handleRowDoubleClick}
          isLoading={isLoading}
        />
      </div>
      <FormPaymentDialog
        provider={providerSelected}
        open={openPayment}
        handleClose={handleClose}
      />
      <FormAccountPayableDialog
        provider={providerSelected}
        open={openAccountPayable}
        handleClose={handleClose}
      />
    </>
  );
};
