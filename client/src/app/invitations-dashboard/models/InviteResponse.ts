export interface InvitationsResponse {
    eventId: string,
    id: string,
    status: number,
    name: string
}

export type PartialInvitationUpdate= Partial<InvitationsResponse>;