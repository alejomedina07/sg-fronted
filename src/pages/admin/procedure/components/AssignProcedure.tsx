import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogContent,
  TextField,
} from '@mui/material';

import { SgButton } from '../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import {
  useAssignProcedureMutation,
  useGetProcedureByIdQuery,
} from '../redux/api/procedureApi';
import React, { useEffect, useState } from 'react';
import { SgTable } from '../../../../components/table/SgTable';

interface FormProcedureProps {
  procedure: any;
  allProcedures: any[];
  columnsProcedure: any;
  open: boolean;
  handleClose: () => void;
}

export const AssignProcedure = (props: FormProcedureProps) => {
  const { procedure, open, handleClose, columnsProcedure, allProcedures } =
    props;
  const [proceduresSelected, setProceduresSelected] = useState<number[]>([]);
  const [proceduresFiltered, setProceduresFiltered] = useState<any>();
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();
  const [assignProcedure] = useAssignProcedureMutation();

  const { data } = useGetProcedureByIdQuery(procedure?.id, {
    skip: !procedure?.id,
  });

  useEffect(() => {
    if (data?.data && allProcedures) {
      const idsInData2 = new Set(
        data?.data.children.map((item: any) => item.id)
      );
      const filteredData = allProcedures.filter(
        (item: any) => !idsInData2.has(item.id) && !item.parent
      );
      setProceduresFiltered([...filteredData]);
    }
  }, [data]);

  const submitForm = async () => {
    try {
      console.log(1234, proceduresSelected);
      let children: any = [];
      proceduresSelected.forEach((item: any) => {
        children.push({
          procedureIdParentId: procedure.id,
          procedureIdChildrenId: item.id,
        });
      });
      const res = await assignProcedure(children).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      setProceduresSelected([]);
      handleClose();
    } catch (e) {
      console.log(123456);
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'procedure-dialog'} onClose={handleClose}>
        {t('assign_procedure')}
      </SgDialogTitle>
      <DialogContent dividers>
        <div className="flex flex-col mb-4 sm:flex-row items-center">
          <Autocomplete
            multiple
            className="flex-1"
            size="small"
            id="fixed-tags-demo"
            value={proceduresSelected}
            onChange={(event, newValue) => {
              setProceduresSelected([...newValue]);
            }}
            // options={[]}
            options={proceduresFiltered || []}
            getOptionLabel={(option: any) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option: any, index) => (
                <Chip label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('procedures')}
                placeholder={t('procedures') || ''}
              />
            )}
          />
          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            className="!mx-4"
          >
            {t('close')}
          </Button>
          <SgButton
            variant="contained"
            color="primary"
            label={t('assign')}
            // sending={isLoading}
            onClickAction={submitForm}
            disabled={!proceduresSelected.length}
          />
        </div>
        <div
          style={{
            height: '70vh',
            width: '100%',
            minWidth: '700px',
          }}
        >
          <SgTable
            columns={columnsProcedure}
            data={data?.data?.children || []}
            // onRowDoubleClick={handleRowDoubleClick}
            isLoading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
