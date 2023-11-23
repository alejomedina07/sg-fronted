import { Controller } from 'react-hook-form';
import { Switch, SwitchProps } from '@mui/material';

interface SgSwitchProps extends Omit<SwitchProps, 'label'> {
  label: string;
  name: string;
  control: any;
  onChange?: (e: any) => void;
}

export const SgSwitch = (props: SgSwitchProps) => {
  const { label, name, control, onChange, defaultChecked } = props;

  const handleChange = (e: boolean) => {
    if (onChange) onChange(e);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultChecked || false}
      render={({ field: { value, onChange } }) => (
        <span>
          <Switch
            checked={value}
            onChange={(e) => {
              const { checked } = e.target;
              onChange(checked);
              handleChange(checked);
            }}
            {...props}
          />
          {label}
        </span>
      )}
    />
  );
};
