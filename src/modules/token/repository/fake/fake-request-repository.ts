
class FakeRequestRepository {

  findById = async (id : number) => {
    const requests = [1,2,3,4]

    return requests[0]
  }

  create = async (request: Request) => {

    return request
  }
}

export default FakeRequestRepository
