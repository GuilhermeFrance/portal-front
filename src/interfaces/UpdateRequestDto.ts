import type { Type } from "typescript";

export interface UpdateRequestDto {
        name: string;
        description: string;
        adress: string;
        typeId: number | null;
        status: string;
      
}