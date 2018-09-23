export class ApiResponse {
    public status: string;
    public details: any;
    public result: any;

    constructor(status: string, details: string, result?: any) {}
}
