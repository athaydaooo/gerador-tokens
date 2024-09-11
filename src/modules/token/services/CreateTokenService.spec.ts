import { Application } from "@prisma/client"
import { AppError } from "@shared/errors/AppError"
import { FakeTokenRepository } from "../repository/fake/FakeTokenRepository"
import { CreateTokenService } from "./CreateTokenService"

let fakeTokenRepository : FakeTokenRepository
let createTokenService : CreateTokenService

describe('Create token', () => {

  const application : Application = {
    id:1,
    created_at: new Date(),
    name:'teste',
    token:'123456789'
  }

  beforeAll(() => {
    fakeTokenRepository = new FakeTokenRepository()
    createTokenService = new CreateTokenService( { 
      tokenRepository : fakeTokenRepository,
    })
  })

  it('Should create a token and return it as already created', async () => {
    
    const createdToken = await createTokenService.execute('SMS',application,'A','13965484521')
    
    expect(createdToken.already_created).toBe(true)
  })

  it('Should create a token and return it as never created', async () => {

    const createdToken = await createTokenService.execute('SMS',application,'B','13965484521')
    
    expect(createdToken.already_created).toBe(false)
  })

})
