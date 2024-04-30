import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfileMutation } from '../redux/api/userApi';
import { updateProfileSchema } from '../validation/userScheme';
import { SgButton } from '../../../../components/form/button/SgButton';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgInput } from '../../../../components/form/SgInput';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../public/auth/redux/hooks/useAuth';

export const FormUpdateProfile = () => {
  const [defaultValuesActive, setDefaultValuesActive] = useState<any>();
  const { userConnected, addLogoutAction } = useAuth();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(updateProfileSchema),
  });

  useEffect(() => {
    setDefaultValuesActive({
      address: userConnected.address,
      phoneNumber: userConnected.phoneNumber,
    });
    reset({
      address: userConnected.address,
      phoneNumber: userConnected.phoneNumber,
    });
  }, []);

  const { openSnackbarAction } = useSnackbar();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const submitForm = async (data: any) => {
    try {
      const res = await updateProfile(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      // navigate('/admin');
      addLogoutAction();
    } catch (e: any) {
      openSnackbarAction({
        message: e?.data?.message || `${t('error_save')}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      <ViewTitle title={t('edit_user')} />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t('phone_number')}
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-3"
            name="address"
            control={control}
            errors={errors}
            label={t('address')}
            required
            size="small"
          />
        </div>

        {/* password */}
        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            className="flex-1 !m-2"
            name="password"
            control={control}
            errors={errors}
            label={t('password')}
            type="password"
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="confirmPassword"
            control={control}
            errors={errors}
            label={t('password_confirm')}
            type="password"
            size="small"
          />
        </div>

        <div className="mt-4 mb-4 flex flex-row items-end justify-end">
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            sending={isLoading}
          />
        </div>
      </form>
    </>
  );
};
