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
import { useAddCustomerMutation } from '../redux/api/customerApi';
import { customerSchema }         from '../validation/customerSchema';
import { defaultValues }          from '../helpers';
import { t }                      from 'i18next';

export const FormCustomer = () => {
  const { customerId } = useParams();
  console.log('customerId', customerId);
  const { handleSubmit, control, formState:{ errors } } = useForm<Customer>( {
    defaultValues,
    resolver: yupResolver(customerSchema)
  });
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();

  const [ addCustomer, { isLoading } ] = useAddCustomerMutation()

  const submitForm  = async (data: any) => {
    try {
      const res = await addCustomer( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || `${t('created')}`, typeAction: 'success' })
      navigate('/admin/customer')
    } catch (e) {
      openSnackbarAction({ messageAction: `${t('error_save')}`, typeAction: 'error' })
    }
  }
  
  return (
    <>
      <ViewTitle title={t('create_customer')}>
        {/* <SgButton label="list_user" href="/admin/users"/> */}
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
