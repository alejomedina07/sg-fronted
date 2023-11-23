import { SgButton } from '../../../../components/form/button/SgButton';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgInput } from '../../../../components/form/SgInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from '../redux/api/expenseApi';
import { defaultValues } from '../helpers/expenseConst';
import { expenseScheme } from '../validation/expenseScheme';
import { t } from 'i18next';
import useForms from '../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';
import { SgSelect } from '../../../../components/form/SgSelect';
import { AmountFormatCustom } from '../../../../helpers';

export const FormExpense = () => {
  const { expenseId } = useParams();
  const { expenseEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Expense>();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Expense>({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(expenseScheme),
  });

  useEffect(() => {
    if (expenseId && expenseEdit && expenseId === `${expenseEdit.id}`) {
      setDefaultValuesActive(expenseEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [expenseId, expenseEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) res = await updateExpense(data).unwrap();
      else res = await addExpense(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate('/admin/expense');
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <ViewTitle title={t(expenseId ? 'edit_expense' : 'create_expense')}>
        <SgLink label={t('list_expense')} to="/admin/expense" />
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* name amount */}
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
            name="amount"
            control={control}
            errors={errors}
            label={t('amount')}
            required
            size="small"
            InputProps={AmountFormatCustom}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name="typeId"
            label={t('typeExpense')}
            defaultValue={expenseEdit?.typeId ?? ''}
            required
            fieldId="id"
            fieldLabel="name"
            fieldDescription="description"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            list="typeExpense"
          />
        </div>
        {/* description */}
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

        <div className="mt-4 mb-4 flex flex-col sm:flex-row items-end justify-end">
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
