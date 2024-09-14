import { APPLICATION_NOT_FOUND, TOKEN_NOT_FOUND } from "../errors";
import { ApplicationRepository } from "../repository/application-repository";

interface GetApplicationProps {
  applicationRepository: ApplicationRepository
}

export class GetApplicationsService {

  private props: GetApplicationProps
  constructor(props: GetApplicationProps) {
    this.props = {
      ...props
    }
  }

  async execute() {

    const applications = await this.props.applicationRepository.getAll();

    if (!applications) throw APPLICATION_NOT_FOUND

    return applications
  }
}
