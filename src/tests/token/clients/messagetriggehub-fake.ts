import { IMessageTriggerHub } from "@modules/token/clients/interfaces/i-message-trigger-hub";

export class MessageTriggerHubFake implements IMessageTriggerHub {
    private assunto: string;

    constructor() {
        this.assunto = 'Validação Usuário';
    }

    async sendSms(destination: string, message: string): Promise<void> {
        console.log(`Fake SMS sent to ${destination} with message: ${message}`);
    }

    async sendEmail(destination: string, message: string): Promise<void> {
        console.log(`Fake Email sent to ${destination} with message: ${message} and subject: ${this.assunto}`);
    }

    async sendWhatsapp(destination: string, message: string): Promise<void> {
        console.log(`Fake WhatsApp message sent to ${destination} with message: ${message} and subject: ${this.assunto}`);
    }
}
