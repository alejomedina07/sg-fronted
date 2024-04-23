import { useTranslation } from 'react-i18next';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Person } from '../dto/Person';
import { useAdminTurnViewContext } from '../view/AdminTurnView';
import { useState } from 'react';
import { SgButton } from '../../../../components/form/button/SgButton';

interface ReassignTurnProps {
  turn: Person;
  roomSelected: any;
  setRoomSelected: (item: any) => void;
}

export const ReassignTurn = (props: ReassignTurnProps) => {
  const { turn, roomSelected, setRoomSelected } = props;
  const { config, handleReassign, userConnected, rooms } =
    useAdminTurnViewContext();
  const [newRoomSelected, setNewRoomSelected] = useState<any>();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRoom = rooms?.data.filter(
      (item: any) =>
        item.id === parseInt((event.target as HTMLInputElement).value)
    );
    setValue((event.target as HTMLInputElement).value);
    setNewRoomSelected(newRoom[0]);
  };

  const reassign = () => {
    const newTypeTurns = turn.typeTurns.filter(
      (item: any) => item.id !== roomSelected.id
    );
    console.log(7894, newTypeTurns);
    handleReassign({
      ...turn,
      typeTurns: [...newTypeTurns, { ...newRoomSelected, attended: false }],
    });
    setRoomSelected(null);
  };

  return (
    <span className="rounded border p-4 flex flex-col mb-4">
      <div className="flex flex-row justify-center">
        <b>
          <PublishedWithChangesIcon color="primary" /> {t('reassign')} -
          {roomSelected?.name}
        </b>
      </div>
      <div className="flex flex-row items-center">
        <span>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              {t('rooms')}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={newRoomSelected}
              onChange={handleChange}
            >
              {rooms?.data.map((item: any) => {
                // Verifica si item.id es diferente de roomSelected.id y si item.typeTurnId existe
                if (
                  item.id !== roomSelected.id &&
                  item.typeTurnId == roomSelected.typeTurnId
                ) {
                  return (
                    <FormControlLabel
                      key={item.id}
                      value={item.id.toString()}
                      control={<Radio />}
                      label={item.name}
                    />
                  );
                } else return null;
              })}
            </RadioGroup>
          </FormControl>
        </span>
      </div>
      <div className="flex flex-row items-center mt-2">
        <SgButton
          variant="contained"
          color="primary"
          label={t('update')}
          onClickAction={reassign}
          disabled={!newRoomSelected}
        />
      </div>
    </span>
  );
};
