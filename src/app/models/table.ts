export class Table {
    static readonly Status = {
        Free: 'Free',
        Using: 'Using',
        Reserved: 'Reserved',
        Dirty: 'Dirty',
        Unavailable: 'Unavailable',
    };

    id: string | undefined;
    name: string;
    capacity: number;
    occupied: number = 0;
    status: string = Table.Status.Unavailable;
    startTime?: string;
}