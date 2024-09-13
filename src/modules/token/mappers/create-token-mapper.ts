import CreatedToken from "@modules/token/entities/created-token";
import { Application, Token } from "@prisma/client";

export interface CreateTokenResponse {
    destination: string;
    token: string;
    type: string;
    token_live_minutes: number;
    expires_at: Date;
    created_at: Date;
}

export class CreateTokenMapper {
    static toResponse(createdToken: CreatedToken): CreateTokenResponse {
        return {
            destination: createdToken.destination,
            token: createdToken.token,
            type: createdToken.type,
            token_live_minutes: createdToken.token_live,
            expires_at: createdToken.expires_at,
            created_at: createdToken.created_at,
        };
    }

    static toService(token: Token, application: Application, tokenLive: number): CreatedToken {
        return {
            user: token.user,
            application: application.name,
            type: token.type,
            destination: token.destination,
            token: token.token,
            created_at: token.created_at,
            expires_at: token.expires_at,
            token_live: tokenLive,
        }
    }
}