import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface dataGroupedProps {
  name: string;
  data: DataProps[];
}

interface DataProps {
  id: number;
  name: string;
  description?: string;
  typeName: string;
}

interface SgCheckboxGroupProps {
  data: DataProps[];
  setData: (type: DataProps[]) => void;
  selectedData: any[];
  setSelectedData: (type: DataProps[]) => void;
}

export const SgCheckboxGroup = (props: SgCheckboxGroupProps) => {
  const { data, setData, selectedData, setSelectedData } = props;
  // const [selectedData, setSelectedData] = useState<DataProps[]>([]);
  const [dataGrouped, setDataGrouped] = useState<dataGroupedProps[]>();
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

  useEffect(() => {
    const groupedData: dataGroupedProps[] = data.reduce(
      (acc: dataGroupedProps[], curr) => {
        // Buscar si ya existe una entrada para el typeName actual en el array acc
        const existingEntryIndex = acc.findIndex(
          (entry: any) => entry.name === curr.typeName
        );

        if (existingEntryIndex !== -1) {
          // Si ya existe una entrada para este typeName, simplemente agregamos el objeto actual a su arreglo de datos
          acc[existingEntryIndex].data.push(curr);
        } else {
          // Si no existe una entrada para este typeName, creamos una nueva entrada en el array acc
          acc.push({
            name: curr.typeName,
            data: [curr],
          });
        }
        return acc;
      },
      []
    );
    setDataGrouped(groupedData);
  }, [data]);

  return (
    <div className="flex flex-col border-2 rounded p-2 w-full">
      {dataGrouped?.map((item, index) => (
        <div
          className="pl-2 flex-1 flex flex-col w-full mb-2 border-r"
          key={`select-${item.name}`}
        >
          <b> {item.name} </b>
          {/* <FormControlLabel */}
          {/*   control={ */}
          {/*     <Checkbox */}
          {/*       checked={isAllSelected} */}
          {/*       onChange={isAllSelected ? handleDeselectAll : handleSelectAll} */}
          {/*     /> */}
          {/*   } */}
          {/*   label={t('select_all')} */}
          {/* /> */}
          <Box className="flex flex-row mt-1 pl-2 ">
            {item.data.map((turn) => (
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
          <Divider />
        </div>
      ))}
    </div>
  );
};
