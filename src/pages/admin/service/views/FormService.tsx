import { SgButton }              from '../../../../components/form/button/SgButton';
import { ViewTitle }             from '../../components/share/title/ViewTitle';
import { SgLink }                from '../../../../components/form/button/SgLink';
import { SgInput }               from '../../../../components/form/SgInput';
import { useForm }               from 'react-hook-form';
import { yupResolver }           from '@hookform/resolvers/yup';
import useSnackbar               from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }           from 'react-router-dom';
import { serviceSchema }         from '../validation/serviceSchema';
import { defaultValues }         from '../helpers/serviceConst';
import { useAddServiceMutation } from '../redux/api/serviceApi';
import { SgSelect }              from '../../../../components/form/SgSelect';
import { useGetCustomersQuery }  from '../../customer/redux/api/customerApi';


export const FormService = () => {
  const { data:customerData, isLoading:isLoadingCustomer } = useGetCustomersQuery('');
  const { handleSubmit, control, formState:{ errors } } = useForm<Service>( {
    defaultValues,
    resolver: yupResolver(serviceSchema)
  });
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();

  console.log(1, customerData);

  const [ addService, { isLoading } ] = useAddServiceMutation()

  const submitForm  = async (data: any) => {
    try {
      console.log(777, data);
      const res = await addService( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || 'Creado', typeAction: 'success' })
      navigate('/admin/service')
    } catch (e) {
      openSnackbarAction({ messageAction: 'Error al guardar', typeAction: 'error' })
    }
  }

  return (
    <>
      <ViewTitle title="create_service">
        <SgLink label="list_service" to="/admin/service"/>
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* create_at */}
        <div className="flex flex-row items-center">

        </div>
        {/* description */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="amount"
            control={control}
            errors={errors}
            label="amount"
            required
            size="small"
          />

          <SgInput
            className="flex-1 !m-3"
            name="description"
            control={control}
            errors={errors}
            label="description"
            required
            size="small"
          />
        </div>
        <div className="flex flex-row items-center">
          <SgSelect
            key="statusInventory-select"
            control={control}
            name='customerId'
            label="select customer"
            required
            fieldId='id'
            fieldLabel='name'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            options={customerData.data || []}
          />
        </div>
        <div className="mt-4 mb-4 flex flex-row items-end justify-end">
          <SgButton variant="contained" color="primary" type="submit" label="Guardar" sending={isLoading}/>
        </div>
      </form>
    </>
  );

};
