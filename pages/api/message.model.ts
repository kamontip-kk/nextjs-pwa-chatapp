export interface GetMessageProps {
    id: string;
    chatlistId: number;
    name: string;
    message: string;
}

export interface SendMessageProps {
    chatlistId?: string;
    name: string;
    message: string;
}