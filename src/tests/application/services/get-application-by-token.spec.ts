import { GetApplicationServiceByToken } from "@modules/application/services/get-application-by-token-service"
import { FakeApplicationRepository } from "../repository/fake-application-repository"

let fakeApplicationRepository: FakeApplicationRepository
let getApplicationServiceByToken: GetApplicationServiceByToken

describe('Get application by token', () => {

  beforeAll(() => {
    fakeApplicationRepository = new FakeApplicationRepository()
    getApplicationServiceByToken = new GetApplicationServiceByToken({
      applicationRepository: fakeApplicationRepository,
    })
  })

  it('Should return application found', async () => {

    const foundApplication = await getApplicationServiceByToken.execute('token1')

    expect(foundApplication).toBeTruthy()
  })

  it('Should return application not found', async () => {

    const foundApplication = await getApplicationServiceByToken.execute('token2')

    expect(foundApplication).toThrow()
  })

})
