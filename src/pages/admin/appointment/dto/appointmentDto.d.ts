interface AppointmentEvent {
  appointment: AppointmentDto;
  start: Date | undefined;
  end: Date | undefined;
}

interface AppointmentDto {
  createdById?: number | null;
  appointmentTypeId?: number | null;
  assignedToId?: number | null;
  customerId?: number | null;
  description?: string | null;
  name: string;
  duration: number;
  date: Date | null;
  createdAt?: Date | string;
  id?: number;
  appointmentType?: AppointmentType | null;
  customer?: CustomerAppointment | null;
  addService?: boolean;
  service?: any;
}

interface AppointmentType {
  id?: number;
  name: string;
  description?: string | null;
  createdAt?: Date | string;
  status?: boolean;
}

interface CustomerAppointment {
  id?: number;
  name: string;
  documentTypeId: number | null;
  statusId: number;
  bloodType?: string;
  document: string | null;
  address: string | null;
  phoneNumber: string;
  createdAt?: Date | string;
  createdById?: number | null;
}

interface ServiceAppointment {
  addService: boolean;
  asksService: boolean;
}

interface AddServiceProps {
  valor: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
