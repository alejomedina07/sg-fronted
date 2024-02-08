import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { ViewTitle } from '../../../components/share/title/ViewTitle';
import { SgInput } from '../../../../../components/form/SgInput';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { optionsListScheme } from '../validation/optionsListScheme';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddOptionMutation,
  useUpdateOptionMutation,
} from '../../../../../store/apis/listApi';
import useForms from '../../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';
import { SgCheckbox } from '../../../../../components/form/SgCheckbox';

export const FormOptions = () => {
  const { keyValue, idConfig } = useParams();

  const { configFormEdit } = useForms();
  const { openSnackbarAction } = useSnackbar();
  const [defaultActive, setDefaultActive] = useState<OptionsList>();
  const navigate = useNavigate();
  const [addOption] = useAddOptionMutation();

  const [updateOption] = useUpdateOptionMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OptionsList>({
    defaultValues: defaultActive,
    resolver: yupResolver(optionsListScheme),
  });

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) res = await updateOption(data).unwrap();
      else res = await addOption(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate(`/admin/config/config-list/${keyValue}`);
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  const title = t(idConfig ? 'edit' : 'add') + ' ' + t(`${keyValue}`);
  const labelLink = t('list') + ' ' + t(`${keyValue}`);

  useEffect(() => {
    if (idConfig && configFormEdit && idConfig == `${configFormEdit.id}`) {
      setDefaultActive({ ...configFormEdit });
    } else
      setDefaultActive({
        name: '',
        description: '',
        key: keyValue || '',
        status: true,
      });
  }, [idConfig, configFormEdit]);

  useEffect(() => {
    reset(defaultActive);
  }, [defaultActive, reset]);

  return (
    <>
      <ViewTitle title={title}>
        <SgLink
          label={labelLink}
          to={`/admin/config/config-list/${keyValue}`}
        />
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* name status */}
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
          <SgCheckbox
            label={t('status')}
            name="status"
            control={control}
            defaultChecked={configFormEdit?.status || true}
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
    </>
  );
};
