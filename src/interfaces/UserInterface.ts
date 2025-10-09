import type { Role } from "./RoleInterface";

export interface User {
  id: number;
  name: string;
  cpf: string;
  role: Role | null;
}
