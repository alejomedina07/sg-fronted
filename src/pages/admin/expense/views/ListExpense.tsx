import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgTable } from '../../../../components/table/SgTable';
import { ColumnsExpense } from '../helpers/columnsExpense';
import { useGetExpenseQuery } from '../redux/api/expenseApi';
import { useNavigate } from 'react-router-dom';
import useForms from '../../../../store/hooks/form/useForms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ListExpense = () => {
  const { setExpenseEditAction } = useForms();
  const navigate = useNavigate();
  const { data, isLoading } = useGetExpenseQuery('');
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const columnsExpense = ColumnsExpense();

  const onClickView = (params: GridRenderCellParams) => {
    setExpenseEditAction(params.row);
    navigate(`/admin/expense/edit/${params.row.id}`);
  };

  useEffect(() => {
    setColumns([
      ...columnsExpense,
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
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_expense')}>
        <SgLink label={t('create_expense')} to="/admin/expense/create" />
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
