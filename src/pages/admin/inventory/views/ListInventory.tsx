import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { ColumnsInventory } from '../helpers/columnsInventory';
import { useGetInventoryQuery } from '../redux/api/inventoryApi';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { InventoryInOut } from '../components/InventoryInOut';
import useInventory from '../redux/hooks/useInventory';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';

export const ListInventory = () => {
  const { data, isLoading, refetch } = useGetInventoryQuery('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { selectInventoryAction, inventory, isOpenModalInventory } =
    useInventory();

  const onClickInOut = (param: GridRenderCellParams) => {
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
        flex: 80,
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
              <NotesButton
                entityType={CONFIG_CONST.NOTE.ENTITY_INVENTORY}
                entityId={params.row.id}
              />
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
      <div style={{ height: '70vh', width: '100%', minWidth: '700px' }}>
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
