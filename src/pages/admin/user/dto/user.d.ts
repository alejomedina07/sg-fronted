interface User {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  documentTypeId: number;
  documentNumber: string;
  password: string;
  statusId: number;
  rolId: number;
  passwordConfirm?: string;
  bloodType?: string;

}