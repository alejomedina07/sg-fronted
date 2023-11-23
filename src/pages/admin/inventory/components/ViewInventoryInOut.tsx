import { Divider, Fab, List, ListItem, ListItemText } from '@mui/material';
import { t } from 'i18next';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import useInventory from '../redux/hooks/useInventory';
import { InventoryInOut } from './InventoryInOut';
import TablePagination from '@mui/material/TablePagination';

interface ViewInventoryInOutProps {
  data: any[];
  inventory: Inventory;
  refresh: () => void;
}

const dateManage = new DateFnsManager();

export const ViewInventoryInOut = (props: ViewInventoryInOutProps) => {
  const { data, inventory, refresh } = props;
  const { selectInventoryAction, isOpenModalInventory } = useInventory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !!data.length ? (
    <>
      <div className="flex flex-row items-center mb-4 justify-center">
        <Typography variant="h4" noWrap component="div">
          {inventory.name} - {t('quantity')} : {inventory.quantity}
        </Typography>
      </div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item: any, index) => {
            const keyId = `new-list-label-${item.id}`;
            return (
              <span key={`span-${keyId}`}>
                <ListItem key={keyId} disablePadding>
                  <ListItemText
                    key={`ListItemText-${keyId}`}
                    primary={
                      <>
                        <span>
                          <b>
                            <b> ID: {item.id} - </b>
                            {dateManage.getFormatMonthText(
                              new Date(item.createdAt)
                            )}
                          </b>
                          &nbsp; &nbsp; -
                          <b
                            className={
                              item.increment
                                ? 'text-emerald-700'
                                : 'text-red-700'
                            }
                          >
                            &nbsp; &nbsp;
                            {t(
                              item.increment ? 'incremented' : 'decremented'
                            )}{' '}
                            &nbsp;( {item.quantity} )
                          </b>
                          &nbsp; &nbsp; - &nbsp; &nbsp;{' '}
                          {item.createdBy.firstName} {item.createdBy.lastName}
                        </span>
                      </>
                    }
                    secondary={
                      <span>
                        <b> Notas:</b> {item.note} <br />
                      </span>
                    }
                  />
                </ListItem>
                <Divider key={`Divider-${keyId}`} />
              </span>
            );
          })}
      </List>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Fab
        className="!absolute bottom-5 right-8"
        aria-label={`${t('add')}`}
        color="primary"
        onClick={() =>
          selectInventoryAction({
            refresh,
            isOpenModalInventory: true,
            inventory,
          })
        }
      >
        <AddIcon />
      </Fab>
      {inventory?.id && isOpenModalInventory && <InventoryInOut />}
    </>
  ) : (
    <>{t('no_data_found')}</>
  );
};
