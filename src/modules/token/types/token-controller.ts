import { GetApplicationServiceById } from "@modules/application/services/GetApplicationServiceById";
import { CreateTokenService } from "../services/CreateTokenService";
import { SendTokenService } from "../services/SendTokenService";
import { VerifyTokenService } from "../services/VerifyToken";

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