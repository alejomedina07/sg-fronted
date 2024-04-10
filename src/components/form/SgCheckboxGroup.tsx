import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataProps {
  id: number;
  name: string;
  description?: string;
}

interface SgCheckboxGroupProps {
  data: DataProps[];
  setData: (type: DataProps[]) => void;
}
export const SgCheckboxGroup = (props: SgCheckboxGroupProps) => {
  const { data, setData } = props;
  const [selectedData, setSelectedData] = useState<DataProps[]>([]);
  const { t } = useTranslation();

  const handleToggle = (turn: DataProps) => () => {
    const currentIndex = selectedData.findIndex(
      (item: DataProps) => item.id === turn.id
    );
    const newSelectedTurns = [...selectedData];

    if (currentIndex === -1) {
      newSelectedTurns.push(turn);
    } else {
      newSelectedTurns.splice(currentIndex, 1);
    }

    setSelectedData(newSelectedTurns);
    setData(newSelectedTurns);
  };

  const handleSelectAll = () => {
    setSelectedData(data);
    setData(data);
  };

  const handleDeselectAll = () => {
    setSelectedData([]);
    setData([]);
  };

  const isAllSelected = selectedData.length === data.length;

  return (
    <div className="flex-col border-2 rounded p-2 w-full">
      <FormControlLabel
        control={
          <Checkbox
            checked={isAllSelected}
            onChange={isAllSelected ? handleDeselectAll : handleSelectAll}
          />
        }
        label={t('select_all')}
      />
      <Box className="flex flex-row mt-1 pl-2">
        {data.map((turn) => (
          <FormControlLabel
            key={turn.id}
            control={
              <Checkbox
                checked={selectedData.some((t) => t.id === turn.id)}
                onChange={handleToggle(turn)}
              />
            }
            label={turn.name}
          />
        ))}
      </Box>
    </div>
  );
};
