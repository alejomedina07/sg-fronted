import { useNavigate, useParams } from 'react-router-dom';
import { useGetAccountsPayableByIdQuery } from '../redux/api/providerApi';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import { SgLink } from '../../../../components/form/button/SgLink';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListPaymentComponent } from '../components/payment/ListPaymentComponent';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { FormPaymentDialog } from '../components/payment/FormPaymentDialog';
import { SgButton } from '../../../../components/form/button/SgButton';

const dateManage = new DateFnsManager();

export const EditAccountPayable = () => {
  const { accountPayableId } = useParams();
  const { t } = useTranslation();
  const [idAccount, setIdAccount] = useState<any>();
  const [accountPayableFormatter, setAccountPayableFormatter] = useState<any>();
  const [openPayment, setOpenPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof accountPayableId === 'string')
      setIdAccount(parseInt(accountPayableId));
  }, [accountPayableId]);

  const { data, isLoading, refetch } = useGetAccountsPayableByIdQuery(
    idAccount,
    {
      skip: !idAccount,
    }
  );

  useEffect(() => {
    if (!openPayment && accountPayableFormatter) {
      refetch();
    }
  }, [openPayment]);

  useEffect(() => {
    if (data?.data) {
      setAccountPayableFormatter({
        ...data.data,
        payments: data.data.paymentAccountPayables.map(
          (item: any) => item.payment
        ),
      });
    }
  }, [data]);

  const getClassBg = () => {
    const diff = dateManage.getDateDifference(
      new Date(),
      new Date(accountPayableFormatter.maxDateOfPay)
    );
    return accountPayableFormatter.paid
      ? '!bg-green-100'
      : diff < 0
      ? '!bg-red-100'
      : '!bg-amber-100';
  };

  const handleOpenPayment = () => {
    if (!accountPayableFormatter.paid) setOpenPayment(true);
  };

  return (
    <>
      <ViewTitle title={t('view_account_payable')}>
        <SgLink
          label={t('list_account_payable')}
          to="/admin/providers/account-payable"
        />
      </ViewTitle>
      {!!isLoading && <Skeleton variant="rectangular" height={218} />}

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="info-content"
          id="info-header"
        >
          {t('info')}
        </AccordionSummary>
        <AccordionDetails>
          {!!accountPayableFormatter && (
            <div className="flex flex-row items-center">
              <span className="flex-1 m-2">
                <Card sx={{ minWidth: 275 }} className={getClassBg()}>
                  <CardActionArea onClick={handleOpenPayment}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {t('account_payable')} :{' '}
                        <b> {accountPayableFormatter.id} </b>
                        {t('created_at')} :{' '}
                        <b>
                          {' '}
                          {dateManage.getFormatStandard(
                            new Date(accountPayableFormatter.createdAt)
                          )}{' '}
                        </b>
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        className="!mt-2"
                      >
                        {t('amount')} :{' '}
                        <b> {accountPayableFormatter.amount} </b>
                      </Typography>
                      <Typography variant="h5" component="div">
                        {t('amount_paid')} :{' '}
                        <b> {accountPayableFormatter.amountPaid} </b>
                      </Typography>
                      <Typography color="text.secondary" className="!mt-2">
                        {t('description')} :{' '}
                        <b> {accountPayableFormatter.description} </b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {!accountPayableFormatter.paid && (
                    <CardActions>
                      <SgButton
                        variant="contained"
                        color="primary"
                        onClickAction={handleOpenPayment}
                        label={t('create_payment')}
                      />
                      {!!openPayment && (
                        <FormPaymentDialog
                          provider={accountPayableFormatter.provider}
                          open={openPayment}
                          handleClose={() => setOpenPayment(false)}
                        />
                      )}
                    </CardActions>
                  )}
                </Card>
              </span>
              <span className="flex-1 m-2">
                <Card sx={{ minWidth: 275 }}>
                  <CardActionArea
                    onClick={() =>
                      navigate(
                        `/admin/providers/edit/${accountPayableFormatter.provider?.id}`
                      )
                    }
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {t('ID')} :{' '}
                        <b> {accountPayableFormatter.provider?.id} </b>
                        {t('address')} :{' '}
                        <b> {accountPayableFormatter.provider?.address} </b>
                        {t('created_at')} :{' '}
                        <b>
                          {' '}
                          {dateManage.getFormatStandard(
                            new Date(accountPayableFormatter.provider.createdAt)
                          )}{' '}
                        </b>
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {t('document_number')} :{' '}
                        <b> {accountPayableFormatter.provider?.document} </b>
                        {t('email')} :{' '}
                        <b> {accountPayableFormatter.provider?.email} </b>
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        className="!mt-2"
                      >
                        {t('name')} :{' '}
                        <b> {accountPayableFormatter.provider.name} </b>
                      </Typography>
                      <Typography variant="h5" component="div">
                        {t('phone_number')} :{' '}
                        <b> {accountPayableFormatter.provider.phoneNumber} </b>
                      </Typography>
                      <Typography color="text.secondary" className="!mt-2">
                        {t('description')} :{' '}
                        <b> {accountPayableFormatter.provider.description} </b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </span>
            </div>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="payments-content"
          id="payments-header"
        >
          {t('payments')}
        </AccordionSummary>
        <AccordionDetails>
          {!!accountPayableFormatter?.payments?.length && (
            <ListPaymentComponent
              paymentsData={accountPayableFormatter?.payments || []}
            />
          )}
          {!accountPayableFormatter?.payments?.length && !isLoading && (
            <Typography variant="h5" component="div">
              <b> {t('not_payments_related')} </b>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
