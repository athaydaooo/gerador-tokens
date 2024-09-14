import { IApplicationRepository } from "@modules/application/repository/i-application-repository";
import { Application, PrismaClient } from "@prisma/client"

export class FakeApplicationRepository implements IApplicationRepository {
  prisma = new PrismaClient().application

  findByToken = async (token: string) => {
    const applications = [
      { id: 1, name: 'App1', token: 'token1', created_at: new Date() }
    ];

    return applications.find(app => app.token === token) || null;
  }

  findById = async (id: number) => {
    const applications = [
      { id: 1, name: 'App1', token: 'token1', created_at: new Date() }
    ];

    return applications.find(app => app.id === id) || null;
  }

  create = async (application: Application) => {
    return application
  }

  update = async (application: Application) => {
    return application
  }
}
