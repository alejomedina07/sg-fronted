import { Control, FieldErrors, FieldValues } from 'react-hook-form';
import { t } from 'i18next';
import { SgSelect } from '../../../../../../components/form/SgSelect';
import React, { useEffect, useState } from 'react';

interface UniqueChoiceProps {
  name: string;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues> | any;
  options: any[];
}

export const UniqueChoice = (props: UniqueChoiceProps) => {
  const { name, control, errors, options } = props;
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
      <SgSelect
        key="privilegesId-select"
        control={control}
        name={name}
        required
        label={t('select_choice')}
        fieldId="id"
        fieldLabel="name"
        className="flex-1 !m-3"
        size="small"
        errors={errors}
        options={options}
      />
      {showMessageError && (
        <span className="text-red-600"> {t('field_is_required')} </span>
      )}
    </>
  );
};
