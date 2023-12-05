import { SgInput } from '../../../../../components/form/SgInput';
import { t } from 'i18next';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { useForm } from 'react-hook-form';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import React, { useEffect, useState } from 'react';
import { SgSelect } from '../../../../../components/form/SgSelect';
import {
  useAddRolMutation,
  useGetPermissionQuery,
  useGetPrivilegesQuery,
  useUpdateRolMutation,
} from '../redux/api/rolApi';
import UseRol from '../redux/hooks/useRol';

const defaultValues = {
  privilegesId: [],
  permissionsId: [],
};

export const FormRolComponent = () => {
  const [addRol, { isLoading }] = useAddRolMutation();
  const [updateRol] = useUpdateRolMutation();

  const { data: privileges } = useGetPrivilegesQuery('');
  const { data: permissions } = useGetPermissionQuery('');

  const { openSnackbarAction } = useSnackbar();

  const [defaultValuesActive, setDefaultValuesActive] = useState<any>({
    privilegesId: [],
    permissionsId: [],
  });
  const { rol, clearRolAction } = UseRol();

  const clearForm = () => {
    reset(defaultValues);
    clearRolAction();
  };

  useEffect(() => {
    if (rol && rol.id) {
      const rolValues = {
        rol: {
          id: rol.id,
          name: rol.name,
          description: rol.description,
        },
        privilegesId: rol.rolPrivileges.map((x: any) => x.id),
        permissionsId: rol.rolPermissions.map((x: any) => x.id),
      };
      setDefaultValuesActive(rolValues);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [rol]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValuesActive,
  });

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.rol.id) res = await updateRol(data).unwrap();
      else res = await addRol(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      reset(defaultValues);
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center">
          <SgInput
            className="flex-1 !m-3"
            name="rol.name"
            control={control}
            errors={errors}
            label={t('name')}
            required
            size="small"
          />
          <SgSelect
            key="privilegesId-select"
            control={control}
            name="privilegesId"
            label={t('privileges')}
            fieldId="id"
            multiple
            fieldLabel="description"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            options={privileges?.data}
          />
          <SgSelect
            key="permissionsId-select"
            control={control}
            name="permissionsId"
            label={t('permissions')}
            fieldId="id"
            multiple
            fieldLabel="name"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            options={permissions?.data}
          />
          <SgInput
            className="flex-1 !m-3"
            name="rol.description"
            control={control}
            errors={errors}
            label={t('description')}
            size="small"
            rows={3}
          />
        </div>
        <div className="mt-4 mb-4 flex flex-col sm:flex-row items-start justify-start">
          <SgButton
            variant="contained"
            classes="!mr-2"
            onClickAction={clearForm}
            label={t('clean')}
            sending={isLoading}
          />
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            sending={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
