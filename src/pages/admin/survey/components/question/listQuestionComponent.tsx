import { SgButton } from '../../../../../components/form/button/SgButton';
import { Dialog, Divider, IconButton, Tooltip } from '@mui/material';
import { FormQuestionComponent } from './formQuestionComponent';
import { ViewTitle } from '../../../components/share/title/ViewTitle';
import React, { useEffect, useState } from 'react';
import { ColumnsGeneral } from '../../helpers/columnsGeneral';
import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { SgTable } from '../../../../../components/sgTable/SgTable';

interface ListQuestionComponentProps {
  setOpenQuestion: (open: boolean) => void;
  openQuestion: boolean;
  isLoading: boolean;
  data: any;
  categories: any;
}

export const ListQuestionComponent = (props: ListQuestionComponentProps) => {
  const { setOpenQuestion, openQuestion, data, isLoading, categories } = props;
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { t, i18n } = useTranslation();

  const [question, setQuestion] = useState<any>();

  const columnsGeneral = ColumnsGeneral();

  const onClickView = (params: GridRenderCellParams) => {
    setQuestion(params);
    setOpenQuestion(true);
  };

  useEffect(() => {
    setColumns([
      ...columnsGeneral,
      {
        field: 'type',
        headerName: `${t('type')}`,
        flex: 100,
        valueFormatter: (params: GridValueFormatterParams) => {
          return t(params.value);
        },
      },
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
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  const handleClickOpen = () => {
    setOpenQuestion(true);
  };

  const handleClose = () => {
    setQuestion(null);
    setOpenQuestion(false);
  };

  return (
    <>
      <ViewTitle title={t('questions')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={handleClickOpen}
          label={t('create_question')}
        />
      </ViewTitle>
      <Divider />
      <div style={{ height: '60vh', width: '100%', minWidth: '700px' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
      <Dialog open={openQuestion} onClose={handleClose}>
        {!!categories?.data?.length && (
          <FormQuestionComponent
            open={openQuestion}
            handleClose={handleClose}
            question={question}
            categories={categories.data}
          />
        )}
      </Dialog>
    </>
  );
};
