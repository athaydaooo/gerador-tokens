import { messageTriggerHub } from "@shared/clients/messeger-trigger-hub";
import { SEND_TOKEN_EMAIL, SEND_TOKEN_SMS } from "../errors";
import { IMessageTriggerHub } from "./interfaces/i-message-trigger-hub";

export class MessageTriggerHub implements IMessageTriggerHub {
  private assunto : string;

  constructor() {
    this.assunto = 'Validação Usuário';
  }

  async sendSms (destination : string, message : string){
      const data = {
        telefone: destination,
        mensagem: message,
      }

      const sentMessage = await messageTriggerHub.post('/send/sms', JSON.stringify(data))
        .then((response) => response)
        .catch((err) => err.response)
      
      if(sentMessage.status !== 200) throw SEND_TOKEN_SMS

      if(sentMessage.data.status !== "success") throw SEND_TOKEN_SMS

      return {
        destination:destination,
        message:message,
      }
  }

  async sendEmail (destination : string, message : string){
    const data = {
      destino: destination,
      mensagem: message,
      assunto: this.assunto,
    }

    const sentMessage = await messageTriggerHub.post('/send/email', JSON.stringify(data))
      .then((response) => response)
      .catch((err) => err.response)
      
    if(sentMessage.status !== 200) throw SEND_TOKEN_EMAIL

    if(sentMessage.data.status !== 200) throw SEND_TOKEN_EMAIL

    return {
      destination:destination,
      message:message,
    }
}

async sendWhatsapp (destination : string, message : string){
  const data = {
    destino: destination,
    mensagem: message,
    assunto: this.assunto,
  }

  const sentMessage = await messageTriggerHub.post('/send/whatsapp', JSON.stringify(data))
    .then((response) => response)
    .catch((err) => err.response)
    
  if(sentMessage.status !== 200) throw SEND_TOKEN_EMAIL

  if(sentMessage.data.status !== 200) throw SEND_TOKEN_EMAIL

  return {
    destination:destination,
    message:message,
  }
}

}