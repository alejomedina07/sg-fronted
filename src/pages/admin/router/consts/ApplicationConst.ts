import { NavItem } from '../../../../components/layout/admin/componets';

const PRIVILEGES = {
  userList: 'user.list',
  userCreate: 'user.create',
  userEdit: 'user.edit',
  userDelete: 'user.delete',
  appointmentList: 'appointment.list',
  appointmentCreate: 'appointment.create',
  appointmentEdit: 'appointment.edit',
  appointmentDelete: 'appointment.delete',
  customerList: 'customer.list',
  customerCreate: 'customer.create',
  customerEdit: 'customer.edit',
  customerDelete: 'customer.delete',
  expenseList: 'expense.list',
  expenseCreate: 'expense.create',
  expenseEdit: 'expense.edit',
  expenseDelete: 'expense.delete',
  inventoryList: 'inventory.list',
  inventoryCreate: 'inventory.create',
  inventoryEdit: 'inventory.edit',
  inventoryDelete: 'inventory.delete',
  inventory_in_outList: 'inventory_in_out.list',
  inventory_in_outCreate: 'inventory_in_out.create',
  inventory_in_outEdit: 'inventory_in_out.edit',
  inventory_in_outDelete: 'inventory_in_out.delete',
  serviceList: 'service.list',
  serviceCreate: 'service.create',
  serviceEdit: 'service.edit',
  serviceDelete: 'service.delete',
  reportList: 'report.list',
  reportCreate: 'report.create',
  reportEdit: 'report.edit',
  reportDelete: 'report.delete',
  turnList: 'turn.list',
  turnCreate: 'turn.create',
  turnEdit: 'turn.edit',
  turnDelete: 'turn.delete',
  configList: 'config.list',
  configCreate: 'config.create',
  configEdit: 'config.edit',
  configDelete: 'config.delete',
  surveyList: 'survey.list',
  surveyAdmin: 'survey.admin',
  surveyCreate: 'survey.create',
  surveyEdit: 'survey.edit',
  surveyDelete: 'survey.delete',
  procedureList: 'procedure.list',
  procedureCreate: 'procedure.create',
  procedureEdit: 'procedure.edit',
  procedureDelete: 'procedure.delete',
};

interface validatePrivilegesResponse {
  link: string;
  isValid: boolean;
}

export class ApplicationConst {
  PRIVILEGES = PRIVILEGES;
  MAIN_ROL = 'Admin';
  USER_ROL = 'User';
  validatePermission = (
    permission: string,
    privileges: string[],
    rol: string,
    sectionUser: boolean
  ) => {
    return (
      rol === this.MAIN_ROL ||
      privileges.includes(permission) ||
      (sectionUser && rol === this.USER_ROL)
    );
  };

  validatePrivileges(
    option: NavItem,
    privileges: string[]
  ): validatePrivilegesResponse | undefined {
    if (privileges.includes(option.privileges.main))
      return { link: option.link, isValid: true };
    else if (privileges.includes(option.privileges.second))
      return { link: option.privileges.secondLink, isValid: true };
    return;
  }
}
