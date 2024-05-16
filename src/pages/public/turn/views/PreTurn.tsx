import { useForm } from 'react-hook-form';
import { Person } from '../../../admin/turn/dto/Person';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonSchema } from '../../../admin/turn/validation/personSchema';
import { CardContent, Card, CardActions } from '@mui/material';

import * as React from 'react';
import { Environment } from '../../../../utils/env/Environment';
import { SgButton } from '../../../../components/form/button/SgButton';
import { SgInput } from '../../../../components/form/SgInput';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SgToolbar } from '../../../../components/shared/toolbar/SgToolbar';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

const env = new Environment();
const socket = io(env.socket.io);
const room = env.socket.room;
const dateManage = new DateFnsManager();

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
      console.log(777, dateManage.getHour(new Date()));
      socket.emit('newPreTurn', {
        room,
        name: data.name,
        entryTime: dateManage.getHour(new Date()),
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
      <SgToolbar />
      <Card className="m-4 ">
        <form onSubmit={handleSubmit(submitForm)}>
          <CardContent>
            <div className="flex flex-row items-center">
              <SgInput
                className="flex-1 !m-0 sm:!m-3"
                name="name"
                control={control}
                errors={errors}
                label={t('full_name')}
                required
                size="medium"
                errorLarge
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center">
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
            <div className="w-full px-8 mt-4 mb-4 flex flex-row items-end justify-center">
              <Link to="/consultation-turn" className=" hover:underline">
                <SgButton
                  variant="outlined"
                  color="primary"
                  label={t('back')}
                  // sending={isLoading}
                />
              </Link>
              <span className="flex-1"></span>
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
