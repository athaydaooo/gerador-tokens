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
applicationRouter.get('/all', wrapper(applicationController.getApplications.bind(applicationController))
    /* 
        #swagger.tags = ['Application']  
        #swagger.description = 'Endpoint to get all applications' 

        #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/GetAllApplicationsResponse" },
            description: 'Applications listed Successfully',
        }
        
    */
)
applicationRouter.post('/create', wrapper(applicationController.createApplication.bind(applicationController))
    /* 
        #swagger.tags = ['Application']  
        #swagger.description = 'Endpoint to create a application' 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create application input.',
            required: true,
            schema: { $ref: "#/definitions/CreateApplicationInput" }
        } 
        #swagger.responses[201]
    */
)
applicationRouter.post('/update/name', wrapper(applicationController.changeNameApplication.bind(applicationController))
    /* 
        #swagger.tags = ['Application']  
        #swagger.description = 'Endpoint to change the name of a application'  
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Change application name input.',
            required: true,
            schema: { $ref: "#/definitions/ChangeApplicationNameInput" }
        } 

        #swagger.responses[200]
    */
)
applicationRouter.post('/update/token', wrapper(applicationController.changeTokenApplication.bind(applicationController))
    /* 
        #swagger.tags = ['Application']  
        #swagger.description = 'Endpoint to change the token of a application'  
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Change application token input.',
            required: true,
            schema: { $ref: "#/definitions/ChangeApplicationTokenInput" }
        } 

        #swagger.responses[200]
    */
)
applicationRouter.post('/enable', wrapper(applicationController.enableApplication.bind(applicationController))
    /* 
        #swagger.tags = ['Application']  
        #swagger.description = 'Endpoint to enable/disable a application'  
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Enable/Disable application input.',
            required: true,
            schema: { $ref: "#/definitions/EnableApplicationInput" }
        } 

        #swagger.responses[200]
    */
)

export default applicationRouter
