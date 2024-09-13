
import VerifiedToken from "../../entities/verified-token";

class VerifyTokenResponseMapper {
    static toResponse(verifiedToken: VerifiedToken) {
        return {
            ...verifiedToken,
            message: verifiedToken.status ? 'Token successfully verified' : 'Token is already verified'
        }
    }
}

export default VerifyTokenResponseMapper
