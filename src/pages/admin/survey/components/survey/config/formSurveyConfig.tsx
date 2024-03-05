import { SgButton } from '../../../../../../components/form/button/SgButton';
import { t } from 'i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { SgTransition } from '../../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../../components/utils/dialogs/SgDialogTitle';
import useSnackbar from '../../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { surveyScheme } from '../../../validation/survey/SurveyScheme';
import {
  useAddSurveyMutation,
  useUpdateSurveyMutation,
} from '../../../redux/api/surveyApi';
import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StepContentComponent } from './stepper/stepContent';

interface FormSurveyComponentProps {
  open: boolean;
  handleClose: () => void;
  survey: any;
  categories: any;
}

interface SurveyContextProps {
  activeStep: number;
  control: any;
  errors: any;
  categories: any;
  setCategoriesSelected: (value: any) => void;
  categoriesSelected: any;
  setAnonymous: (value: boolean) => void;
  anonymous: boolean;
  setAllUsers: (value: boolean) => void;
  allUsers: boolean;
  setUsersSelected: (value: any) => void;
  usersSelected: any;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const FormSurveyConfig = (props: FormSurveyComponentProps) => {
  const { open, handleClose, survey, categories } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [categoriesSelected, setCategoriesSelected] = useState<any[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [usersSelected, setUsersSelected] = useState<number[]>([]);
  const [allUsers, setAllUsers] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { openSnackbarAction } = useSnackbar();
  const [addSurvey] = useAddSurveyMutation();
  const [updateSurvey] = useUpdateSurveyMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { status: true },
    resolver: yupResolver(surveyScheme),
  });

  useEffect(() => {
    if (survey?.id) {
      reset(survey);
    }
  }, [survey]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) {
        res = await updateSurvey(data).unwrap();
      } else {
        let formData: any = {
          survey: data,
          categoriesId: categoriesSelected.map((item: any) => item.id),
        };
        if (anonymous) formData.anonymous = true;
        else if (allUsers) formData.allUsers = true;
        else if (!allUsers && usersSelected.length >= 1)
          formData.users = usersSelected.map((item: any) => item.id);
        else throw { data: { message: 'Seleccione usuarios' } };
        res = await addSurvey(formData).unwrap();
      }

      openSnackbarAction({
        // message: `${t('created')}`,
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      reset();
      handleClose();
    } catch (e: any) {
      const message = e?.data?.message || `${t('error_save')}`;
      openSnackbarAction({ message, type: 'error' });
    }
  };

  return (
    <SurveyContext.Provider
      value={{
        activeStep,
        control,
        errors,
        categories,
        setCategoriesSelected,
        categoriesSelected,
        setAnonymous,
        anonymous,
        setAllUsers,
        allUsers,
        setUsersSelected,
        usersSelected,
      }}
    >
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth={'md'}
        TransitionComponent={SgTransition}
      >
        <SgDialogTitle id={'survey-dialog'} onClose={handleClose}>
          {t('create_survey')}
        </SgDialogTitle>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogContent dividers>
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>{t('init_config')}</StepLabel>
              </Step>
              <Step>
                <StepLabel>{t('categories')}</StepLabel>
              </Step>
              <Step>
                <StepLabel>{t('finish')}</StepLabel>
              </Step>
            </Stepper>
            <StepContentComponent />
            {!survey?.id && (
              <div className="flex flex-row justify-around mt-4">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  {t('back')}
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    activeStep === 2 ||
                    (!categoriesSelected.length && activeStep === 1) ||
                    (activeStep === 1 &&
                      !anonymous &&
                      !allUsers &&
                      !usersSelected.length)
                  }
                  onClick={handleNext}
                >
                  {'next'}
                </Button>
              </div>
            )}
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
            {(activeStep === 2 || survey?.id) && (
              <SgButton
                variant="contained"
                color="primary"
                type="submit"
                label={t('save')}
                // sending={isLoading}
              />
            )}
          </DialogActions>
        </form>
      </Dialog>
    </SurveyContext.Provider>
  );
};

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
