import { useEffect, useState } from 'react';
import { SgButton }              from '../../../../components/form/button/SgButton';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                                         from 'react-hook-form';
import { yupResolver }                                     from '@hookform/resolvers/yup';
import useSnackbar                                         from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { serviceSchema }                                   from '../validation/serviceSchema';
import { defaultValues }                                   from '../helpers/serviceConst';
import { useAddServiceMutation, useUpdateServiceMutation } from '../redux/api/serviceApi';
import { SgSelect }                                        from '../../../../components/form/SgSelect';
import { useGetCustomersQuery }                            from '../../customer/redux/api/customerApi';
import { t }                                               from 'i18next';
import { SgAutocomplete }                                  from '../../../../components/form/SgAutocomplete';
import useService                                          from '../redux/hooks/useService';
import { AmountFormatCustom }                              from '../../../../helpers';



export const FormService = () => {
  const { service, closeModalServiceAction, isOpenModalService, refresh, customer } = useService()
  const [defaultValuesActive, setDefaultValuesActive] = useState<Service>();
  const { openSnackbarAction } = useSnackbar();
  const { data:customerData } = useGetCustomersQuery('');
  const [ addService, { isLoading } ] = useAddServiceMutation();
  const [ updateService ] = useUpdateServiceMutation();


  useEffect( () => {
    if (service) setDefaultValuesActive( { ...service } );
    else {
      setDefaultValuesActive( { ...defaultValues, customerId: customer?.id || null } );
    }
  }, [service, isOpenModalService] );

  const { handleSubmit, control, formState:{ errors }, reset } = useForm<Service>( {
    defaultValues: defaultValuesActive || undefined,
    resolver: yupResolver(serviceSchema)
  });

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm  = async (data: any) => {
    try {
      console.log(113);
      console.log(data);
      let res
      if (data.id) res = await updateService( data ).unwrap();
      else res = await addService( data ).unwrap();
      openSnackbarAction({ message: res.msg || `${t('created')}`, type: 'success' })
      closeModalServiceAction();
      if (refresh) refresh();
    } catch (e) {
      console.log(7899, e);
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' })
    }
  }

  // console.log(999, customerId);


  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* create_at */}
        <div className="flex flex-row items-center">
          <div className="flex-1 !m-3">
            {!! customerData?.data && !customer && (
              <SgAutocomplete
                name="customerId"
                label={ t('select_customer') }
                optionName="name"
                optionValue="id"
                size="small"
                options={customerData?.data || []}
                defaultValue={ service?.customerId ?? null }
                control={control}
              />
            )}
            {!!customer?.id && ( <strong className="ml-2"> { customer.name } </strong> ) }

          </div>
          <SgSelect
            key="statusService-select"
            control={control}
            name='typeId'
            label={t('type')}
            defaultValue={ service?.typeId || '' }
            required
            fieldId='id'
            fieldLabel='name'
            fieldDescription='description'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            list="typeService"
          />
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
            InputProps={AmountFormatCustom}
          />

          <SgSelect
            key="statusService-select"
            control={control}
            name='statusId'
            label={t('status')}
            defaultValue={ service?.statusId || '' }
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

        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="description"
            control={control}
            errors={errors}
            label={t('description')}
            rows={4}
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

};
