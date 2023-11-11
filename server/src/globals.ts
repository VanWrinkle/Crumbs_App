import path from "path";
import {
    MDBUserRegistrationDatabase
} from "./user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {Neo4jTestDB, NeoGraphPersistence} from "./user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";
import fs from "fs";

export const reactDir = path.join(__dirname, '..', '..', 'client', 'build');



const actualUserDBusername = "crumbdevs"
const actualUserDBpassword = "crumbdevsruler"
const actualUserDBCluster = "crumbdevs.ta4zcje"

export const userRegistrationDatabase =
    new MDBUserRegistrationDatabase(
        actualUserDBusername,
        actualUserDBpassword,
        actualUserDBCluster,
        "userdata"
    )

export const socialGraphPersistence =
    new NeoGraphPersistence(
        "neo4j://10.212.172.128:7687",
        "neo4j",
        "crumbdevsrule"
    );

export const httpsPrivateKey = fs.readFileSync('./keys/private-key.pem', 'utf-8')
export const httpsCertificate = fs.readFileSync('./keys/server.crt', 'utf-8')