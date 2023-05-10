import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgTable } from '../../../../components/table/SgTable';
import { ColumnsInventory } from '../helpers/columnsInventory';
import { useGetInventoryQuery } from '../redux/api/inventoryApi';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { InventoryInOut } from '../components/InventoryInOut';
import useInventory from '../redux/hooks/useInventory';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const ListInventory = () => {
  const { data, isLoading, refetch } = useGetInventoryQuery('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { selectInventoryAction, inventory, isOpenModalInventory } =
    useInventory();

  const onClickInOut = (param: GridRenderCellParams) => {
    console.log(param);
    selectInventoryAction({
      inventory: param.row,
      isOpenModalInventory: true,
      refresh: refetch,
    });
  };

  const columnsInventory = ColumnsInventory();

  useEffect(() => {
    setColumns([
      ...columnsInventory,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() =>
                    navigate(`/admin/inventory/edit/${params.row.id}`)
                  }
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('service')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClickInOut(params)}
                  aria-label="view"
                >
                  <CompareArrowsIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_inventory')}>
        <SgLink label={t('create_inventory')} to="/admin/inventory/create" />
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
      {inventory?.id && isOpenModalInventory && <InventoryInOut />}
    </>
  );
};
