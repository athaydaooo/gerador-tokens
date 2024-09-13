import { GetApplicationServiceById } from "@modules/application/services/get-application-by-id";
import { CreateTokenService } from "../services/create-token-service";
import { SendTokenService } from "../services/send-token-service";
import { VerifyTokenService } from "../services/verify-token-service";
import { CheckTokenService } from "../services/check-token-service";

export interface TokenControllerProps {
  createTokenService: CreateTokenService;
  sendTokenService: SendTokenService;
  checkTokenService: CheckTokenService;
  verifyTokenService: VerifyTokenService;
  getApplicationServiceById: GetApplicationServiceById;
}