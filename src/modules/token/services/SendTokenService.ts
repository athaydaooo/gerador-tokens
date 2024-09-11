import { INVALID_TOKENTYPE_PARAMETER } from "../errors"
import { MessageTriggerHubClient } from "../clients/message-trigger-hub-client"

interface SendTokenServiceProps {
  messageTriggerHubClient: MessageTriggerHubClient
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
        sentToken = await this.props.messageTriggerHubClient.sendSms(destination, message)
        break;
      case 'EMAIL':
        sentToken = await this.props.messageTriggerHubClient.sendEmail(destination, message)
        break;
      case 'WHATSAPP':
        sentToken = await this.props.messageTriggerHubClient.sendWhatsapp(destination, message)
        break;
      default:
        throw INVALID_TOKENTYPE_PARAMETER;
    }

    return sentToken
  }
}
