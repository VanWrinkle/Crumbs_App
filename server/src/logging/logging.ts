import fs, {PathOrFileDescriptor} from "fs";
import {loggingDirectory} from "../globals";
import {Severity, ErrorObject} from "./errors";



export enum DBType {
    USER_CONTENT_DB = "USER_CONTENT_DB",
    USER_CREDENTIALS_DB = "USER_CREDENTIALS_DB"
}

export class CrumbLog {
    public static Error(destination: PathOrFileDescriptor, error: ErrorObject) {
        fs.appendFile(destination, JSON.stringify(error, null, 2), (err) => {
            if (err) {
                console.log(err)
                return
            }
        })
    }
}

