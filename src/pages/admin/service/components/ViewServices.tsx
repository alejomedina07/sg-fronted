import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

interface ViewServicesProps {
  services: any[];
}

const dateManage = new DateFnsManager();

export const ViewServices = ({ services = [] }: ViewServicesProps) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {services.map((item) => {
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
                        {dateManage.getFormatMonthText(
                          new Date(item.createdAt)
                        )}{' '}
                      </b>{' '}
                      -<b>&nbsp; &nbsp; {item.type?.name}</b> - &nbsp; &nbsp;{' '}
                      {item.createdBy.firstName} {item.createdBy.lastName}
                    </span>
                  </>
                }
                secondary={
                  <span>
                    <b> Descripción del servicio:</b> {item.type?.description}{' '}
                    <br />
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
  );
};
