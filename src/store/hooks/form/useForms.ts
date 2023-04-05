import useGlobalStore                                        from '../useGlobalStore';
import { setUserEdit }                                       from '../../slices/formSlice';

function useForms() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { userEdit } = useTypedSelector(({ core }: any) => core.forms);

  const setUserEditAction = (user: User) => dispatch( setUserEdit(user) )

  return {
    userEdit,
    setUserEditAction
  };
}

export default useForms;