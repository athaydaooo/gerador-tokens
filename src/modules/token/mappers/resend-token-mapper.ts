import CreatedToken from "@modules/token/entities/created-token";

export interface ResendTokenResponse {
    destination: string;
    token: string;
    type: string;
    token_live_minutes: number;
    expires_at: Date;
    created_at: Date;
}

export class ResendTokenMapper {
    static toResponse(createdToken: CreatedToken): ResendTokenResponse {
        return {
            destination: createdToken.destination,
            token: createdToken.token,
            type: createdToken.type,
            token_live_minutes: createdToken.token_live,
            expires_at: createdToken.expires_at,
            created_at: createdToken.created_at,
        };
    }
}