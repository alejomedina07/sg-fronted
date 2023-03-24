import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook global de todo el store de la aplicación.
 *
 * Exporta funciones y hooks de uso constante
 */
function useGlobalStore() {
  const dispatch = useDispatch();

  const useTypedSelector = useSelector;

  return { dispatch, useTypedSelector };
}

export default useGlobalStore;
