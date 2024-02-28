import { SgButton } from '../../../../../components/form/button/SgButton';
import { Dialog, Divider, IconButton, Tooltip } from '@mui/material';
import { FormCategoryComponent } from './formCategoryComponent';
import { ViewTitle } from '../../../components/share/title/ViewTitle';
import React, { useEffect, useState } from 'react';
import { ColumnsGeneral } from '../../helpers/columnsGeneral';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { SgTable } from '../../../../../components/sgTable/SgTable';

interface ListCategoryComponentProps {
  setOpenCategory: (open: boolean) => void;
  openCategory: boolean;
  isLoading: boolean;
  data: any;
}

export const ListCategoryComponent = (props: ListCategoryComponentProps) => {
  const { setOpenCategory, openCategory, data, isLoading } = props;
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { t, i18n } = useTranslation();

  const [category, setCategory] = useState<any>();

  const columnsGeneral = ColumnsGeneral();

  const onClickView = (params: GridRenderCellParams) => {
    setCategory(params);
    setOpenCategory(true);
  };

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

  const handleClose = () => {
    setCategory(null);
    setOpenCategory(false);
  };

  return (
    <>
      <ViewTitle title={t('categories')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenCategory(true)}
          label={t('create_category')}
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
      <Dialog open={openCategory} onClose={handleClose}>
        <FormCategoryComponent
          open={openCategory}
          handleClose={handleClose}
          category={category}
        />
      </Dialog>
    </>
  );
};
