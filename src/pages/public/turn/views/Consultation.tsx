import { Link } from 'react-router-dom';
import { SgToolbar } from '../../../../components/shared/toolbar/SgToolbar';
import * as React from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { DocumentConsultation } from '../components/DocumentConsultation';

export const Consultation = () => {
  const [consultation, setConsultation] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <SgToolbar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="bg-gray-100"
        sx={{ minHeight: '91vh', padding: 4 }}
      >
        <Grid
          item
          className="box-shadow "
          xs={3}
          sx={{
            width: { sm: 850, xs: '95%' },
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
          }}
        >
          <div className="flex sm:flex-row flex-col items-center rounded my-4 justify-around !w-full">
            {consultation ? (
              <DocumentConsultation setConsultation={setConsultation} />
            ) : (
              <>
                <SgButton
                  variant="contained"
                  color="primary"
                  label="consultar proceso"
                  onClickAction={() => setConsultation(true)}
                  classes="w-full sm:w-auto "
                />

                <Link
                  to="/pre-turn"
                  className="hover:underline w-full sm:w-auto mt-4 sm:mt-0"
                >
                  <SgButton
                    variant="contained"
                    color="primary"
                    label="generar turno"
                    classes="w-full"
                    // sending={isLoading}
                  />
                </Link>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};
