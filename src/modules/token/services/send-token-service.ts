import { IMessageTriggerHub } from "../clients/interfaces/i-message-trigger-hub"
import { INVALID_TOKENTYPE_PARAMETER } from "../errors"

interface SendTokenServiceProps {
  messageTriggerHub: IMessageTriggerHub
}

export class SendTokenService {

  private props: SendTokenServiceProps

  constructor(props: SendTokenServiceProps) {
    this.props = {
      ...props
    }

  }

  async execute(destination: string, tokenType: string, token: string): Promise<void> {

    const message = `Use ${token} como seu codigo de verificação!`

    switch (tokenType) {
      case 'SMS':
        await this.props.messageTriggerHub.sendSms(destination, message)
        break;
      case 'EMAIL':
        await this.props.messageTriggerHub.sendEmail(destination, message)
        break;
      case 'WHATSAPP':
        await this.props.messageTriggerHub.sendWhatsapp(destination, message)
        break;
      default:
        throw INVALID_TOKENTYPE_PARAMETER;
    }

  }
}
