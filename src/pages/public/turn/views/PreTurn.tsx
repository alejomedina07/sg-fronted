import { useForm } from 'react-hook-form';
import { Person } from '../../../admin/turn/dto/Person';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonSchema } from '../../../admin/turn/validation/personSchema';
import { AppBar, Box, CardContent, Card, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Environment } from '../../../../utils/env/Environment';
import { SgButton } from '../../../../components/form/button/SgButton';
import { SgInput } from '../../../../components/form/SgInput';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const env = new Environment();
const socket = io(env.socket.io); // Reemplaza 'http://localhost:81' con la dirección de tu servidor NestJS
const room = env.socket.room;

export const PreTurn = () => {
  const { openSnackbarAction } = useSnackbar();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Person>({
    resolver: yupResolver(PersonSchema),
  });

  const submitForm = async (data: Person) => {
    try {
      console.log(data);
      socket.emit('newPreTurn', {
        room,
        name: data.name,
        document: data.document,
        company: data.company,
        id: new Date().getTime(),
      });
      openSnackbarAction({
        message: `${t('created')}`,
        type: 'success',
      });
      reset();
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img
              src={`${env.basePatch}/images/esvyda_logo.png`}
              alt=""
              width={80}
              className="hidden sm:block mr-2"
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Company
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Card className="m-4 ">
        <form onSubmit={handleSubmit(submitForm)}>
          <CardContent>
            <div className="flex flex-row items-center">
              <SgInput
                className="flex-1 !m-3"
                name="name"
                control={control}
                errors={errors}
                label={t('full_name')}
                required
                size="medium"
                errorLarge
              />
            </div>
            <div className="flex flex-row items-center">
              <SgInput
                className="flex-1 !m-3"
                name="company"
                control={control}
                errors={errors}
                label={t('company')}
                size="medium"
              />
              <SgInput
                className="flex-1 !m-3"
                name="document"
                control={control}
                errors={errors}
                label={t('document_number')}
                required
                size="medium"
              />
            </div>
          </CardContent>
          <CardActions>
            <div className="w-full mt-4 mb-4 flex flex-row items-end justify-center">
              <SgButton
                variant="contained"
                color="primary"
                type="submit"
                label={t('save')}
                // sending={isLoading}
              />
            </div>
          </CardActions>
        </form>
      </Card>
    </>
  );
};
