import useNotes from './redux/hooks/useNotes';
import React, { useState } from 'react';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notesSchema } from './notesSchema';
import { t } from 'i18next';
import { useAddNotesMutation, useUpdateNotesMutation } from './notesApi';
import { SgInput } from '../../../../components/form/SgInput';
import { SgButton } from '../../../../components/form/button/SgButton';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';
import { Divider, Paper } from '@mui/material';

export const FormNotes = () => {
  const { closeModalNotesAction, refresh, key, id } = useNotes();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Notes>();
  const { openSnackbarAction } = useSnackbar();
  const [addNotes, { isLoading }] = useAddNotesMutation();
  const [updateNotes] = useUpdateNotesMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<Notes>({
    resolver: yupResolver(notesSchema),
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const submitForm = async (data: any) => {
    try {
      console.log(113);
      console.log(data);
      const newData = {
        title: data.title,
        description: data.description,
        entityType: key,
        entityId: id,
      };
      let res;
      if (data.id) res = await updateNotes(newData).unwrap();
      else res = await addNotes(newData).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      closeModalNotesAction();
      if (refresh) refresh();
    } catch (e) {
      console.log(7899, e);
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* title */}
        <div className="flex flex-row items-center p-0">
          <SgCheckbox
            label={'Crear una nueva nota'}
            name="addNote"
            control={control}
            checked={isChecked}
            onChange={handleCheckboxChange}
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
