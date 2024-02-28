import { SgButton } from '../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import { SgInput } from '../../../../components/form/SgInput';
import React, { useEffect, useState } from 'react';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useForm } from 'react-hook-form';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { providerScheme } from '../validation/ProviderScheme';
import {
  useAddProviderMutation,
  useUpdateProviderMutation,
} from '../redux/api/providerApi';
import { SgLink } from '../../../../components/form/button/SgLink';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgSelect } from '../../../../components/form/SgSelect';
import { useNavigate } from 'react-router-dom';

interface FormProviderProps {
  provider?: any;
}

export const FormProvider = (props: FormProviderProps) => {
  const { provider } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [defaultValuesActive, setDefaultValuesActive] = useState<any>();
  // const [provider, setProvider] = useState<any>();
  const { openSnackbarAction } = useSnackbar();
  const [addProvider] = useAddProviderMutation();
  const [updateProvider] = useUpdateProviderMutation();

  console.log(789, provider);

  useEffect(() => {
    if (provider?.id)
      reset({ ...provider, documentTypeId: parseInt(provider.documentTypeId) });
  }, [provider]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(providerScheme),
  });

  console.log(66, errors);

  useEffect(() => {
    if (provider) {
      setDefaultValuesActive(provider);
    } else {
      setDefaultValuesActive({ status: true, parent: true });
    }
  }, [provider]);

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
        res = await updateProvider(data).unwrap();
      } else res = await addProvider(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate('/admin/providers');
    } catch (e: any) {
      openSnackbarAction({
        message: e?.data?.message || `${t('error_save')}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      <ViewTitle title={t(provider?.id ? 'edit_provider' : 'create_provider')}>
        <SgLink label={t('list_providers')} to="/admin/providers" />
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
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
          <SgInput
            className="flex-1 !m-3"
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t('phone_number')}
            required
            size="small"
          />
          <SgCheckbox
            label={t('active')}
            name="status"
            control={control}
            defaultChecked={provider?.status || true}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name="documentTypeId"
            label={t('document_type')}
            defaultValue={provider?.documentTypeId ?? ''}
            required
            fieldId="id"
            fieldLabel="name"
            fieldDescription="description"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            list="documentType"
          />
          <SgInput
            className="flex-1 !m-3"
            name="document"
            control={control}
            errors={errors}
            label={t('document_number')}
            required
            size="small"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="address"
            control={control}
            errors={errors}
            label={t('address')}
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-3"
            name="email"
            control={control}
            errors={errors}
            label={t('email')}
            required
            size="small"
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

        <div className="flex flex-row items-center justify-end">
          <SgButton
            variant="contained"
            color="primary"
            label={t('save')}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};
