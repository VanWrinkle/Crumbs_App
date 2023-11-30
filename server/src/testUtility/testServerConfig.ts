import {
    httpsCertificate,
    httpsPrivateKey,
} from "../globals";
import {
    UserTestDB
} from "../user/registration/persistence/MDBUserRegistrationDatabase/MDBUserRegistrationDatabase";
import {Neo4jTestDB} from "../user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";
import {CrumbServer} from "../server/crumbServer";
import {AuthenticationService} from "../user/login/authentication/AuthenticationService/AuthenticationService";
import {ConfigSettings} from "../entities/ConfigSettings";
import {RegistrationService} from "../user/registration/RegistrationService/RegistrationService";
import {LoginService} from "../user/login/LoginService/LoginService";



const userDBTestusername = "crumbdevs_test"
const userDBTestpassword = "3Rt23jd9oWHqlgpy"
const userDBTestcluster = "cluster0.x06e66b"


export function testUserDB() : UserTestDB {
    return new UserTestDB(
        userDBTestusername,
        userDBTestpassword,
        userDBTestcluster,
        "cluster0"
    )
}


export function socialGraphTestDB() : Neo4jTestDB {
    return new Neo4jTestDB(
        "neo4j://10.212.173.46:7687",
        "neo4j",
        "crumbdevsrule"
    )
}

export function socialGraphConnectionError() : Neo4jTestDB {
    return new Neo4jTestDB(
        "neo4j://10.212.173.46:7627",
        "neo4j2",
        "wrongpassword"
    )
}

export function userDBConnectionError() : UserTestDB {
    return new UserTestDB(
        userDBTestusername,
        "wrongpassword",
        userDBTestcluster,
        "cluster0"
    )
}

export class TestServerConfigs {
    static default() : CrumbServer {
        return configureTestServer(testUserDB(), socialGraphTestDB());
    }
    static userDBConnectionErrorServer() : CrumbServer {
        return configureTestServer(userDBConnectionError(), socialGraphTestDB());

    }
    static graphDBErrorServer() : CrumbServer {
        return configureTestServer(testUserDB(), socialGraphConnectionError());
    }
    static bothDBConnectionErrorServer() : CrumbServer {
        return configureTestServer(userDBConnectionError(), socialGraphConnectionError());
    }
}

/**
 * This function is used to get an instance of the server for testing with
 * test databases and test certificates injected.
 *
 * @returns {CrumbServer} The server instance
 */
export function configureTestServer(userDB: UserTestDB, graphDB: Neo4jTestDB) : CrumbServer {
    const sessionManagement = new AuthenticationService('secret-key', 24)
    const config: ConfigSettings = {
        registrationService: new RegistrationService(userDB, graphDB),
        loginService: new LoginService(userDB, sessionManagement),
        graphPersistence: graphDB,
        httpsPrivateKey: httpsPrivateKey,
        httpsCertificate: httpsCertificate,
    }
    return new CrumbServer(config);
}