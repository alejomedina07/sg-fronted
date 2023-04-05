import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }            from 'react-router-dom';
import {defaultValues}            from '../helpers/inventoryConst';
import {inventoryScheme}          from '../validation/inventoryScheme';
import {useAddInventoryMutation}  from '../redux/api/inventoryApi';
import {SgSelect} from '../../../../components/form/SgSelect';
import { t }                      from 'i18next';


export const FormInventory = () => {
    const {handleSubmit, control, formState: {errors}} = useForm<Inventory>({
        defaultValues,
        resolver: yupResolver(inventoryScheme)
    });
    const {openSnackbarAction} = useSnackbar();
    const navigate = useNavigate();

    console.log(1, errors);

    const [addInventory, {isLoading}] = useAddInventoryMutation()

    const submitForm = async (data: any) => {
        try {
            console.log(777, data);
            const res = await addInventory(data).unwrap();
            openSnackbarAction({messageAction: res.msg || `${t('created')}`, typeAction: 'success'})
            navigate('/admin/inventory')
        } catch (e) {
            openSnackbarAction({messageAction: `${t('error_save')}`, typeAction: 'error'})
        }
    }

    return (
        <>
            <ViewTitle title={t('create_inventory')}>
                {/* <SgButton label="list_user" href="/admin/users"/> */}
                <SgLink label={t('list_inventory')} to="/admin/inventory"/>
            </ViewTitle>
            <form onSubmit={handleSubmit(submitForm)}>
                {/* name quantity */}
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
                        name="quantity"
                        type= "number"
                        control={control}
                        errors={errors}
                        label={t('quantity')}
                        required
                        size="small"
                    />

                </div>
                {/* description  status*/}
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
                    <SgSelect
                        key="statusInventory-select"
                        control={control}
                        name='status'
                        label={t('status')}
                        required
                        fieldId='id'
                        fieldLabel='name'
                        fieldDescription='description'
                        className="flex-1 !m-3"
                        size='small'
                        errors={errors}
                        list="statusInventory"
                    />
                </div>
                <div className="mt-4 mb-4 flex flex-row items-end justify-end">
                    <SgButton variant="contained" color="primary" type="submit" label={t('save')} sending={isLoading}/>
                </div>
            </form>
        </>
    );
}
