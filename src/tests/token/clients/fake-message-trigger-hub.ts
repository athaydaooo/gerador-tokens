import { IMessageTriggerHub } from "@modules/token/clients/interfaces/i-message-trigger-hub";

export class FakeMessageTriggerHub implements IMessageTriggerHub {
  private assunto : string;

  constructor() {
    this.assunto = 'Validação Usuário';
  }

  async sendSms (destination : string, message : string){
      const data = {
        telefone: destination,
        mensagem: message,
      }

      return data
  }

  async sendEmail (destination : string, message : string){
    const data = {
      destino: destination,
      mensagem: message,
      assunto: this.assunto,
    }

    return data
}

async sendWhatsapp (destination : string, message : string){
  const data = {
    destino: destination,
    mensagem: message,
    assunto: this.assunto,
  }

  return data
}

}