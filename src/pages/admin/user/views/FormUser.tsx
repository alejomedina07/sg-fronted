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


const defaultValues: User = {
  "firstName": "",
  "lastName": "",
  "phoneNumber": "",
  "address": "",
  "email": "",
  "documentTypeId" : 0,
  "rolId" : 0,
  "statusId" : 0,
  "documentNumber": "",
  "password": "",
  "passwordConfirm":""
}

export const FormUser = () => {
  const { handleSubmit, control, formState:{ errors } } = useForm<User>( {
    defaultValues,
    resolver: yupResolver(userSchema)
  });
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();

  console.log(1, errors);

  const [ addUser, { isLoading } ] = useAddUserMutation()

  const submitForm  = async (data: any) => {
    try {
      console.log(777, data);
      const res = await addUser( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || 'Creado', typeAction: 'success' })
      navigate('/admin/users')
    } catch (e) {
      openSnackbarAction({ messageAction: 'Error al guardar', typeAction: 'error' })
    }
  }
  
  return (
    <>
      <ViewTitle title="create_user">
        {/* <SgButton label="list_user" href="/admin/users"/> */}
        <SgLink label="list_user" to="/admin/users"/>
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* firstName lastname */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-2"
            name="firstName"
            control={control}
            errors={errors}
            label="first_name"
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="lastName"
            control={control}
            errors={errors}
            label="last_name"
            required
            size="small"
          />
        </div>
        {/* phoneNumber status */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-2"
            name="phoneNumber"
            control={control}
            errors={errors}
            label="phoneNumber"
            required
            size="small"
          />
          <SgSelect
            key="filter-field-select"
            control={control}
            name='statusId'
            label="status"
            required
            fieldId='id'
            fieldLabel='name'
            className="flex-1 !m-2"
            size='small'
            errors={errors}
            list="status"
          />
          <SgSelect
            key="rolId-select"
            control={control}
            name='rolId'
            label="rol"
            required
            fieldId='id'
            fieldLabel='name'
            fieldDescription='description'
            className="flex-1 !m-2"
            size='small'
            errors={errors}
            list="rol"
          />
        </div>

        {/* documentType documentNumber */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name='documentTypeId'
            label="documentType"
            required
            fieldId='id'
            fieldLabel='name'
            fieldDescription='description'
            className="flex-1 !m-2"
            size='small'
            errors={errors}
            list="documentType"
          />
          <SgInput
            className="flex-1 !m-2"
            name="documentNumber"
            control={control}
            errors={errors}
            label="documentNumber"
            required
            size="small"
          />
        </div>
        {/* email address */}
        <div className="flex flex-row items-center">
          <SgInput
            className="flex-1 !m-2"
            name="email"
            control={control}
            errors={errors}
            label="email"
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="address"
            control={control}
            errors={errors}
            label="address"
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
            label="password"
            required
            type="password"
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="passwordConfirm"
            control={control}
            errors={errors}
            label="passwordConfirm"
            required
            type="password"
            size="small"
          />
        </div>

        <div className="mt-4 mb-4 flex flex-row items-end justify-end">
          <SgButton variant="contained" color="primary" type="submit" label="Guardar" sending={isLoading}/>
        </div>
      </form>
    </>
  );
};
