import { GetApplicationServiceById } from "@modules/application/services/get-application-by-id";
import { CreateTokenService } from "../services/create-token-service";
import { SendTokenService } from "../services/send-token-service";
import { VerifyTokenService } from "../services/verify-token-service";

export interface TokenControllerProps {
  createTokenService: CreateTokenService;
  sendTokenService: SendTokenService;
  verifyTokenService: VerifyTokenService;
  getApplicationServiceById: GetApplicationServiceById;
}