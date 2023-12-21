import {StatusCode} from "../../compiling/dto/StatusCode";

export interface ExecutorResponse {
    statusCode: StatusCode;
    message: string;
    output: string;
    error: string;
}