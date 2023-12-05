interface Rol {
  rol: RolDto;
  permissionsId?: [];
  privilegesId?: [];
}

interface RolDto {
  id?: number;
  name: string;
  description?: string;
}
