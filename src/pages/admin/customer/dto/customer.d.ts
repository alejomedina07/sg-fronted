interface Customer {
  id?: number;
  name: string;
  bloodType?: string;
  document: string;
  documentTypeId?: number;
  address: string;
  phoneNumber: string;
  statusId?: number;
  services?: any[]
  appointments?: any[]
}