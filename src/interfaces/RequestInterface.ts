import type { Type } from "../interfaces/TypeRequest";
import type { Status } from "./Status";

export interface Request {
  id: number;
  name: string;
  description: string;
  adress: string;
  typeId: number | null;
  type: Type | null;
  status: Status;
  statusKey: string;
  createdAt: Date;
}
