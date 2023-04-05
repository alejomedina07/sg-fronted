import { SgButton }           from '../../../../components/form/button/SgButton';
import { ViewTitle }          from '../../components/share/title/ViewTitle';
import { SgLink }             from '../../../../components/form/button/SgLink';
import { SgInput }            from '../../../../components/form/SgInput';
import { useForm }            from 'react-hook-form';
import { useAddUserMutation } from '../redux/api/userApi';
import { userSchema }         from '../validation/userScheme';
import { yupResolver }        from '@hookform/resolvers/yup';
import useSnackbar            from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }        from 'react-router-dom';
import { SgSelect }           from '../../../../components/form/SgSelect';
import { BLOOD_TYPES }        from '../../../../utils/consts/shared/bloodTypes';
import { defaultValues }      from '../helpers/userConst';
import { t }                  from 'i18next';


export const FormUser = () => {
  const { handleSubmit, control, formState:{ errors } } = useForm<User>( {
    defaultValues,
    resolver: yupResolver(userSchema)
  });
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();

  const [ addUser, { isLoading } ] = useAddUserMutation()

  const submitForm  = async (data: any) => {
    try {
      const res = await addUser( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || `${t('created')}`, typeAction: 'success' })
      navigate('/admin/users')
    } catch (e) {
      openSnackbarAction({ messageAction: `${t('error_save')}`, typeAction: 'error' })
    }
  }
  
  return (
    <>
      <ViewTitle title={t('create_user')}>
        {/* <SgButton label="list_user" href="/admin/users"/> */}
        <SgLink label={t('list_user')} to="/admin/users"/>
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* firstName lastname */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="firstName"
            control={control}
            errors={errors}
            label={t('first_name')}
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-3"
            name="lastName"
            control={control}
            errors={errors}
            label={t('last_name')}
            required
            size="small"
          />
        </div>
        {/* statusId rolId */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="filter-field-select"
            control={control}
            name='statusId'
            label={t('status')}
            required
            fieldId='id'
            fieldLabel='name'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            list="statusUser"
          />
          <SgSelect
            key="rolId-select"
            control={control}
            name='rolId'
            label={t('rol')}
            required
            fieldId='id'
            fieldLabel='name'
            fieldDescription='description'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            list="rol"
          />
        </div>
        {/* phoneNumber bloodType */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t('phone_number')}
            required
            size="small"
          />
          <SgSelect
            key="bloodType-select"
            control={control}
            name='bloodType'
            label={t('blood_type')}
            required
            fieldId='value'
            fieldLabel='value'
            className="flex-1 !m-3"
            size='small'
            errors={errors}
            options={ BLOOD_TYPES }
          />
        </div>


        {/* documentType documentNumber */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name='documentTypeId'
            label={t('document_type')}
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
            name="documentNumber"
            control={control}
            errors={errors}
            label={t('document_number')}
            required
            size="small"
          />
        </div>
        {/* email address */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="email"
            control={control}
            errors={errors}
            label={t('email')}
            required
            size="small"
          />
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
        {/* password */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-2"
            name="password"
            control={control}
            errors={errors}
            label={t('password')}
            required
            type="password"
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="passwordConfirm"
            control={control}
            errors={errors}
            label={t('password_confirm')}
            required
            type="password"
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
