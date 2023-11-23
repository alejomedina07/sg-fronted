import { useGetInventoryByIdQuery } from '../redux/api/inventoryApi';
import { useParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { FormInventory } from './FormInventory';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import { ViewInventoryInOut } from '../components/ViewInventoryInOut';

export const ViewInventory = () => {
  const { inventoryId } = useParams();
  const { data, isLoading, refetch } = useGetInventoryByIdQuery(inventoryId);
  const [value, setValue] = useState(0);
  const [inventory, setInventory] = useState();
  const [inventoryInOut, setInventoryInOut] = useState();

  useEffect(() => {
    if (data?.data) {
      const { inventory: nInventory, inventoryInOut: nInventoryInOut } =
        data?.data;
      setInventory({ ...nInventory });
      setInventoryInOut(nInventoryInOut);
    }
  }, [data]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            icon={<PermContactCalendarIcon />}
            iconPosition="start"
            label={t('edit_inventory')}
          />
          <Tab
            icon={<CompareArrowsIcon />}
            iconPosition="start"
            label={t('inventory_in_out')}
          />
        </Tabs>
      </Box>
      <SgTabPanel value={value} index={0}>
        {!!inventory && <FormInventory inventoryEdit={inventory} />}
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
        {!!inventory && (
          <ViewInventoryInOut
            data={inventoryInOut || []}
            inventory={inventory}
            refresh={refetch}
          />
        )}
      </SgTabPanel>
    </>
  );
};
