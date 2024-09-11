import { Application } from "@prisma/client"

export class FakeApplicationRepository {

  findByToken = async (token : string) => {
    const applications = [1,2,3,4,5]

    return applications[0]
  }

  findById = async (id : number) => {
    const applications = [1,2,3,4,5]

    return applications[0]
  }

  create = async (application: Application) => {
    return application
  }

  update = async (application: Application) => {
    return application
  }
}
