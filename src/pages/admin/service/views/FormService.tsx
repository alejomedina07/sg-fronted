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
import { t }                     from 'i18next';


export const FormService = () => {
  const { data:customerData, isLoading:isLoadingCustomer } = useGetCustomersQuery('');

  const { handleSubmit, control, formState:{ errors } } = useForm<Service>( {
    defaultValues,
    resolver: yupResolver(serviceSchema)
  });
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();



  const [ addService, { isLoading } ] = useAddServiceMutation()


  const submitForm  = async (data: any) => {
    try {
      console.log(777, data);
      const res = await addService( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || `${t('created')}`, typeAction: 'success' })
      navigate('/admin/service')
    } catch (e) {
      openSnackbarAction({ messageAction: `${t('error_save')}`, typeAction: 'error' })
    }
  }

  return (
    <>
      <ViewTitle title={t('create_service')}>
        <SgLink label={t('list_service')} to="/admin/service"/>
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
            label={t('amount')}
            required
            size="small"
          />

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
        <div className="flex flex-row items-center">
          <SgSelect
            key="statusService-select"
            control={control}
            name='customerId'
            label={t('select_customer')}
            required
            fieldId='id'
            fieldLabel='name'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            options={customerData?.data || []}
          />
            <SgSelect
                key="statusService-select"
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
                list="statusService"
            />
        </div>
        <div className="mt-4 mb-4 flex flex-row items-end justify-end">
          <SgButton variant="contained" color="primary" type="submit" label={t('save')} sending={isLoading}/>
        </div>
      </form>
    </>
  );

};
