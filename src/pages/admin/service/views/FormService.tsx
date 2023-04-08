import { SgButton }              from '../../../../components/form/button/SgButton';
import { ViewTitle }             from '../../components/share/title/ViewTitle';
import { SgLink }                from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceSchema }          from '../validation/serviceSchema';
import { defaultValues }                                   from '../helpers/serviceConst';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/api/serviceApi';
import { SgSelect }                                        from '../../../../components/form/SgSelect';
import { useGetCustomersQuery }   from '../../customer/redux/api/customerApi';
import { t }                      from 'i18next';
import useForms                from '../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';


export const FormService = () => {
  const { serviceId } = useParams();
  const { serviceEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Service>();
  const navigate = useNavigate();
  const { openSnackbarAction } = useSnackbar();
  const { data:customerData, isLoading:isLoadingCustomer } = useGetCustomersQuery('');
  const [ addService, { isLoading } ] = useAddServiceMutation();
  const [ updateService ] = useUpdateServiceMutation();

  console.log('serviceEdit',serviceEdit);
  console.log('serviceId', serviceId);

  const { handleSubmit, control, formState:{ errors }, reset } = useForm<Service>( {
    defaultValues: defaultValuesActive,
    resolver: yupResolver(serviceSchema)
  });

  console.log('default values', defaultValuesActive);

  useEffect(() => {
    if (serviceId && serviceEdit && serviceId === `${serviceEdit.id}`) {
      setDefaultValuesActive(serviceEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [serviceId, serviceEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);


  const submitForm  = async (data: any) => {
    try {
      let res
      if (data.id) res = await updateService( data ).unwrap();
      else res = await addService( data ).unwrap();
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
            key="customerService-select"
            control={control}
            name='customerId'
            label={t('select_customer')}
            defaultValue={ serviceEdit?.customerId || '' }
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
                defaultValue={ serviceEdit?.status || '' }
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
