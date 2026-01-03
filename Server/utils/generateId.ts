import { incrementId } from "../Repository/GlobalMetadata.Repo";

export const generateId = async (key: string) => {
    const number = await incrementId(key);
    const base36 = number.content[0].toString(36).toUpperCase();
    const padded = base36.padStart(6, '0');
    return padded;
}