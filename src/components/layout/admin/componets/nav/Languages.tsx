import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLocation, useNavigate } from 'react-router-dom';
import i18next from '../../../../../config/i18n/i18n';

const options = [
  { value: 'es', label: 'spanish' },
  { value: 'en', label: 'english' },
];
const ITEM_HEIGHT = 48;
export const Languages = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = async (option: string) => {
    await i18n.changeLanguage(option); // lo cambié
    localStorage.setItem('languageDefault', option);
    navigate(location.pathname);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TranslateIcon className="text-white" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => changeLanguage(option.value)}
          >
            {t(option.label)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
