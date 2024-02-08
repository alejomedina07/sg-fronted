import { SgButton } from '../../../../../components/form/button/SgButton';
import { t } from 'i18next';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import { SgInput } from '../../../../../components/form/SgInput';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { categoryScheme } from '../../validation/category/CategoryScheme';
import { SgCheckbox } from '../../../../../components/form/SgCheckbox';
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from '../../redux/api/surveyApi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Category } from '../../dto/category/Category';

interface FormCategoryComponentProps {
  open: boolean;
  handleClose: () => void;
  category: any;
}

export const FormCategoryComponent = (props: FormCategoryComponentProps) => {
  const { open, handleClose, category } = props;

  const { openSnackbarAction } = useSnackbar();

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Category>({
    defaultValues: { status: true },
    resolver: yupResolver(categoryScheme),
  });

  useEffect(() => {
    if (category?.id) {
      reset(category.row);
    }
  }, [category]);

  const submitForm = async (data: Category) => {
    try {
      let res;
      if (data?.id) res = await updateCategory(data).unwrap();
      else res = await addCategory(data).unwrap();
      openSnackbarAction({
        // message: `${t('created')}`,
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      reset();
      handleClose();
    } catch (e: any) {
      const message = e?.data?.message || `${t('error_save')}`;
      openSnackbarAction({ message, type: 'error' });
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
      <SgDialogTitle id={'survey-dialog'} onClose={handleClose}>
        {t('create_category')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="name"
              control={control}
              errors={errors}
              label={t('name')}
              required
              size="small"
            />
            {/* <SgCheckbox label={t('status')} name="status" /> */}
            <SgCheckbox label={t('status')} name="status" control={control} />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="description"
              control={control}
              errors={errors}
              label={t('description')}
              required
              rows={5}
              size="small"
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
            type="submit"
            label={t('save')}
            // sending={isLoading}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
