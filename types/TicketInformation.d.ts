export type TicketInformation = {
    "id": string;
    "targetDate": string;
    "title": string;
    "description": string;
    "geo": string;
    "responsible": string;
    "dueDate": string;
    "completed": boolean;
    "status": string;
    "customData": {
        [key: string]: string | number | boolean;
    };
};
