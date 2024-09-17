import { GetApplicationServiceById } from "@modules/application/services/get-application-by-id-service"
import { FakeApplicationRepository } from "../repository/fake-application-repository"

let fakeApplicationRepository: FakeApplicationRepository
let getApplicationServiceById: GetApplicationServiceById

describe('Get application by id', () => {

  beforeAll(() => {
    fakeApplicationRepository = new FakeApplicationRepository()
    getApplicationServiceById = new GetApplicationServiceById({
      applicationRepository: fakeApplicationRepository,
    })
  })

  it('Should return application found', async () => {

    const foundApplication = await getApplicationServiceById.execute(1)

    expect(foundApplication).toBeTruthy()
  })

  it('Should return application not found', async () => {

    const foundApplication = await getApplicationServiceById.execute(2)

    expect(foundApplication).toThrow()
  })

})
