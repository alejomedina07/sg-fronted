import { SgTablePaginationServer } from '../../../../components/sgTable/SgTablePaginationServer';
import React, { useCallback, useEffect, useState } from 'react';
import { paginationProps } from '../../../../components/sgTable/dto/SgTableProps';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetTurnQuery } from '../redux/api/turnApi';
import { ColumnsTurn } from '../helpers/columnsTurn';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { ListAttention } from '../components/list/ListAttention';

export const ListTurnView = () => {
  const [pagination, setPagination] = useState<paginationProps>({
    pageSize: 25,
    page: 0,
    filters: '',
    order: '',
  });
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [turnSelected, setTurnSelected] = useState();
  const { data, isLoading } = useGetTurnQuery(pagination);
  const handleView = (turn: any) => {
    console.log(turn);
    setTurnSelected(turn);
    setIsOpen(true);
  };

  const columnsTurn = ColumnsTurn();

  useEffect(() => {
    setColumns([
      ...columnsTurn,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 40,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <IconButton
                onClick={() => handleView(params.row)}
                aria-label="view"
              >
                <VisibilityIcon />
              </IconButton>
              <NotesButton
                entityType={CONFIG_CONST.NOTE.ENTITY_TURN}
                entityId={params.row.id}
              />
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  const handlePaginationChange = useCallback((params: paginationProps) => {
    if (
      params.page !== pagination.page ||
      params.pageSize !== pagination.pageSize ||
      params.order !== pagination.order ||
      params.filters !== pagination.filters
    ) {
      setPagination({
        pageSize: params.pageSize,
        page: params.page,
        order: params.order,
        filters: params.filters,
      });
    }
  }, []);

  return (
    <>
      <ViewTitle title={t('list_turns')} />

      <div style={{ width: '100%', minWidth: '900px' }}>
        <SgTablePaginationServer
          paginationChange={handlePaginationChange}
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          total={data?.total || 0}
        />
      </div>

      {isOpen && !!turnSelected && (
        <ListAttention
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          turn={turnSelected}
        />
      )}
    </>
  );
};
