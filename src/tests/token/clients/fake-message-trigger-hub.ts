import { IMessageTriggerHub } from "@modules/token/clients/interfaces/i-message-trigger-hub";

export class FakeMessageTriggerHub implements IMessageTriggerHub {
  private assunto: string;

  constructor() {
    this.assunto = 'Validação Usuário';
  }

  async sendSms(destination: string, message: string): Promise<void> {
    if (destination === '1234567890' && message === '123456')
      throw new Error('Erro ao enviar SMS');
    return
  }

  async sendEmail(destination: string, message: string): Promise<void> {
    if (destination === '1234567890' && message === '123456')
      throw new Error('Erro ao enviar SMS');
    return
  }

  async sendWhatsapp(destination: string, message: string): Promise<void> {
    if (destination === '1234567890' && message === '123456')
      throw new Error('Erro ao enviar SMS');
    return
  }

}