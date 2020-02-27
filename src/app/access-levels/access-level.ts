
export interface IAccessLevel {
    id: number;
    name: string;
    readerId: number;
    Description: string;
    readerType?: string;
    readers?: string;
    rowId?: number;
}
