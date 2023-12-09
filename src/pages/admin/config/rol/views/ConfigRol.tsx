import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { t } from 'i18next';
import { FormRolComponent } from '../components/FormRolComponent';
import { ListRolComponent } from '../components/ListRolComponent';
import { useEffect, useState } from 'react';
import UseRol from '../redux/hooks/useRol';
import { FormPermissionComponent } from '../components/FormPermissionComponent';
import { ListPermissionComponent } from '../components/ListPermissionComponent';

export const ConfigRol = () => {
  const [accordionRol, setAccordionRol] = useState(true);
  const [accordionPermission, setAccordionPermission] = useState(true);

  const { clearRolAction } = UseRol();

  useEffect(() => {
    clearRolAction();
  }, []);

  return (
    <>
      <Accordion
        className="mb-2 !w-full"
        style={{ width: '100%' }}
        expanded={accordionRol}
        onChange={() => setAccordionRol(!accordionRol)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="h3">{t('Roles')}</Typography>
        </AccordionSummary>
        <AccordionDetails className="!w-full" style={{ width: '100%' }}>
          <div className="flex flex-col md:flex-row items-start">
            <div className="shadow-md mr-2 w-full md:w-3/4 lg:w-3/4 xl:w-3/4">
              <ListRolComponent />
            </div>
            <div className="shadow-md w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
              <FormRolComponent />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion
        className="mt-2"
        expanded={accordionPermission}
        onChange={() => setAccordionPermission(!accordionPermission)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content2"
          id="panel1a-header2"
        >
          <Typography>{t('Permission')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col md:flex-row items-start">
            <div className="shadow-md mr-2 w-full md:w-3/4 lg:w-3/4 xl:w-3/4">
              <ListPermissionComponent />
            </div>
            <div className="shadow-md w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
              <FormPermissionComponent />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
