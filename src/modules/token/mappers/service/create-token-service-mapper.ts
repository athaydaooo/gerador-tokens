import { Application, Token } from "@prisma/client";
import CreatedToken from "../../entities/created-token";

class CreateTokenServiceMapper {
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

export default CreateTokenServiceMapper
