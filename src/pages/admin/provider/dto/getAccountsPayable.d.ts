interface GetAccountsPayable {
  limit?: number;
  page?: number;
  filters?: AccountPayableFilters;
}

interface AccountPayableFilters {
  id?: number;
  providerId?: number;
  description?: string;
  amount?: string;
  paid?: boolean;
}
