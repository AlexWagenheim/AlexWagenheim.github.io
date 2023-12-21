import {CompilerMessage} from "./CompilerMessage";
import {StatusCode} from "./StatusCode";

export interface CompilerResponse {
    statusCode: StatusCode;
    info: string;
    output: string;
    messages: CompilerMessage[];
}