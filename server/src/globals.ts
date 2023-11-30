import path from "path";
import {
    MDBUserRegistrationDatabase
} from "./user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {NeoGraphPersistence} from "./user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";
import fs, {PathOrFileDescriptor} from "fs";

export const reactDir = path.join(__dirname, '..', '..', 'client', 'build');

export const loggingDirectory = path.join(__dirname, 'logs');
export const DBloggingOutput: PathOrFileDescriptor = loggingDirectory + '/db-error.log'

const actualUserDBusername = "crumbdevs"
const actualUserDBpassword = "crumbdevsruler"
const actualUserDBCluster = "crumbdevs.ta4zcje"

export function userRegistrationDatabase() : MDBUserRegistrationDatabase {
    return new MDBUserRegistrationDatabase(
        actualUserDBusername,
        actualUserDBpassword,
        actualUserDBCluster,
        "userdata"
    )
}
export function socialGraphPersistence() : NeoGraphPersistence {
    return new NeoGraphPersistence(
        "neo4j://10.212.172.128:7687",
        "neo4j",
        "crumbdevsrule"
    );
}


export const httpsPrivateKey = fs.readFileSync('./keys/private-key.pem', 'utf-8')
export const httpsCertificate = fs.readFileSync('./keys/server.crt', 'utf-8')

