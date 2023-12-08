export interface EventRequest {
    name: string;
    date: Date;
    sendReminder: boolean;
}

export interface EventResponse extends EventRequest{

}