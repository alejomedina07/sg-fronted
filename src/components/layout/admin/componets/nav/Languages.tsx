import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const options = [
  { value: 'es', label: 'spanish' },
  { value: 'en', label: 'english' },
  { value: 'fr', label: 'french' },
  { value: 'pt', label: 'portuguese' },
];
const ITEM_HEIGHT = 48;
export const Languages = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [languageSelected, setLanguageSelected] = useState('en');
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

  useEffect(() => {
    const lg = localStorage.getItem('languageDefault');
    console.log(999, lg);
    if (lg) {
      setLanguageSelected(lg);
      localStorage.setItem('languageDefault', lg);
    }
  }, []);

  const changeLanguage = async (option: string) => {
    await i18n.changeLanguage(option);
    localStorage.setItem('languageDefault', option);
    setLanguageSelected(option);
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
            disabled={option.value === languageSelected}
            className={option.value === languageSelected ? '!bg-blue-100' : ''}
          >
            {t(option.label)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
