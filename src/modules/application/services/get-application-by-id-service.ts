import { APPLICATION_NOT_FOUND } from "../errors";
import { ApplicationRepository } from "../repository/application-repository";
import { IApplicationRepository } from "../repository/i-application-repository";

interface GetApplicationProps {
  applicationRepository: IApplicationRepository
}

export class GetApplicationServiceById {

  private props: GetApplicationProps
  constructor(props: GetApplicationProps) {
    this.props = {
      ...props
    }
  }

  async execute(id: number) {

    const application = await this.props.applicationRepository.findById(id);

    if (!application) throw APPLICATION_NOT_FOUND

    return application
  }
}
