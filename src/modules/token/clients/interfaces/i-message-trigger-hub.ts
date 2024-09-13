export abstract class IMessageTriggerHub {
  abstract sendSms(destination: string, message: string): Promise<void>

  abstract sendEmail(destination: string, message: string): Promise<void>

  abstract sendWhatsapp(destination: string, message: string): Promise<void>
}