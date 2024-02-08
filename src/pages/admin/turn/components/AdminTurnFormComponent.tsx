import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { SgInput } from '../../../../components/form/SgInput';
import { SgButton } from '../../../../components/form/button/SgButton';
import { Person } from '../dto/Person';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { PersonSchema } from '../validation/personSchema';

interface AdminTurnFormComponentProps {
  onSave: (data: Person) => void;
}

export const AdminTurnFormComponent = (props: AdminTurnFormComponentProps) => {
  const { onSave } = props;
  const { openSnackbarAction } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Person>({
    resolver: yupResolver(PersonSchema),
  });

  const submitForm = async (data: Person) => {
    try {
      // let res = await addUser(data).unwrap();
      openSnackbarAction({
        message: `${t('created')}`,
        type: 'success',
      });
      onSave(data);
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* firstName lastname */}
      <div className="flex flex-col sm:flex-row items-center">
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
  );
};
