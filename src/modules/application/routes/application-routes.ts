import { Router } from "express"
import { ApplicationController } from "../controllers/application-controller"
import { CreateApplicationService } from "../services/create-application-service"
import { GetApplicationsService } from "../services/get-applications-service"
import { UpdateApplicationService } from "../services/update-application-service"
import { ApplicationRepository } from "../repository/application-repository"
import { bearerAdminVerifier } from "@shared/middleware/bearer-admin-verifier"

const applicationRepository = new ApplicationRepository()

const createApplicationService = new CreateApplicationService({ applicationRepository })
const getApplicationsService = new GetApplicationsService({ applicationRepository })
const updateApplicationService = new UpdateApplicationService({ applicationRepository })

const applicationController = new ApplicationController(
    {
        createApplicationService,
        getApplicationsService,
        updateApplicationService
    })

// Consulte o `REAMDE-PromisseWrapper.md` para entender o uso do wrapper
let wrapper =
    (fn: any) =>
        (...args: any) =>
            fn(...args).catch(args[2])

const applicationRouter = Router()

applicationRouter.use(bearerAdminVerifier)
applicationRouter.get('/all', wrapper(applicationController.getApplications.bind(applicationController)))
applicationRouter.post('/create', wrapper(applicationController.createApplication.bind(applicationController)))
applicationRouter.post('/update/name', wrapper(applicationController.changeNameApplication.bind(applicationController)))
applicationRouter.post('/update/token', wrapper(applicationController.changeTokenApplication.bind(applicationController)))
applicationRouter.post('/enable', wrapper(applicationController.enableApplication.bind(applicationController)))

export default applicationRouter
