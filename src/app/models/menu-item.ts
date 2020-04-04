export class MenuItem {
    static readonly Status = {
        Available: "Available",
        Unavailable: "Unavailable"
    };

    id: string;
    name: string;
    shortName: string;
    unitPrice: number;
    status: string = MenuItem.Status.Unavailable;
    categoryId: string;
    gstRate: number = 0;
    pstRate: number = 0;
    lctRate: number = 0;
    imageUrl: string = '';
}