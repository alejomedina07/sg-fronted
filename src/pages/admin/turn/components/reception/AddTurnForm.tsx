import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SgInput } from '../../../../../components/form/SgInput';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { Person } from '../../dto/Person';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { PersonSchema } from '../../validation/personSchema';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import {
  useAddTurnMutation,
  useGetTurnTypesListQuery,
} from '../../redux/api/turnApi';
import { TypeTurn } from '../../dto/TypeTurn';
import { useTranslation } from 'react-i18next';
import { SgTimePicker } from '../../../../../components/form/SgTimePicker';
import { SgCheckboxGroup } from '../../../../../components/form/SgCheckboxGroup';
import { LoadingTurn } from '../shared/LoadingTurn';

interface AdminTurnFormComponentProps {
  onSave: (data: Person) => void;
  setPerson: (data: Person | undefined) => void;
  person?: Person;
  loadingRooms: boolean;
}

export const AddTurnForm = (props: AdminTurnFormComponentProps) => {
  const { onSave, person, setPerson, loadingRooms } = props;
  const { openSnackbarAction } = useSnackbar();
  const [typeTurnsSelected, setTypeTurnsSelected] = useState<TypeTurn[]>([]);
  const { t } = useTranslation();

  const [timeAppointment, setTimeAppointment] = useState<Date>(new Date());
  const [hasAppointment, setHasAppointment] = useState(false);

  const handleTimeChange = (time: Date) => {
    setTimeAppointment(time);
    // Aquí puedes realizar cualquier otra lógica con la hora seleccionada
  };

  const { data: typeTurns } = useGetTurnTypesListQuery(false);

  const [addTurn, { isLoading }] = useAddTurnMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Person>({
    // defaultValues,
    defaultValues: person || {},
    resolver: yupResolver(PersonSchema),
  });

  const handleReset = () => {
    console.log(4);
    setPerson(undefined);
    // setDefaultValues(undefined);
    reset({});
  };

  useEffect(() => {
    if (person) {
      // setDefaultValues(person);
      reset(person);
    } else reset({});
  }, [person]);

  const submitForm = async (data: Person) => {
    try {
      // let res = await addUser(data).unwrap();
      if (!typeTurnsSelected?.length) return;
      const timeAppointmentSelect = hasAppointment
        ? `${timeAppointment.getHours()}:${timeAppointment.getMinutes()}`
        : null;
      const res = await addTurn({
        fullName: data.name,
        document: data.document,
        company: data.company,
        timeAppointment: timeAppointmentSelect,
        note: data.note,
      }).unwrap();
      console.log('Save new data');
      onSave({
        ...data,
        typeTurns: typeTurnsSelected,
        id: res.data.id,
        createdAt: res.data.createdAt,
        timeAppointment: timeAppointmentSelect,
        note: data.note,
        idPre: data.id,
      });
      handleReset();
      openSnackbarAction({
        message: `${t('created')}`,
        type: 'success',
      });
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{t('add_turn')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!!loadingRooms && <LoadingTurn />}
        <form onSubmit={handleSubmit(submitForm)}>
          {/* firstName lastname */}
          <div className="flex flex-row items-center">
            {/* <TransferList */}
            {/*   typeTurns={typeTurns?.data || []} */}
            {/*   setRight={setTypeTurnsSelected} */}
            {/*   right={typeTurnsSelected} */}
            {/* /> */}
            <SgCheckboxGroup
              data={typeTurns?.data || []}
              setData={setTypeTurnsSelected}
            />
          </div>
          <div className="flex flex-row items-center mt-2">
            <SgInput
              className="flex-1 !m-3"
              name="name"
              control={control}
              errors={errors}
              label={t('name')}
              required
              size="small"
            />
            <SgInput
              className="flex-1 !m-3"
              name="document"
              control={control}
              errors={errors}
              label={t('document')}
              required
              size="small"
            />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="company"
              control={control}
              errors={errors}
              label={t('company')}
            />
            <SgInput
              className="flex-1 !m-3"
              name="note"
              control={control}
              errors={errors}
              label={t('note')}
            />
          </div>

          <div className="flex flex-row items-center">
            <span>
              <Switch
                checked={hasAppointment}
                onChange={() => setHasAppointment(!hasAppointment)}
                name="hasAppointment"
              />
              {t('has_appointment')}
            </span>
            {hasAppointment && (
              <SgTimePicker
                onChange={handleTimeChange}
                selectedTime={timeAppointment}
              />
            )}
          </div>
          <div className="mt-4 mb-4 flex flex-row items-end justify-end">
            <SgButton
              classes="!mr-4"
              variant="contained"
              color="inherit"
              onClickAction={handleReset}
              label={t('clear')}
            />
            <SgButton
              variant="contained"
              color="primary"
              type="submit"
              label={t('save')}
              sending={isLoading}
            />
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
