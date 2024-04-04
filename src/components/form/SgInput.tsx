import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FORM_ELEMENT_TYPE = {
  TEXT: 'text',
  DECIMAL: 'decimal',
  PASSWORD: 'password',
  NUMBER: 'number',
};
const errorHelperTextStyles = {
  small: {
    fontSize: '0.75rem',
  },
  large: {
    fontSize: '1.2rem',
  },
};

export const SgInput = (props: any) => {
  const {
    control,
    errors,
    name,
    label,
    onChange,
    required = false,
    size = 'small',
    type = FORM_ELEMENT_TYPE.TEXT,
    rows,
    InputProps,
    errorLarge,
    ...rest
  } = props;
  const onValueChange = (e: any, field: any) => {
    if (
      type === FORM_ELEMENT_TYPE.NUMBER ||
      type === FORM_ELEMENT_TYPE.DECIMAL
    ) {
      const regex =
        type === FORM_ELEMENT_TYPE.DECIMAL ? /^[.0-9\b]+$/ : /^[0-9\b]+$/;

      if (e.target.value == '' || regex.test(e.target.value)) {
        field.onChange(e.target.value);

        if (onChange) {
          onChange(e.target.value);
        }
      }
    } else {
      if (onChange) {
        onChange(e.target.value);
      }

      //Asignar valor al controller
      field.onChange(e.target.value);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      rules={{ required: required }}
      render={({ field }) => (
        <TextField
          {...rest}
          {...field}
          size={size}
          multiline={!!rows}
          rows={rows || 1}
          label={required ? `${label}*` : label}
          onChange={(e) => onValueChange(e, field)}
          fullWidth
          type={
            type === FORM_ELEMENT_TYPE.PASSWORD
              ? FORM_ELEMENT_TYPE.PASSWORD
              : ''
          }
          error={Boolean(errors[name])}
          helperText={Boolean(errors[name]) && `${errors[name].message}`}
          FormHelperTextProps={{
            classes: {
              root: { margin: 0 },
            },
            style: errorLarge
              ? errorHelperTextStyles.large
              : errorHelperTextStyles.small,
          }}
          InputProps={InputProps ? { inputComponent: InputProps as any } : null}
        />
      )}
    />
  );
};
