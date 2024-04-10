import { Person } from '../dto/Person';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { SgInput } from '../../../../components/form/SgInput';
import { SgButton } from '../../../../components/form/button/SgButton';
import React from 'react';
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  Divider,
} from '@mui/material';
import { useAddFinishAttentionMutation } from '../redux/api/turnApi';

interface MyTurnProps {
  turnSelected: Person;
  onFinishTurn: (person: Person) => void;
  config: any;
  callAgain: (person: Person) => void;
}

export const MyTurn = (props: MyTurnProps) => {
  const { turnSelected, onFinishTurn, config, callAgain } = props;
  const { t } = useTranslation();
  const [addFinishAttention, { isLoading }] = useAddFinishAttentionMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitForm = async (data: any) => {
    try {
      console.log('MyTurn:::', turnSelected);
      console.log(data);
      let isFinish = true,
        attention: any = {
          turnId: turnSelected.id,
          typeTurnId: config.typeTurnId,
          description: data.description,
        };
      const updatedTypeTurns = turnSelected.typeTurns?.map((item: any) => {
        if (config.typeTurnId === item.id) {
          console.log(9999, item);
          attention = {
            ...attention,
            attentById: item.takeBy.id,
            id: item.attentionId,
          };
          item = {
            ...item,
            attended: true,
            attendedComment: data.description,
            finishAt: new Date(),
            inAttention: false,
          };
        }
        if (!item.attended) isFinish = false;
        return item;
      });
      console.log(7777, attention);
      await addFinishAttention({ ...attention, isFinish }).unwrap();
      onFinishTurn({
        ...turnSelected,
        typeTurns: updatedTypeTurns,
        isFinish,
        inAttention: false,
      });
    } catch (e) {}
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(submitForm)}>
        <CardContent>
          <div className="mb-4 flex flex-row items-center">
            <Typography variant="h5" component="div" className="flex-1">
              {t('name')}: <b> {turnSelected.name} </b>{' '}
            </Typography>
            <Typography variant="h5" component="div" className="flex-1">
              {t('document_number')}: <b> {turnSelected.document} </b>{' '}
            </Typography>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <Typography variant="h5" component="div" className="flex-1">
              {t('company')}: <b> {turnSelected.company} </b>{' '}
            </Typography>
            <Typography variant="h5" component="div" className="flex-1">
              {t('note')}: <b> {turnSelected.note} </b>{' '}
            </Typography>
          </div>
          <Divider />

          <div className="mt-4 flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="description"
              control={control}
              errors={errors}
              label={t('description')}
              required
              rows={5}
              size="small"
            />
          </div>
        </CardContent>
        <CardActions>
          <SgButton
            variant="contained"
            color="inherit"
            onClickAction={() => callAgain(turnSelected)}
            label={t('call_again')}
            sending={isLoading}
          />
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('finish_turn')}
            sending={isLoading}
          />
        </CardActions>
      </form>
    </Card>
  );
};
