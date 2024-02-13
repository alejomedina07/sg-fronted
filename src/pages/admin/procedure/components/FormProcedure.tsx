import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import { SgInput } from '../../../../components/form/SgInput';
import { useEffect, useState } from 'react';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useForm } from 'react-hook-form';
import {
  useAddProcedureMutation,
  useUpdateProcedureMutation,
} from '../redux/api/procedureApi';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { procedureScheme } from '../validation/ProcedureScheme';

interface FormProcedureProps {
  procedure: any;
  open: boolean;
  handleClose: () => void;
}

export const FormProcedure = (props: FormProcedureProps) => {
  const { procedure, open, handleClose } = props;
  const { t } = useTranslation();
  const [defaultValuesActive, setDefaultValuesActive] = useState<any>();
  const { openSnackbarAction } = useSnackbar();
  const [addProcedure] = useAddProcedureMutation();
  const [updateProcedure] = useUpdateProcedureMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(procedureScheme),
  });

  useEffect(() => {
    if (procedure) {
      setDefaultValuesActive(procedure);
    } else {
      setDefaultValuesActive({ status: true, parent: true });
    }
  }, [procedure]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm = async (data: any) => {
    try {
      console.log(data);
      let res;
      if (data.id) {
        delete data.createdAt;
        delete data.createdById;
        res = await updateProcedure(data).unwrap();
      } else res = await addProcedure(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      handleClose();
    } catch (e) {
      console.log(123456);
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'procedure-dialog'} onClose={handleClose}>
        {t('create_procedure')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-col sm:flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="name"
              control={control}
              errors={errors}
              label={t('name')}
              required
              size="small"
            />
            <SgCheckbox
              label={t('status')}
              name="status"
              control={control}
              defaultChecked={procedure?.status || true}
            />
            <SgCheckbox
              label={t('main')}
              name="parent"
              control={control}
              defaultChecked={procedure?.parent || true}
              disabled={procedure}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="description"
              control={control}
              errors={errors}
              label={t('description')}
              required
              size="small"
              rows={4}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            className="mx-4"
          >
            {t('close')}
          </Button>
          <SgButton
            variant="contained"
            color="primary"
            label={t('assign')}
            // sending={isLoading}
            type="submit"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
