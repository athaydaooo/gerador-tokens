import { TOKEN_NOT_FOUND } from "../errors";
import { ApplicationRepository } from "../repository/application-repository";

interface GetApplicationProps {
  applicationRepository: ApplicationRepository
}

export class GetApplicationServiceById {

  private props : GetApplicationProps
  constructor(props : GetApplicationProps) {
    this.props = {
      ...props
    }
  }

  async execute (id : number) {
    
    const application = await this.props.applicationRepository.findById(id);

    if(!application) throw TOKEN_NOT_FOUND

    return application
  }
}
