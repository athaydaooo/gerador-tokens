import { IRequestRepository } from "@modules/request/repository/i-request-repository";

const mockedRequestsRepository: jest.Mocked<IRequestRepository> = {
    create: jest.fn(),
}

export default mockedRequestsRepository