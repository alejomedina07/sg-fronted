import { ColumnsTypeTurn } from '../helpers';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { GridColDef } from '@mui/x-data-grid';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { useGetTurnTypesQuery } from '../../turn/redux/api/turnApi';
import { FormTypeTurn } from '../components/FormTypeTurn';
import { SgButton } from '../../../../components/form/button/SgButton';

export const TypeTurnList = () => {
  const { t, i18n } = useTranslation();
  const columnsTypeTurn = ColumnsTypeTurn();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [typeTurn, setTypeTurn] = useState<any>();
  const { data, isLoading } = useGetTurnTypesQuery(openForm);

  const handleEdit = (params: any) => {
    setTypeTurn(params.row);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setTypeTurn(null);
  };

  useEffect(() => {
    setColumns([
      ...columnsTypeTurn,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 100,
        minWidth: 150,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() => handleEdit(params)}
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <NotesButton
                entityType={CONFIG_CONST.NOTE.ENTITY_TYPE_TURN}
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
      <ViewTitle title={t('list_room')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenForm(true)}
          label={t('create_room')}
        />
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
        <FormTypeTurn
          typeTurn={typeTurn}
          open={openForm}
          handleClose={handleClose}
        />
      </div>
    </>
  );
};
