export class Role {
    static readonly AccessItem = {
        User_Read: "user.read",
        User_Write: "user.write"
    }

    id?: string;
    name: string;
    accessList: string[];
    isDefault: boolean = false;
}