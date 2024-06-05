import { Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SgInput } from '../../../../components/form/SgInput';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bannerSchema } from '../validation/bannerScheme';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import {
  useAddBannerMutation,
  useUpdateBannerMutation,
} from '../redux/api/bannerApi';
import { SgButton } from '../../../../components/form/button/SgButton';
import { Banner } from '../dto/banner';
import { useEffect } from 'react';

interface FormBannerProps {
  banner?: Banner;
  setAdd: (add: boolean) => void;
}

export const FormBanner = (props: FormBannerProps) => {
  const { banner, setAdd } = props;
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();

  const [addBanner] = useAddBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Banner>({
    defaultValues: { status: true },
    resolver: yupResolver(bannerSchema),
  });

  console.log(6666, errors);

  useEffect(() => {
    if (banner?.id) {
      reset({ ...banner });
    }
  }, [banner]);

  const submitForm = async (data: any) => {
    try {
      const formData = new FormData();
      if (data.id) formData.append('id', data.id);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('status', data.status.toString());
      if (data?.file && data?.file[0]) formData.append('file', data.file[0]);

      let res;
      if (data.id)
        res = await updateBanner({ data: formData, id: data.id }).unwrap();
      else res = await addBanner(formData).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      setAdd(false);
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  // @ts-ignore
  return (
    <Paper elevation={3} className="flex-1 h-auto p-2 mb-4">
      <form onSubmit={handleSubmit(submitForm)}>
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
          <span className="flex-1 !m-3">
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  className="flex-1 !m-3"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />
            {errors.file && <p>{`${errors.file.message}`}</p>}
          </span>
          <SgCheckbox
            label={t('status')}
            name="status"
            control={control}
            // defaultChecked={configFormEdit?.status || true}
            defaultChecked={true}
          />
        </div>
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="description"
            control={control}
            errors={errors}
            label={t('description')}
            required
            rows={4}
            size="small"
          />
        </div>
        <div className="mt-4 mb-4 flex flex-row items-end justify-end">
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
          />
        </div>
      </form>
    </Paper>
  );
};
