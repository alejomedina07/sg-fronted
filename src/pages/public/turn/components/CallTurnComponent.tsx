import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { t } from 'i18next';
import { Dialog, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

interface CallTurnComponentProps {
  isOpen: boolean;
  text: string;
}

export const CallTurnComponent = (props: CallTurnComponentProps) => {
  const { isOpen, text } = props;

  const narradorRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Verificar si el navegador admite la síntesis de voz
    if ('speechSynthesis' in window) {
      // Crear una instancia de SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance();
      console.log(77778);
      utterance.lang = 'es';

      // Asignar el texto que se desea narrar
      utterance.text = text;

      // Guardar la referencia del objeto SpeechSynthesisUtterance
      narradorRef.current = utterance;

      // Función para iniciar la síntesis de voz
      const iniciarNarracion = () => {
        if (narradorRef.current) {
          window.speechSynthesis.speak(narradorRef.current);
        }
      };

      // Iniciar la síntesis de voz al montar el componente
      iniciarNarracion();

      return () => {
        // Detener la síntesis de voz al desmontar el componente
        window.speechSynthesis.cancel();
      };
    } else {
      console.log('El navegador no admite la síntesis de voz.');
    }
  }, []);

  const onClose = () => {
    console.log(1234);
  };

  return (
    <>
      <Dialog
        // onClose={handleClose}
        open={isOpen}
        fullWidth
        maxWidth={'md'}
        TransitionComponent={SgTransition}
      >
        <SgDialogTitle id={'CallTurnComponent-dialog'} onClose={onClose}>
          {t('add_appointment')}
        </SgDialogTitle>
        <Grid item xs={12} md={8} className="p-18">
          <Typography sx={{ mb: 2 }} variant="h2" component="h2">
            {text}
          </Typography>
        </Grid>
      </Dialog>
    </>
  );
};
