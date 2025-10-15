import type { Type } from "../interfaces/TypeRequest";

export interface Request {
    id: number;
    name: string;
    description: string;
    adress: string;
    typeId: number | null;
    type: Type | null ;
    status: string;
    createdAt: Date
}