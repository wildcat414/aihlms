export class Book {
    public id: number;
    public author_forename: string;
    public author_surname: string;
    public title: string;
    public isbn: string;
    public publish_year: string;
    public publishing_house: string;
    public date_added: string;
    public owner: number;
    public owner_name: string;
    public borrower: number;
    public borrower_external: number;
    public date_borrowed: string;
    public date_returned: string;
    public return_confirmed: number;
    public borrower_name: string;
    public book_id: number;
    public borrowing_id: number;

    constructor() {}
}
