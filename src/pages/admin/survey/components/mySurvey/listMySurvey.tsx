import UseAuth from '../../../../public/auth/redux/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useGetMySurveysQuery } from '../../redux/api/surveyApi';
import { ColumnsMySurveys } from '../../helpers/columnsMySurveys';
import { useTranslation } from 'react-i18next';
import { Dialog, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SgTable } from '../../../../../components/table/SgTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ViewAnswer } from './answer/viewAnswer';

export const ListMySurvey = () => {
  const { userConnected } = UseAuth();
  const [idUser, setIdUser] = useState<number | undefined>(undefined);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [surveys, setSurveys] = useState();
  const [openView, setOpenView] = useState<boolean>(false);
  const [surveySelected, setSurveySelected] = useState();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setIdUser(userConnected.id);
  }, [userConnected]);

  const { data, isLoading } = useGetMySurveysQuery(
    { idUser: idUser || 0, list: true },
    { skip: !idUser }
  );

  useEffect(() => {
    if (data?.data)
      setSurveys(
        data.data.map((item: any) => {
          return { idSurveyAnswer: item.id, ...item.survey };
        })
      );
  }, [data]);

  const columnsMySurveys = ColumnsMySurveys();

  const handleClick = (params: GridRenderCellParams) => {
    setSurveySelected(params.row);
    setOpenView(true);
  };
  const handleClose = () => {
    setSurveySelected(undefined);
    setOpenView(false);
  };

  useEffect(() => {
    setColumns([
      ...columnsMySurveys,
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
                  onClick={() => handleClick(params)}
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              {/* <NotesButton */}
              {/*   entityType={CONFIG_CONST.NOTE.ENTITY_CUSTOMER} */}
              {/*   entityId={params.row.id} */}
              {/* /> */}
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <div
        style={{
          height: '70vh',
          width: '100%',
          minWidth: '700px',
        }}
      >
        <SgTable
          columns={columns}
          data={surveys || []}
          // data={data?.data || []}
          // onRowDoubleClick={handleRowDoubleClick}
          isLoading={isLoading}
        />
      </div>
      <Dialog open={openView} onClose={handleClose}>
        <ViewAnswer
          survey={surveySelected}
          open={openView}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
};
