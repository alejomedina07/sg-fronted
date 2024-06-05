import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetBannersQuery } from '../redux/api/bannerApi';
import { ColumnsBanner } from '../helpers/columnsBanner';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { useTranslation } from 'react-i18next';
import { NotesButton } from '../../components/notes/components/NotesButton';

import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { FormBanner } from '../components/FormBanner';
import { SgButton } from '../../../../components/form/button/SgButton';
import { Banner } from '../dto/banner';

export const ListBannerView = () => {
  const [add, setAdd] = useState(false);
  const { data, isLoading } = useGetBannersQuery(add);
  const [bannerSelected, setBannerSelected] = useState<Banner>();

  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const onClickView = (params: GridRenderCellParams) => {
    console.log(params);
    setBannerSelected(params.row);
    setAdd(true);
  };

  const columnsBanner = ColumnsBanner();

  useEffect(() => {
    setColumns([
      ...columnsBanner,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClickView(params)}
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <NotesButton
                entityType={CONFIG_CONST.NOTE.ENTITY_USER}
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
      <ViewTitle title={t('list_banner')}>
        {add && (
          <SgButton
            variant="outlined"
            color="primary"
            classes="!mr-4"
            onClickAction={() => setAdd(false)}
            label={t('cancel')}
          />
        )}
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setAdd(true)}
          label={t('create_banner')}
        />
      </ViewTitle>
      {add && <FormBanner banner={bannerSelected} setAdd={setAdd} />}

      <div style={{ height: '70vh', width: '100%', minWidth: '800px' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
