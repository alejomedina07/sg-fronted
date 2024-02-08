import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { t } from 'i18next';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { NotesButton } from '../../components/notes/components/NotesButton';

interface ViewAppointmentsProps {
  appointments: any[];
}

const dateManage = new DateFnsManager();

export const ViewAppointments = ({
  appointments = [],
}: ViewAppointmentsProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !!appointments.length ? (
    <>
      <List
        key="list-appointment"
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        {appointments
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => {
            const keyId = `new-list-label-${item.id}`;
            return (
              <>
                <ListItem
                  key={keyId}
                  secondaryAction={
                    <NotesButton
                      entityType={CONFIG_CONST.NOTE.ENTITY_APPOINTMENT}
                      entityId={item.id}
                    />
                    // <IconButton edge="end" aria-label="comments">
                    //   <EditIcon />
                    // </IconButton>
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
                          -
                          <b>
                            &nbsp; &nbsp; {item.appointmentType?.name}
                            {' - '}
                            {item.name}
                          </b>
                          {/* {' '} */}
                          {/* - &nbsp; &nbsp; {item.createdBy.firstName}{' '} */}
                          {/* {item.createdBy.lastName} */}
                        </span>
                      </>
                    }
                    secondary={
                      <span>
                        <br />
                        <b> Descripción del servicio:</b> {item.description}{' '}
                        <br />
                        <b> Duración:</b>
                        {item.duration}
                        {' min'}
                        <br />
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
        count={appointments.length}
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
