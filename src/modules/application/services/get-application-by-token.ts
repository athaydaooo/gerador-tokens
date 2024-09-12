import { TOKEN_NOT_FOUND } from "../errors";
import { ApplicationRepository } from "../repository/application-repository";

interface GetApplicationProps {
  applicationRepository: ApplicationRepository
}

export class GetApplicationServiceByToken {

  private props : GetApplicationProps
  constructor(props : GetApplicationProps) {
    this.props = {
      ...props
    }
  }

  async execute (token : string) {
    
    const application = await this.props.applicationRepository.findByToken(token);

    if(!application) throw TOKEN_NOT_FOUND

    return application
  }
}
