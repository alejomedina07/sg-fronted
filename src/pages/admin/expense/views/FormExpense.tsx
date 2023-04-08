import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                   from '../../../../components/form/SgInput';
import { useForm }                   from 'react-hook-form';
import { yupResolver }               from '@hookform/resolvers/yup';
import useSnackbar                   from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams }                          from 'react-router-dom';
import { useAddExpenseMutation, useUpdateExpenseMutation } from '../redux/api/expenseApi';
import {defaultValues}                                     from '../helpers/expenseConst';
import {expenseScheme}               from '../validation/expenseScheme';
import { t }                         from 'i18next';
import useForms                from '../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';


export const FormExpense = () => {
    const { expenseId } = useParams();
    const { expenseEdit } = useForms();
    const [defaultValuesActive, setDefaultValuesActive] = useState<Expense>();
    const {openSnackbarAction} = useSnackbar();
    const navigate = useNavigate();
    const [addExpense, {isLoading}] = useAddExpenseMutation();
    const [ updateExpense ] = useUpdateExpenseMutation();

    console.log('default values', defaultValuesActive);

    const {handleSubmit, control, formState: {errors}, reset} = useForm<Expense>({
        defaultValues:defaultValuesActive,
        resolver: yupResolver(expenseScheme)
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
            if (data.id) res = await updateExpense( data ).unwrap();
            else res = await addExpense(data).unwrap();
            openSnackbarAction({messageAction: res.msg || `${t('created')}`, typeAction: 'success'})
            navigate('/admin/expense')
        } catch (e) {
            openSnackbarAction({messageAction: `${t('error_save')}`, typeAction: 'error'})
        }
    }


    return (
        <>
            <ViewTitle title={t('create_expense')}>
                {/* <SgButton label="list_user" href="/admin/users"/> */}
                <SgLink label={t('list_expense')} to="/admin/expense"/>
            </ViewTitle>
            <form onSubmit={handleSubmit(submitForm)}>
                {/* name amount */}
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
                    <SgInput
                        className="flex-1 !m-3"
                        name="amount"
                        type="number"
                        control={control}
                        errors={errors}
                        label={t('amount')}
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
                        required
                        size="small"
                    />
                </div>
                <div className="mt-4 mb-4 flex flex-row items-end justify-end">
                    <SgButton variant="contained" color="primary" type="submit" label={t('save')} sending={isLoading}/>
                </div>
            </form>
        </>
    );
}
