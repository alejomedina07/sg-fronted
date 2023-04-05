import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }            from 'react-router-dom';
import {useAddExpenseMutation} from '../redux/api/expenseApi';
import {defaultValues} from '../helpers/expenseConst';
import {expenseScheme} from '../validation/expenseScheme';
import { t }                      from 'i18next';


export const FormExpense = () => {
    const {handleSubmit, control, formState: {errors}} = useForm<Expense>({
        defaultValues,
        resolver: yupResolver(expenseScheme)
    });
    const {openSnackbarAction} = useSnackbar();
    const navigate = useNavigate();

    console.log(1, errors);

    const [addExpense, {isLoading}] = useAddExpenseMutation()

    const submitForm = async (data: any) => {
        try {
            console.log(777, data);
            const res = await addExpense(data).unwrap();
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
