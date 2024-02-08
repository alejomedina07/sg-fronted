import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
} from '@mui/material';
import {
  useAddAssignMutation,
  useGetUsersAssignedQuery,
} from '../../redux/api/surveyApi';
import { ListAssign } from './ListAssign';
import { useEffect, useState } from 'react';
import { useGetUserToListQuery } from '../../../appointment/redux/api/appointmentApi';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';

interface FormAssignSurveyProps {
  survey: any;
  open: boolean;
  handleClose: () => void;
}

export const FormAssignSurvey = (props: FormAssignSurveyProps) => {
  const { survey, open, handleClose } = props;
  const [usersSelected, setUsersSelected] = useState<number[]>([]);
  const [usersToAssignFilter, setUsersToAssignFilter] = useState<any>();
  const [addAssign] = useAddAssignMutation();
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();
  const { data: users } = useGetUsersAssignedQuery(survey?.id || 0, {
    skip: !survey?.id,
  });
  const { data: usersToAssign } = useGetUserToListQuery('');

  useEffect(() => {
    if (users?.data && usersToAssign?.data) {
      const idsInData2 = new Set(users.data.map((item: any) => item.id));
      const filteredData = usersToAssign.data.filter(
        (item: any) => !idsInData2.has(item.id)
      );
      setUsersToAssignFilter([...filteredData]);
    }
  }, [users, usersToAssign]);

  const handleAssign = async () => {
    try {
      const data = {
        users: usersSelected.map((item: any) => item.id),
        surveyId: survey.id,
      };
      const res = await addAssign(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      handleClose();
    } catch (e: any) {
      const message = e?.data?.message || `${t('error_save')}`;
      openSnackbarAction({ message, type: 'error' });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'survey-dialog'} onClose={handleClose}>
        {t('assign_survey')}
      </SgDialogTitle>
      <DialogContent dividers>
        {!!users && users.data && <ListAssign users={users.data} />}
        <br />
        <Divider />
        <br />
        <span className=" font-medium font-extrabold">
          {' '}
          {t('list_of_users_to_assign')}{' '}
        </span>
        <div className="mt-4 flex flex-row items-center">
          <Autocomplete
            multiple
            className="flex-1"
            id="fixed-tags-demo"
            value={usersSelected}
            onChange={(event, newValue) => {
              setUsersSelected([...newValue]);
            }}
            options={usersToAssignFilter || []}
            // options={usersToAssign?.data || []}
            getOptionLabel={(option: any) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option: any, index) => (
                <Chip label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('users')}
                placeholder={t('users') || ''}
              />
            )}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleClose}
          className="mx-4"
        >
          {t('close')}
        </Button>
        <SgButton
          variant="contained"
          color="primary"
          label={t('assign')}
          disabled={!usersSelected.length}
          // sending={isLoading}
          onClickAction={handleAssign}
        />
      </DialogActions>
    </Dialog>
  );
};
