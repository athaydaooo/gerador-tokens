import { GetApplicationServiceById } from "@modules/application/services/GetApplicationServiceById";
import { CreateTokenService } from "../services/create-token-service";
import { SendTokenService } from "../services/send-token-service";
import { VerifyTokenService } from "../services/verify-token-service";

export interface TokenControllerProps {
  createTokenService: CreateTokenService;
  sendTokenService: SendTokenService;
  verifyTokenService: VerifyTokenService;
  getApplicationServiceById: GetApplicationServiceById;
}

export interface createTokenBody {
  tokenType: 'SMS' | 'EMAIL' | 'WHATSAPP';
  user: string;
  destination:string;
  caller:string;
}

export interface verifyTokenBody {
  user: string;
  token: string;
}