export interface ResponseEntity<T> {
    body: T;
    headers: {};
    statusCode: string;
    statusCodeValue: number;
}