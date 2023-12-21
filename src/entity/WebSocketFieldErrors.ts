import {WebSocketErrorField} from "./WebSocketErrorField";

export interface WebSocketFieldErrors {
    hasError: boolean;
    errors: WebSocketErrorField[];
}