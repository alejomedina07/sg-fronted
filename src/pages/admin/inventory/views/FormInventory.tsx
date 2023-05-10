import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { SgButton } from '../../../../components/form/button/SgButton';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgInput } from '../../../../components/form/SgInput';
import { defaultValues } from '../helpers/inventoryConst';
import { inventoryScheme } from '../validation/inventoryScheme';
import {
  useAddInventoryMutation,
  useUpdateInventoryMutation,
} from '../redux/api/inventoryApi';
import { SgSelect } from '../../../../components/form/SgSelect';

interface FormInventoryProps {
  inventoryEdit?: Inventory;
}

export const FormInventory = (props: FormInventoryProps) => {
  const { inventoryEdit } = props;
  const { inventoryId } = useParams();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Inventory>();
  const [updateInventory] = useUpdateInventoryMutation();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [addInventory, { isLoading }] = useAddInventoryMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Inventory>({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(inventoryScheme),
  });

  console.log(989, errors);

  useEffect(() => {
    if (inventoryId && inventoryEdit && inventoryId === `${inventoryEdit.id}`) {
      setDefaultValuesActive(inventoryEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [inventoryId, inventoryEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) res = await updateInventory(data).unwrap();
      else res = await addInventory(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate('/admin/inventory');
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <ViewTitle
        title={t(inventoryEdit ? 'edit_inventory' : 'create_inventory')}
      >
        <SgLink label={t('list_inventory')} to="/admin/inventory" />
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
          <SgSelect
            key="statusInventory-select"
            control={control}
            name="statusId"
            label={t('status')}
            defaultValue={inventoryEdit?.statusId || ''}
            required
            fieldId="id"
            fieldLabel="name"
            fieldDescription="description"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            list="statusInventory"
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
            sending={isLoading}
          />
        </div>
      </form>
    </>
  );
};
