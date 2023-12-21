import { ReactElement } from 'react';

export * from './nav/NavBarItem';
export * from './nav/NavItems';
export interface NavItem {
  id: number;
  name: string;
  link: string;
  privileges: {
    main: string;
    second: string;
    secondLink: string;
  };
  icon: ReactElement;
  iconMenu: ReactElement;
  onlyAdmin?: boolean;
}
