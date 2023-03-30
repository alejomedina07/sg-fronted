import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }            from 'react-router-dom';
import {defaultValues} from "../helpers/inventoryConst";
import {inventoryScheme} from "../validation/inventoryScheme";
import {useAddInventoryMutation} from "../redux/api/inventoryApi";
import {SgSelect} from "../../../../components/form/SgSelect";


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
            openSnackbarAction({messageAction: res.msg || 'Creado', typeAction: 'success'})
            navigate('/admin/expense')
        } catch (e) {
            openSnackbarAction({messageAction: 'Error al guardar', typeAction: 'error'})
        }
    }

    return (
        <>
            <ViewTitle title="create_inventory">
                {/* <SgButton label="list_user" href="/admin/users"/> */}
                <SgLink label="list_expense" to="/admin/inventory"/>
            </ViewTitle>
            <form onSubmit={handleSubmit(submitForm)}>
                {/* name quantity */}
                <div className="flex flex-row items-center">
                    <SgInput
                        className="flex-1 !m-3"
                        name="name"
                        control={control}
                        errors={errors}
                        label="name"
                        required
                        size="small"
                    />
                    <SgInput
                        className="flex-1 !m-3"
                        name="quantity"
                        control={control}
                        errors={errors}
                        label="quantity"
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
                        label="description"
                        required
                        size="small"
                    />
                    <SgInput
                        className="flex-1 !m-3"
                        name="status"
                        control={control}
                        errors={errors}
                        label="status"
                        required
                        size="small"
                    />
                    <SgSelect
                        key="status-select"
                        control={control}
                        name='status'
                        label="status"
                        required
                        fieldId='id'
                        fieldLabel='name'
                        fieldDescription='description'
                        className="flex-1 !m-3"
                        size='small'
                        errors={errors}
                        list="status"
                    />
                </div>
                <div className="mt-4 mb-4 flex flex-row items-end justify-end">
                    <SgButton variant="contained" color="primary" type="submit" label="Guardar" sending={isLoading}/>
                </div>
            </form>
        </>
    );
}
