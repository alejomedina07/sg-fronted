import { SgButton } from '../../form/button/SgButton';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { useGetTurnTypesListQuery } from '../../../pages/admin/turn/redux/api/turnApi';
import { SgAutocomplete } from '../../form/SgAutocomplete';
import { useForm } from 'react-hook-form';
import { SgInput } from '../../form/SgInput';
import DatePicker from 'react-datepicker';

interface SgFilterProps {
  filters: string;
  setFilters: (filters: string) => void;
  data: any[];
}

export const SgFilter = (props: SgFilterProps) => {
  const { data, filters, setFilters } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>();

  const { data: rooms, isLoading: isLoadingRooms } =
    useGetTurnTypesListQuery(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onSubmit = (data: any) => {
    console.log(123456, data);
    const searchParams = new URLSearchParams();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(`filters[${key}]`, value.toString());
        }
      }
    }

    const queryString = searchParams.toString();
    const filterParams = queryString ? `&${queryString}&filters[type]=AND` : '';

    console.log(1, filterParams);
    handleSetFilters(filterParams);
  };

  const handleSetFilters = (filterParams: string) => {
    console.log(2);
    setFilters(filterParams);
    toggleDrawer(false);
  };

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChangeDate = (event: Date | null) => {
    let createdAt = event;
    createdAt?.setHours(0);
    createdAt?.setMinutes(0);
    setValue('createdAt', createdAt?.toISOString());
    setStartDate(createdAt);
  };

  const handleDrawerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Si se hace clic dentro del Drawer, no lo cerramos
    event.stopPropagation();
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={handleDrawerClick}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center p-8 h-full">
          <span className="w-full mb-2">
            <SgAutocomplete
              name="typeTurnId"
              label={t('type_turn')}
              optionName="name"
              optionSubName="typeName"
              optionValue="id"
              size="small"
              errors={errors}
              options={rooms?.data || []}
              control={control}
            />
          </span>
          <SgInput
            className="flex-1 !m-3"
            name="turn"
            control={control}
            errors={errors}
            label={t('name')}
            size="small"
          />
          <span className="w-full flex-1 !m-3 border rounded border-gray-300 pr-3">
            <DatePicker
              selected={startDate}
              onChange={handleChangeDate}
              placeholderText={`${t('date')}`}
              className="m-2 w-full"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="es"
            />
          </span>
          <div className="w-full mt-4 flex flex-row items-center justify-between">
            <SgButton
              variant="outlined"
              color="info"
              onClickAction={toggleDrawer(false)}
              label={t('cerrar')}
            />
            <SgButton
              variant="outlined"
              color="primary"
              type="submit"
              label={t('filter')}
            />
          </div>
        </div>
      </form>
    </Box>
  );
  return (
    <>
      <SgButton
        variant="outlined"
        color="primary"
        onClickAction={toggleDrawer(true)}
        label={t('filter')}
      />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{ zIndex: 1300 }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};
