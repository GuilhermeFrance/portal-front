import type { Role } from "./RoleInterface";

export interface User {
  id: number;
  publicId: number;
  email: string;
  name: string;
  cpf: string;
  role: Role | null;
  roleId: number | null
  createdAt: Date
  updatedAt: Date
}
