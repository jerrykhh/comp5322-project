import { PetAdoptionStatus, PetType } from "../models";

export type Pet = {
    name: string;
    breed: string;
    size?: string | null | undefined;
    gender?: string | null | undefined;
    birthday?: string | null | undefined;
    note?: string | null | undefined,
    adoption_status: PetAdoptionStatus,
    type: PetType,
    microchip: string,
    description: string,
    image: string
}

