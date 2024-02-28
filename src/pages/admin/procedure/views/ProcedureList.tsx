import { ColumnsProcedure } from '../helpers';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { GridColDef } from '@mui/x-data-grid';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { useGetProceduresQuery } from '../redux/api/procedureApi';
import { FormProcedure } from '../components/FormProcedure';
import { SgButton } from '../../../../components/form/button/SgButton';
import { AssignProcedure } from '../components/AssignProcedure';

export const ProcedureList = () => {
  const { t, i18n } = useTranslation();
  const columnsProcedure = ColumnsProcedure();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [procedure, setProcedure] = useState<any>();
  const { data, isLoading } = useGetProceduresQuery(openForm);

  const handleAssign = (params: any) => {
    setProcedure(params.row);
    setOpenAssign(true);
  };

  const handleEdit = (params: any) => {
    console.log(params);
    setProcedure(params.row);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setOpenAssign(false);
    setProcedure(null);
  };

  useEffect(() => {
    setColumns([
      ...columnsProcedure,
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
                entityType={CONFIG_CONST.NOTE.ENTITY_PROCEDURE}
                entityId={params.row.id}
              />
              {!!params.row.parent && (
                <Tooltip title={t('assign')} placement="bottom" arrow>
                  <IconButton
                    onClick={() => handleAssign(params)}
                    aria-label="view"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_procedures')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenForm(true)}
          label={t('create_procedure')}
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
        <FormProcedure
          procedure={procedure}
          open={openForm}
          handleClose={handleClose}
        />
        <AssignProcedure
          procedure={procedure}
          allProcedures={data?.data}
          open={openAssign}
          handleClose={handleClose}
          columnsProcedure={columnsProcedure}
        />
      </div>
    </>
  );
};
