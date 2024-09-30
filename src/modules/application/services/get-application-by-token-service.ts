import { TOKEN_NOT_FOUND } from "../errors";
import { IApplicationRepository } from "../repository/i-application-repository";

interface GetApplicationProps {
  applicationRepository: IApplicationRepository
}

export class GetApplicationServiceByToken {

  private props: GetApplicationProps
  constructor(props: GetApplicationProps) {
    this.props = {
      ...props
    }
  }

  async execute(token: string) {

    const application = await this.props.applicationRepository.findByToken(token);

    if (!application) throw TOKEN_NOT_FOUND

    return application
  }
}
