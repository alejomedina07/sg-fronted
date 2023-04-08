import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                                             from '../../../../components/form/SgInput';
import { useForm }                                             from 'react-hook-form';
import { yupResolver }                                         from '@hookform/resolvers/yup';
import useSnackbar                                             from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams }                              from 'react-router-dom';
import {defaultValues}                                         from '../helpers/inventoryConst';
import {inventoryScheme}                                       from '../validation/inventoryScheme';
import { useAddInventoryMutation, useUpdateInventoryMutation } from '../redux/api/inventoryApi';
import {SgSelect}                                              from '../../../../components/form/SgSelect';
import { t }                                                   from 'i18next';
import { useEffect, useState }                                 from 'react';
import useForms                                                from '../../../../store/hooks/form/useForms';


export const FormInventory = () => {
    const { inventoryId } = useParams();
    const { inventoryEdit } = useForms();
    const [ defaultValuesActive, setDefaultValuesActive ] = useState<Inventory>();
    const [ updateInventory ] = useUpdateInventoryMutation();
    const {openSnackbarAction} = useSnackbar();
    const navigate = useNavigate();
    const [addInventory, {isLoading}] = useAddInventoryMutation()

    console.log('inventoryId', inventoryId);

    const {handleSubmit, control, formState: {errors}, reset} = useForm<Inventory>({
        defaultValues:defaultValuesActive,
        resolver: yupResolver(inventoryScheme)
    });

    console.log('default values', defaultValuesActive);

    useEffect(() => {
        if ( inventoryId && inventoryEdit && inventoryId === `${inventoryEdit.id}`) {
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
            if (data.id) res = await updateInventory( data ).unwrap();
            else res = await addInventory( data ).unwrap();
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
                        defaultValue={ inventoryEdit?.status || '' }
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
