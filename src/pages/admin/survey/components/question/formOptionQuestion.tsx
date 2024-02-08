import { SgInput } from '../../../../../components/form/SgInput';
import { t } from 'i18next';
import { SgCheckbox } from '../../../../../components/form/SgCheckbox';
import React from 'react';
import { Paper } from '@mui/material';

interface FormOptionQuestionProps {
  index: number;
  control: any;
  errors: any;
}

export const FormOptionQuestion = (props: FormOptionQuestionProps) => {
  const { index, control, errors } = props;
  return (
    <Paper
      elevation={3}
      className="flex-1 p-2 m-4"
      key={`paper-option-${index}`}
    >
      <b className="my-4"> {`${t('option')}  ${index + 1}`} </b>
      <div className="flex flex-row items-center">
        <SgInput
          className="flex-1 !m-3"
          name={`options[${index}].name`}
          control={control}
          errors={errors}
          label={t('name')}
          required
          size="small"
        />
        {/* <SgCheckbox label={t('status')} name="status" /> */}
        <SgCheckbox
          label={t('status')}
          name={`options[${index}].status`}
          control={control}
        />
      </div>
      <div className="flex flex-row items-center">
        <SgInput
          className="flex-1 !m-3"
          name={`options[${index}].description`}
          control={control}
          errors={errors}
          label={t('description')}
          required
          rows={2}
          size="small"
        />
      </div>
    </Paper>
  );
};
