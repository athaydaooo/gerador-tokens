import { APPLICATION_NOT_FOUND } from "@modules/application/errors";
import { IApplicationRepository } from "@modules/application/repository/i-application-repository";
import { Application, Prisma, PrismaClient } from "@prisma/client"

export class FakeApplicationRepository implements IApplicationRepository {
  prisma = new PrismaClient().application
  private applications: Application[] = [];

  async getAll(): Promise<Application[] | null> {
    return this.applications.length ? this.applications : null;
  }

  async findByToken(token: string): Promise<Application | null> {
    return this.applications.find(app => app.token === token) || null;
  }

  async findById(id: number): Promise<Application | null> {
    return this.applications.find(app => app.id === id) || null;
  }

  async create(application: Application): Promise<Application> {
    this.applications.push(application);
    return application;
  }

  async update(application_id: number, applicationData: Prisma.ApplicationUpdateInput): Promise<Application> {
    const index = this.applications.findIndex(app => app.id === application_id);
    if (index === -1) throw APPLICATION_NOT_FOUND;

    this.applications[index] = {
      ...this.applications[index],
      ...applicationData,
      name: typeof applicationData.name === 'string' ? applicationData.name : this.applications[index].name,
      token: typeof applicationData.token === 'string' ? applicationData.token : this.applications[index].token,
      created_at: applicationData.created_at instanceof Date ? applicationData.created_at : this.applications[index].created_at,
      updated_at: applicationData.updated_at instanceof Date ? applicationData.updated_at : this.applications[index].updated_at,
      enabled: typeof applicationData.enabled === 'boolean' ? applicationData.enabled : this.applications[index].enabled,
    };
    return this.applications[index];
  }

  async delete(applicationId: number): Promise<void> {
    this.applications = this.applications.filter(app => app.id !== applicationId);
  }

}
