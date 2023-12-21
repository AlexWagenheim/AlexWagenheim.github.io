import {CompilerMessageType} from "./CompilerMessageType";

export interface CompilerMessage {
    moduleName: string;
    line: number;
    messageType: CompilerMessageType;
    message: string;
    explanation: string;
}