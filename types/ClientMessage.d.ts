export type ClientMessage = {
    id: string;
    user: string;
    content: string;
    time: number;
    parts?: {
        "anlagenKennzeichen": string;
        "geo": string;
    }[];
};
