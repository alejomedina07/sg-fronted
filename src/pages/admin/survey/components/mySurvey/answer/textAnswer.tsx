import { Control, FieldErrors, FieldValues } from 'react-hook-form';
import { t } from 'i18next';
import { SgInput } from '../../../../../../components/form/SgInput';
import React, { useEffect, useState } from 'react';

interface TextAnswerProps {
  name: string;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues> | any;
}
export const TextAnswer = (props: TextAnswerProps) => {
  const { name, control, errors } = props;

  const [showMessageError, setShowMessageError] = useState<boolean>(false);

  useEffect(() => {
    let isError: boolean = false;
    const regex = /(\w+)\[(\d+)\]\.(\w+)/;

    const match = name.match(regex);

    if (match) {
      const capturedWordBeforeNumber = match[1];
      const capturedNumber = match[2];
      const capturedWordAfterDot = match[3];
      isError = Boolean(
        errors[capturedWordBeforeNumber]?.[capturedNumber]?.[
          capturedWordAfterDot
        ]
      );
    } else {
      isError = Boolean(errors[name]);
    }
    setShowMessageError(isError);
  }, [errors, name]);
  return (
    <>
      <SgInput
        className="flex-1 !m-3"
        name={name}
        control={control}
        errors={errors}
        label={t('comment')}
        required
        rows={3}
        size="small"
      />
      {showMessageError && (
        <span className="text-red-600"> {t('field_is_required')} </span>
      )}
    </>
  );
};
