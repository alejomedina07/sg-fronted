import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from 'i18next';
import { SgInput } from '../../../../components/form/SgInput';
import { SgButton } from '../../../../components/form/button/SgButton';
import React, { useState } from 'react';
import { useGetTurnTypesListQuery } from '../redux/api/turnApi';
import { SgAutocomplete } from '../../../../components/form/SgAutocomplete';

interface ConfigTurnFormProps {
  onSave: (data: any) => void;
}
export const ConfigTurnForm = (props: ConfigTurnFormProps) => {
  const { onSave } = props;
  const { data: typeTurns } = useGetTurnTypesListQuery(true);
  const [reception, setReception] = useState(true);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      reception,
      procedureId: reception ? null : data.procedureId,
    });
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="config-content"
        id="config-header"
      >
        <Typography>{t('config')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* firstName lastname */}
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="roomAppointMent"
              control={control}
              errors={errors}
              label={t('room')}
              required
              size="small"
            />

            {!reception && (
              <span className="flex-1 !m-3">
                <SgAutocomplete
                  name="typeTurnId"
                  label={t('type_turn')}
                  optionName="name"
                  optionValue="id"
                  size="small"
                  required
                  errors={errors}
                  options={typeTurns?.data || []}
                  control={control}
                />
              </span>
            )}
            <span>
              <Switch
                checked={reception}
                onChange={() => setReception(!reception)}
                name="anonymous"
              />
              {t('reception')}
            </span>
          </div>

          <div className="mt-4 mb-4 flex flex-row items-end justify-end">
            <SgButton
              variant="contained"
              color="primary"
              type="submit"
              label={t('save')}
              // sending={isLoading}
            />
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
