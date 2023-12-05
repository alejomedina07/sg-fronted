import useGlobalStore from '../../../../../../store/hooks/useGlobalStore';
import { selectRol, clearRol } from '../slices/rolSlice';

function useRol() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { rol, refresh } = useTypedSelector(({ core }: any) => core.rol);

  const selectRolAction = (payload: any) => dispatch(selectRol(payload));
  const clearRolAction = () => dispatch(clearRol());

  return {
    clearRolAction,
    refresh,
    rol,
    selectRolAction,
  };
}

export default useRol;
