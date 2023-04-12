import { SgButton }               from '../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { SgSelect }               from '../../../../components/form/SgSelect';
import { BLOOD_TYPES }            from '../../../../utils/consts/shared/bloodTypes';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../redux/api/customerApi';
import { customerSchema }         from '../validation/customerSchema';
import { defaultValues }          from '../helpers';
import { t }                      from 'i18next';
import { useEffect, useState }    from 'react';
import useForms                   from '../../../../store/hooks/form/useForms';

export const FormCustomer = () => {
  const { customerId } = useParams();
  const { customerEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Customer>();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [ addCustomer, { isLoading } ] = useAddCustomerMutation();
  const [ updateCustomer ] = useUpdateCustomerMutation();

  console.log('customerEdit', customerEdit);

  const { handleSubmit, control, formState:{ errors }, reset } = useForm<Customer>( {
    defaultValues:defaultValuesActive,
    resolver: yupResolver(customerSchema)
  });

  console.log('default values', defaultValuesActive);


  useEffect(() => {
    if (customerId && customerEdit && customerId === `${customerEdit.id}`) {
      setDefaultValuesActive(customerEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [customerId, customerEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm  = async (data: any) => {
    try {
      let res;
      if (data.id) res = await updateCustomer( data ).unwrap();
      else res = await addCustomer( data ).unwrap();
        openSnackbarAction({ message: res.msg || `${t('created')}`, type: 'success' })
      navigate('/admin/customer')
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' })
    }
  }
  
  return (
    <>
      <ViewTitle title={ customerId ?  t('edit_customer') : t('create_customer')}>
        <SgLink label={t('list_customer')} to="/admin/customer"/>
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* name phoneNumber */}
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
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t('phone_number')}
            required
            size="small"
          />

        </div>
        {/* documentType document */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name='documentTypeId'
            label= {t('document_type')}
            defaultValue={ customerEdit?.documentTypeId || '' }
            required
            fieldId='id'
            fieldLabel='name'
            fieldDescription='description'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            list="documentType"
          />
          <SgInput
            className="flex-1 !m-3"
            name="document"
            control={control}
            errors={errors}
            label= {t('document_number')}
            required
            size="small"
          />
        </div>
        {/* statusId bloodType */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="filter-field-select"
            control={control}
            name='statusId'
            label= {t('status')}
            defaultValue={ customerEdit?.statusId || '' }
            required
            fieldId='id'
            fieldLabel='name'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            list="statusCustomer"
          />
          <SgSelect
            key="bloodType-select"
            control={control}
            name='bloodType'
            label={t('blood_type')}
            defaultValue={ customerEdit?.bloodType || '' }
            fieldId='value'
            fieldLabel='value'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            options={ BLOOD_TYPES }
          />
        </div>
        {/* address */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="address"
            control={control}
            errors={errors}
            label={t('address')}
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
