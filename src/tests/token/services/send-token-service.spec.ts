import { SendTokenService } from "@modules/token/services/send-token-service"
import { FakeTokenRepository } from "../repository/fake-token-repository"
import { FakeMessageTriggerHub } from "../clients/fake-message-trigger-hub"

describe('Send token', () => {
  let sendTokenService: SendTokenService;
  let fakeTokenRepository: FakeTokenRepository;

  beforeAll(() => {
    fakeTokenRepository = new FakeTokenRepository()
    sendTokenService = new SendTokenService ( { 
      messageTriggerHub : new FakeMessageTriggerHub()
    })
  })

  it('Should sent a token successfuly', async () => {
    const sentToken = await sendTokenService.execute('11999999999', 'SMS', '123456');
    expect(sentToken).toBeTruthy()
  })

  it('Should get error sending token cause of token type', async () => {
    const sentToken = await sendTokenService.execute('11999999999', 'TELEGRAM', '123456');
    expect(sentToken).toThrow()
  })
})
