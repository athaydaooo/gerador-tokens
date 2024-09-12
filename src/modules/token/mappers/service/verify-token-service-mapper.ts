import { Application, Token } from "@prisma/client";
import VerifiedToken from "../../entities/verified-token";

class VerifyTokenServiceMapper {
    static toService(isVerificable: boolean, token: Token, application: Application): VerifiedToken {
        return {
            status: isVerificable,
            token: token.token,
            application: application.name,
            user: token.user
        }
    }
}

export default VerifyTokenServiceMapper
