import { SgButton }           from '../../../../components/form/button/SgButton';
import { ViewTitle }          from '../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { useAddUserMutation, useUpdateUserMutation }     from '../redux/api/userApi';
import { userSchema }             from '../validation/userScheme';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { SgSelect }               from '../../../../components/form/SgSelect';
import { BLOOD_TYPES }            from '../../../../utils/consts/shared/bloodTypes';
import { defaultValues }          from '../helpers/userConst';
import { useEffect, useState }    from 'react';
import useForms                   from '../../../../store/hooks/form/useForms';


export const FormUser = () => {
  const { userId } = useParams();
  const { userEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] = useState<User>();

  const { handleSubmit, control, formState:{ errors }, reset } = useForm<User>( {
    defaultValues: defaultValuesActive,
    resolver: yupResolver(userSchema)
  });


  useEffect(() => {
    if (userId && userEdit && userId === `${userEdit.id}`) {
      setDefaultValuesActive(userEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [userId, userEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();

  const [ addUser, { isLoading } ] = useAddUserMutation()
  const [ updateUser ] = useUpdateUserMutation()

  const submitForm  = async (data: any) => {
    try {
      console.log(7777, data);
      let res;
      if (data.id) res = await updateUser( data ).unwrap();
      else res = await addUser( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || 'Creado', typeAction: 'success' })
      navigate('/admin/users');
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
            className="flex-1 !m-3"
            name="firstName"
            control={control}
            errors={errors}
            label="first_name"
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-3"
            name="lastName"
            control={control}
            errors={errors}
            label="last_name"
            required
            size="small"
          />
        </div>
        {/* statusId rolId */}
        <div className="flex flex-row items-center">
          <SgSelect
            key="filter-field-select"
            control={control}
            defaultValue={ userEdit?.statusId || '' }
            name='statusId'
            label="status"
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
            defaultValue={ userEdit?.rolId || '' }
            label="rol"
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
            label="phoneNumber"
            required
            size="small"
          />
          <SgSelect
            key="bloodType-select"
            control={control}
            name='bloodType'
            defaultValue={ userEdit?.bloodType || '' }
            label="bloodType"
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
            defaultValue={ userEdit?.documentTypeId || '' }
            label="documentType"
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
            label="documentNumber"
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
            label="email"
            required
            size="small"
          />
          <SgInput
            className="flex-1 !m-3"
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
            type="password"
            size="small"
          />
          <SgInput
            className="flex-1 !m-2"
            name="passwordConfirm"
            control={control}
            errors={errors}
            label="passwordConfirm"
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
