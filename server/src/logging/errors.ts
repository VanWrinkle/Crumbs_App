export class DBError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DBError";
    }
}

export class DBErrors {
    static CONNECTION_ERROR = new DBError("Connection error");
    static UNKNOWN_ERROR = new DBError("Unknown error");
    static SYNTAX_ERROR = new DBError("Query Syntax error");
}

export enum Severity {
    INFO = "INFO",
    DEBUG = "DEBUG",
    WARNING = "WARNING",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL",
    FATAL = "FATAL"
}

export class ErrorObject {
    timestamp: Date = new Date();
    severity: Severity;
    source: string;
    type: string;
    message: string;
    constructor(type: string, source: string, severity: Severity, message: string) {
        this.type = type;
        this.source = source;
        this.severity = severity;
        this.message = message;
    }
}