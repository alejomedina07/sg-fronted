import { Divider, Typography } from '@mui/material';
import { t } from 'i18next';
import { SgInput } from '../../../../../../../components/form/SgInput';
import { SgCheckbox } from '../../../../../../../components/form/SgCheckbox';

interface InitConfigStepProps {
  control: any;
  errors: any;
}

export const InitConfigStep = (props: InitConfigStepProps) => {
  const { control, errors } = props;
  return (
    <>
      <Divider />
      <div className="flex flex-row items-center justify-center">
        <Typography variant="h5" gutterBottom className="!mt-4">
          {t('init_config')}
        </Typography>
      </div>
      <Divider />
      <div className="flex flex-row items-center">
        <SgInput
          className="flex-1 !m-3"
          name="name"
          control={control}
          errors={errors}
          label={t('name')}
          required
          size="small"
        />
        <SgCheckbox label={t('status')} name="status" control={control} />
      </div>
      <div className="flex flex-row items-center">
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
    </>
  );
};
