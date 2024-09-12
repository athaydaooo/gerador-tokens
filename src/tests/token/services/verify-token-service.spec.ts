import { Application } from "@prisma/client"
import { VerifyTokenService } from "../../../modules/token/services/verify-token-service"
import { AppError } from "@shared/errors/app-error"
import { FakeTokenRepository } from "../repository/fake-token-repository"

let fakeTokenRepository : FakeTokenRepository
let verifyTokenService : VerifyTokenService

describe('Verify token', () => {

  const application : Application = {
    id:1,
    created_at: new Date(),
    name:'teste',
    token:'123456789'
  }


  beforeAll(() => {
    fakeTokenRepository = new FakeTokenRepository()
    verifyTokenService = new VerifyTokenService( { 
      tokenRepository : fakeTokenRepository,
    })
  })
  

  it('Should verify if token exists and its not verified', async () => {
    
    const verifiedToken = await verifyTokenService.execute('ED23SD',application,'A')

    expect(verifiedToken).toBeTruthy()
  })

  it('Should return an AppError if user is empty', async () => {
    expect(async () => {
      return await verifyTokenService.execute('458E2D',application,'B')
    }).rejects.toBeInstanceOf(AppError)
  })

})
