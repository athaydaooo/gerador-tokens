export abstract class MessageTriggerHubClient {
  abstract sendSms(destination : string, message : string): Promise<any>

  abstract sendEmail(destination : string, message : string): Promise<any>

  abstract sendWhatsapp(destination : string, message : string): Promise<any>
}