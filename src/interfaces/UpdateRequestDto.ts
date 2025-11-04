import type { ClientModel } from "../auth/models/ClientModel";

export interface UpdateRequestDto {
        name: string;
        description: string;
        adress: string;
        typeId: number | null;
        statusKey: string;
        clientId: number | undefined;
        client: ClientModel | null;
      
}