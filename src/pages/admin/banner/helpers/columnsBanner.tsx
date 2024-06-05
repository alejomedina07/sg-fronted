// import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';

// const dateManage = new DateFnsManager();

export const ColumnsBanner = () => {
  const { t } = useTranslation();

  const columns: ColumnsProps[] = [
    {
      field: 'id',
      headerName: t('id'),
      flex: 65,
    },
    {
      field: 'name',
      headerName: t('name'),
      flex: 100,
    },
    {
      field: 'description',
      headerName: t('description'),
      flex: 100,
    },
    {
      field: 'photo',
      headerName: t('photo'),
      flex: 100,
    },
  ];

  return columns;
};
