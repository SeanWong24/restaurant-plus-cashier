export class Bill {
    static readonly Status = {
        Open: "Open",
        Closed: "Closed"
    };

    id: string;
    tableId: string;
    startTime: string;
    endTime?: string;
    status: string = Bill.Status.Open;
    discountAmount: number = 0;
    discountPercentage: number = 0;
}