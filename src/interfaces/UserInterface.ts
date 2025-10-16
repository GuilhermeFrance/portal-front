import type { Role } from "./RoleInterface";

export interface User {
  id: number;
  email: string;
  name: string;
  cpf: string;
  role: Role | null;
  roleId: number | null
  createdAt: Date
  updatedAt: Date
}
