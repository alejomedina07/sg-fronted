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
import { SgButton } from '../../../../components/form/button/SgButton';
import React, { useEffect, useState } from 'react';
import { SgAutocomplete } from '../../../../components/form/SgAutocomplete';
import { useAdminTurnViewContext } from '../view/AdminTurnView';
import { ApplicationConst } from '../../router/consts/ApplicationConst';

interface ConfigTurnFormProps {
  onSave: (data: any) => void;
}

const Application = new ApplicationConst();

export const ConfigTurnForm = (props: ConfigTurnFormProps) => {
  const { onSave } = props;
  const { userConnected, rooms } = useAdminTurnViewContext();
  const [reception, setReception] = useState(true);
  const [isUserAttention, setIsUserAttention] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Application.MAIN_ROL === userConnected.rol) return;
    const isAttention = Application.validatePermission(
      Application.PRIVILEGES.attentionCreate,
      userConnected.privileges,
      userConnected.rol,
      false
    );
    const isReception = Application.validatePermission(
      Application.PRIVILEGES.turnCreate,
      userConnected.privileges,
      userConnected.rol,
      false
    );
    if (!isAttention && isReception)
      return onSave({ roomAppointMent: '', reception: true });
    if (isAttention) {
      setReception(false);
      setIsUserAttention(true);
    }
  }, []);

  const onSubmit = (data: any) => {
    console.log(1234);
    let roomAppointMent = '';
    if (data.typeTurnId) {
      const room = rooms?.data.filter(
        (item: any) => item.id == data.typeTurnId
      );
      if (room?.length) {
        roomAppointMent = room[0].name;
      }
    }
    console.log(444, {
      ...data,
      roomAppointMent,
      reception,
    });
    onSave({
      ...data,
      roomAppointMent,
      reception,
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
          <div className="flex flex-row items-center">
            {!reception && (
              <span className="flex-1 !m-3">
                <SgAutocomplete
                  name="typeTurnId"
                  label={t('type_turn')}
                  optionName="name"
                  optionSubName="typeName"
                  optionValue="id"
                  size="small"
                  required
                  errors={errors}
                  options={rooms?.data || []}
                  control={control}
                />
              </span>
            )}
            {!isUserAttention && (
              <span>
                <Switch
                  checked={reception}
                  onChange={() => setReception(!reception)}
                  name="anonymous"
                />
                {t('reception')}
              </span>
            )}
          </div>

          <div className="mt-4 mb-4 flex flex-row items-end justify-end">
            <SgButton
              variant="contained"
              color="primary"
              type="submit"
              label={t('save')}
            />
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
