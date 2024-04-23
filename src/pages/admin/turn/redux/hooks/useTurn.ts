import useGlobalStore from '../../../../../store/hooks/useGlobalStore';
import {
  deleteConfig,
  setConfig,
  takenTurn,
  finishTurn,
  turnSliceProps,
} from '../slices/turnSlice';

function useTurn() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { turnInAttention, configuration } = useTypedSelector(
    ({ core }: any) => core.turn
  );

  const takenTurnAction = (payload: turnSliceProps) =>
    dispatch(takenTurn(payload));

  const finishTurnAction = () => dispatch(finishTurn());

  const setConfigAction = (payload: turnSliceProps) =>
    dispatch(setConfig(payload));

  const deleteConfigAction = () => dispatch(deleteConfig());

  return {
    configuration,
    turnInAttention,
    deleteConfigAction,
    finishTurnAction,
    setConfigAction,
    takenTurnAction,
  };
}

export default useTurn;
