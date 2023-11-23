import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { t } from 'i18next';

interface ViewServicesProps {
  services: any[];
}

const dateManage = new DateFnsManager();

export const ViewServices = ({ services = [] }: ViewServicesProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !!services.length ? (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {services
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => {
            const keyId = `new-list-label-${item.id}`;
            return (
              <>
                <ListItem
                  key={keyId}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <EditIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemText
                    key={`ListItemText-${keyId}`}
                    primary={
                      <>
                        <span>
                          <b>
                            {'Id: '}
                            {item.id}
                          </b>
                          <br />
                        </span>
                        <span>
                          <b>
                            {dateManage.getFormatMonthText(
                              new Date(item.createdAt)
                            )}{' '}
                          </b>{' '}
                          -<b>&nbsp; &nbsp; {item.type?.name}</b> - &nbsp;
                          &nbsp; {item.createdBy.firstName}{' '}
                          {item.createdBy.lastName}
                        </span>
                      </>
                    }
                    secondary={
                      <span>
                        <b> Descripción del servicio:</b>{' '}
                        {item.type?.description} <br />
                        <b> Notas:</b> {item.description} <br />
                      </span>
                    }
                  />
                </ListItem>
                <Divider key={`Divider-${keyId}`} />
              </>
            );
          })}
      </List>
      <TablePagination
        component="div"
        count={services.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  ) : (
    <>{t('no_data_found')}</>
  );
};
