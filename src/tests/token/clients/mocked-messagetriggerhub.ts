import { IMessageTriggerHub } from "@modules/token/clients/interfaces/i-message-trigger-hub";

const mockedMessageHub: jest.Mocked<IMessageTriggerHub> = {
    sendEmail: jest.fn(),
    sendSms: jest.fn(),
    sendWhatsapp: jest.fn()
}

export default mockedMessageHub