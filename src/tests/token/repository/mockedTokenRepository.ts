import { ITokenRepository } from "@modules/token/repository/i-token-repository";

const mockedTokenRepository: jest.Mocked<ITokenRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findByToken: jest.fn(),
    findByCallerUser: jest.fn(),
    update: jest.fn(),
};

export default mockedTokenRepository