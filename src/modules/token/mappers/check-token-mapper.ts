import { Application, Token } from "@prisma/client";
import CheckedToken from "@modules/token/entities/cheked-token";

class CheckTokenMapper {
    static toService(token: Token, application: Application, tokenLive: number): CheckedToken {
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

export default CheckTokenMapper
