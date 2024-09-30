import { IApplicationRepository } from "@modules/application/repository/i-application-repository";

const mockedApplicationRepository: jest.Mocked<IApplicationRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findByToken: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

export default mockedApplicationRepository