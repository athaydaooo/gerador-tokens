import { SendTokenService } from "@modules/token/services/send-token-service"
import { MessageTriggerHub } from "@modules/token/clients/message-trigger-hub"
import { INVALID_TOKENTYPE_PARAMETER } from "@modules/token/errors"
import { AppError } from "@shared/errors/app-error"

const sendTokenParams = {
  token: "123456",
  destination: "5511911223344"
}

const message = `Use ${sendTokenParams.token} como seu codigo de verificação!`

describe('Send token', () => {
  let sendTokenService: SendTokenService;
  let messageTriggerHub: MessageTriggerHub;

  beforeAll(() => {
    messageTriggerHub = new MessageTriggerHub()
    sendTokenService = new SendTokenService({
      messageTriggerHub
    })
  })

  it('Should sent a SMS token successfuly', async () => {
    await sendTokenService.execute(sendTokenParams.destination, 'SMS', sendTokenParams.token);

    expect(messageTriggerHub.sendSms).toBeCalledTimes(1)
    expect(messageTriggerHub.sendSms).toHaveBeenCalledWith(sendTokenParams.destination, message);

  })

  it('Should sent a EMAIL token successfuly', async () => {
    await sendTokenService.execute(sendTokenParams.destination, 'EMAIL', sendTokenParams.token);

    expect(messageTriggerHub.sendEmail).toBeCalledTimes(1)
    expect(messageTriggerHub.sendEmail).toHaveBeenCalledWith(sendTokenParams.destination, message);
  })

  it('Should sent a WHATSAPP token successfuly', async () => {
    await sendTokenService.execute(sendTokenParams.destination, 'SMS', sendTokenParams.token);

    expect(messageTriggerHub.sendWhatsapp).toBeCalledTimes(1)
    expect(messageTriggerHub.sendWhatsapp).toHaveBeenCalledWith(sendTokenParams.destination, message);
  })

  it('Should return a invalid parameter', async () => {
    const sentmessage = await sendTokenService.execute(sendTokenParams.destination, 'TELEGRAM', sendTokenParams.token);

    expect(sentmessage).toThrow(AppError)
    expect(sentmessage).toBe(INVALID_TOKENTYPE_PARAMETER)
  })
})
