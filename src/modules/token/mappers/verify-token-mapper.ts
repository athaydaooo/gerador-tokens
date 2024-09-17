
import { Application, Token } from "@prisma/client";
import VerifiedToken from "../entities/verified-token";

class VerifyTokenMapper {
    static toResponse(verifiedToken: VerifiedToken) {
        return {
            ...verifiedToken,
            message: verifiedToken.status ? 'Token successfully verified' : 'Token is already verified or expired'
        }
    }

    static toService(isVerificable: boolean, token: Token, application: Application): VerifiedToken {
        return {
            status: isVerificable,
            token: token.token,
            application: application.name,
            user: token.user,
        }
    }
}

export default VerifyTokenMapper
