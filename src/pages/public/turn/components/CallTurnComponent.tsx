import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { Dialog, DialogContent, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CallTurnComponentProps {
  isOpen: boolean;
  text: string;
}

export const CallTurnComponent = (props: CallTurnComponentProps) => {
  const { isOpen, text } = props;
  const { t } = useTranslation();
  const narrationRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isMounted = useRef(false);
  const [speaking, setSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    if (!synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
    }
  }, []);

  // useEffect(() => {
  //   // Verificar si el navegador admite la síntesis de voz
  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //     return;
  //   }
  //   if ('speechSynthesis' in window) {
  //     // Crear una instancia de SpeechSynthesisUtterance
  //     const utterance = new SpeechSynthesisUtterance();
  //     utterance.lang = 'es';
  //
  //     // Asignar el texto que se desea narrar
  //     utterance.text = text;
  //
  //     // Guardar la referencia del objeto SpeechSynthesisUtterance
  //     narrationRef.current = utterance;
  //
  //     // Función para iniciar la síntesis de voz
  //     const initNarration = () => {
  //       if (narrationRef.current && !window.speechSynthesis.speaking) {
  //         speechSynthesis.speak(narrationRef.current);
  //       }
  //     };
  //     // Iniciar la síntesis de voz después de la primera renderización
  //     if (isOpen) {
  //       initNarration();
  //     }
  //
  //     // Retornar una función de limpieza
  //     return () => {
  //       // Detener la síntesis de voz al desmontar el componente
  //       window.speechSynthesis.cancel();
  //     };
  //   } else {
  //   }
  // }, [text, isOpen]);

  const onClose = () => {};

  return (
    <>
      {/* <Speech text="Welcome to react speech" /> */}
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
