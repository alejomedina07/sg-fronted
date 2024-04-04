import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { t } from 'i18next';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

interface CallTurnComponentProps {
  isOpen: boolean;
  text: string;
}

export const CallTurnComponent = (props: CallTurnComponentProps) => {
  const { isOpen, text } = props;
  const narrationRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (window.speechSynthesis.speaking) return;
    // Verificar si el navegador admite la síntesis de voz
    if ('speechSynthesis' in window) {
      // Crear una instancia de SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'es';

      // Asignar el texto que se desea narrar
      utterance.text = text;

      // Guardar la referencia del objeto SpeechSynthesisUtterance
      narrationRef.current = utterance;
      // Función para iniciar la síntesis de voz
      const initNarration = () => {
        console.log('initNarration');
        if (narrationRef.current) {
          window.speechSynthesis.speak(narrationRef.current);
        }
        // if (window.speechSynthesis.speaking) return; // Evitar iniciar la síntesis si ya está hablando
        // if (audioRef.current) {
        //   audioRef.current.play(); // Reproducir el sonido
        // }
        // if (utterance && !window.speechSynthesis.speaking) {
        //   window.speechSynthesis.speak(utterance); // Iniciar la síntesis de voz
        // }
      };

      // Iniciar la síntesis de voz al montar el componente
      initNarration();

      return () => {
        // Detener la síntesis de voz al desmontar el componente
        window.speechSynthesis.cancel();
      };
    } else {
      console.log('El navegador no admite la síntesis de voz.');
    }
  }, [text]);

  const onClose = () => {};

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
        <DialogContent dividers>
          <Typography sx={{ mb: 2 }} variant="h2" component="h2">
            {text}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
