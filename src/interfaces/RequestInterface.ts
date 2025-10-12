import type { Type } from "../interfaces/TypeRequest";

export interface Request {
    id: number;
    name: string;
    description: string;
    adress: string;
    type: Type | null ;
    status: string;
    createdAt: Date
}