import useGlobalStore          from "../../../../../store/hooks/useGlobalStore";
import { addLogin, addLogout } from '../slices/authSlice';

function useAuth() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { authenticated, userConnected } = useTypedSelector(({ core }: any) => core.auth);

  const addLoginAction = (data: any) => dispatch( addLogin(data) )


  const addLogoutAction = () => dispatch( addLogout() )


  return {
    addLoginAction,
    addLogoutAction,
    authenticated,
    userConnected
  }

}

export default useAuth;