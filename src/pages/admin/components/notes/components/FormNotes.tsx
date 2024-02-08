import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import useNotes from '../redux/hooks/useNotes';
import { FormControlLabel, Paper, Switch } from '@mui/material';
import {
  useAddNotesMutation,
  useUpdateNotesMutation,
} from '../redux/api/notesApi';
import { notesSchema } from '../validation/notesSchema';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { SgInput } from '../../../../../components/form/SgInput';
import { SgButton } from '../../../../../components/form/button/SgButton';
import useAuth from '../../../../public/auth/redux/hooks/useAuth';

export const FormNotes = () => {
  const { refresh, entityType, entityId, noteEdit } = useNotes();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Note | any>();
  const { openSnackbarAction } = useSnackbar();
  const [addNotes, { isLoading }] = useAddNotesMutation();
  const [updateNotes] = useUpdateNotesMutation();
  const { userConnected } = useAuth();

  useEffect(() => {
    if (noteEdit && noteEdit.createdBy.id == userConnected.id) {
      setDefaultValuesActive(noteEdit);
      setIsChecked(true);
      reset(noteEdit);
    } else {
      setDefaultValuesActive({ entityType, entityId });
      reset({ entityType, entityId });
    }
  }, [noteEdit]);

  const [isChecked, setIsChecked] = useState(false);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setIsChecked(!checked);
  };

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) res = await updateNotes(data).unwrap();
      else res = await addNotes(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      if (refresh) refresh();
      reset({ entityType, entityId });
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: noteEdit ? noteEdit : defaultValuesActive,
    resolver: yupResolver(notesSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* title */}
        <div className="flex flex-row items-center p-2">
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={t('create_note')}
          />
        </div>

        {/* title */}
        {!!isChecked && (
          <Paper elevation={3} className=" p-2 m-4">
            <div className="flex flex-row items-center">
              <SgInput
                className="flex-1 !m-3"
                name="title"
                control={control}
                errors={errors}
                label={t('title')}
                rows={1}
                required
                size="small"
              />
            </div>

            {/* description */}
            <div className="flex flex-row items-center">
              <SgInput
                className="flex-1 !m-3"
                name="description"
                control={control}
                errors={errors}
                label={t('description')}
                rows={3}
                required
                size="small"
              />
            </div>
            <div className="mt-2 pr-4 flex flex-row items-end justify-end">
              <SgButton
                variant="contained"
                color="primary"
                type="submit"
                label={t('save')}
                sending={isLoading}
              />
            </div>
          </Paper>
        )}
      </form>
    </>
  );
};
