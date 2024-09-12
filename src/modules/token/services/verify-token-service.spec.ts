import { Application } from "@prisma/client"
import { FakeTokenRepository } from "../repository/fake/fake-token-repository"
import { VerifyTokenService } from "./verify-token-service"
import { AppError } from "@shared/errors/app-error"

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
