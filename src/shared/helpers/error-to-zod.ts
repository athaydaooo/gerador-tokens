import { AppError } from "@shared/errors/app-error";

export default function errorToZod(error: AppError) {
  return `${error.errorCode} |~| ${error.message} |~| ${error.statusCode}`
}