export interface ClientModel {
  id?: number;
  firstName?: string;
  surname?: string;
  email: string;
  cpf?: string;
  password: string;
  badgesKey?: string;
  createdAt?: Date;
  profileUrl?: string;
  profileImgId?: number;
}
