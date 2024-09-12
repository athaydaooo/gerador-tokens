import { IMessageTriggerHub } from "../clients/interfaces/i-message-trigger-hub"
import { INVALID_TOKENTYPE_PARAMETER } from "../errors"

interface SendTokenServiceProps {
  messageTriggerHub: IMessageTriggerHub
}

export class SendTokenService {

  private props : SendTokenServiceProps

  constructor(props : SendTokenServiceProps) {
    this.props = {
      ...props
    }

  }

  async execute (destination: string, tokenType: string,  token:string) {

    const message = `Use ${token} como seu codigo de verificação!`

    let sentToken

    switch (tokenType) {
      case 'SMS':
        sentToken = await this.props.messageTriggerHub.sendSms(destination, message)
        break;
      case 'EMAIL':
        sentToken = await this.props.messageTriggerHub.sendEmail(destination, message)
        break;
      case 'WHATSAPP':
        sentToken = await this.props.messageTriggerHub.sendWhatsapp(destination, message)
        break;
      default:
        throw INVALID_TOKENTYPE_PARAMETER;
    }

    return sentToken
  }
}
