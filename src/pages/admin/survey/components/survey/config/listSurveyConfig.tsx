import { SgButton } from '../../../../../../components/form/button/SgButton';
import {
  Dialog,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import { FormSurveyConfig } from './formSurveyConfig';
import { ViewTitle } from '../../../../components/share/title/ViewTitle';
import React, { useEffect, useRef, useState } from 'react';
import { ColumnsGeneral } from '../../../helpers/columnsGeneral';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import { SgTable } from '../../../../../../components/sgTable/SgTable';
import { useGetSurveyQuery } from '../../../redux/api/surveyApi';
import { FormAssignSurvey } from '../../assign/FormAssignSurvey';
import { ViewAnswer } from '../../mySurvey/answer/viewAnswer';
import { Environment } from '../../../../../../utils/env/Environment';
import useSnackbar from '../../../../../../store/hooks/notifications/snackbar/useSnackbar';

interface ListSurveyComponentProps {
  categories: any;
}

const env = new Environment();

export const ListSurveyConfig = (props: ListSurveyComponentProps) => {
  const { categories } = props;
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { t, i18n } = useTranslation();
  const [openSurvey, setOpenSurvey] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openView, setOpenView] = useState(false);
  const { data, isLoading } = useGetSurveyQuery(openSurvey);
  const [survey, setSurvey] = useState<any>();
  const columnsGeneral = ColumnsGeneral();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { openSnackbarAction } = useSnackbar();

  const copyToClipboard = async (idSurvey: any) => {
    try {
      if (textAreaRef.current) {
        await navigator.clipboard.writeText(
          `${env.baseUrlFront}/survey/${idSurvey}`
        );
      }
    } catch (error) {
      console.error('Error al copiar al portapapeles', error);
    }
  };

  const onClickView = (params: GridRenderCellParams) => {
    setSurvey(params.row);
    setOpenView(true);
  };

  const onClickEdit = (params: GridRenderCellParams) => {
    setSurvey(params.row);
    setOpenSurvey(true);
  };

  const handleAssign = (params: GridRenderCellParams) => {
    setSurvey(params);
    setOpenAssign(true);
  };

  const [validateAfterDelay, setValidateAfterDelay] = useState<boolean>(false);
  const [rowClicked, setRowClicked] = useState<any>(null);

  const onCellClick = (params: any) => {
    setTimeout(() => {
      setValidateAfterDelay(true);
    }, 500);
    setRowClicked(params.row);
    // if (!openView && !openSurvey && !openAssign) {
    //   if (params.row.anonymous) window.open(`/survey/${params.id}`, '_blank');
    //   else
    //     openSnackbarAction({
    //       message: `${t('error_survey_anonymous')}`,
    //       type: 'error',
    //     });
    // }
  };

  useEffect(() => {
    if (validateAfterDelay) {
      if (!openView && !openSurvey && !openAssign) {
        if (rowClicked.anonymous)
          window.open(`/survey/${rowClicked.id}`, '_blank');
        else
          openSnackbarAction({
            message: `${t('error_survey_anonymous')}`,
            type: 'error',
          });
      }
      setRowClicked(null);
      setValidateAfterDelay(false);
    }
  }, [validateAfterDelay]);

  useEffect(() => {
    setColumns([
      ...columnsGeneral,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <div className="flex flex-row items-center">
              <SpeedDial
                FabProps={{ size: 'small' }}
                direction="left"
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', right: 35 }}
                icon={<SpeedDialIcon />}
              >
                {!!params.row.anonymous && (
                  <SpeedDialAction
                    onClick={() => copyToClipboard(params.id)}
                    icon={<ContentCopyIcon />}
                    tooltipTitle={t('copy')}
                  />
                )}
                <SpeedDialAction
                  onClick={() => onClickEdit(params)}
                  icon={<EditIcon />}
                  tooltipTitle={t('edit')}
                />
                <SpeedDialAction
                  onClick={() => onClickView(params)}
                  icon={<VisibilityIcon />}
                  tooltipTitle={t('view')}
                />
                {!params.row.anonymous && !params.row.allUsers && (
                  <SpeedDialAction
                    onClick={() => handleAssign(params)}
                    icon={<AssignmentIndIcon />}
                    tooltipTitle={t('assign')}
                  />
                )}
              </SpeedDial>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  const handleClose = () => {
    setSurvey(null);
    setOpenSurvey(false);
    setOpenAssign(false);
    setOpenView(false);
  };

  return (
    <>
      <ViewTitle title={t('surveys')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenSurvey(true)}
          label={t('create_survey')}
        />
      </ViewTitle>
      <Divider />
      <textarea
        ref={textAreaRef}
        value={'/survey'}
        className="hidden"
        readOnly
      />
      <div style={{ height: '60vh', width: '100%', minWidth: '700px' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          onCellClick={onCellClick}
        />
      </div>
      <Dialog open={openSurvey} onClose={handleClose}>
        <FormSurveyConfig
          open={openSurvey}
          handleClose={handleClose}
          survey={survey}
          categories={categories}
        />
      </Dialog>
      <Dialog open={openAssign} onClose={handleClose}>
        <FormAssignSurvey
          survey={survey?.row}
          open={openAssign}
          handleClose={handleClose}
        />
      </Dialog>

      <Dialog open={openView} onClose={handleClose}>
        <ViewAnswer
          general
          survey={survey}
          open={openView}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  );
};
