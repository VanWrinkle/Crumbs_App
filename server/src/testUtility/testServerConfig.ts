import {
    httpsCertificate,
    httpsPrivateKey,
    testConfig,
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


export function testUserDB() : UserTestDB {
    return new UserTestDB(
        testConfig.user_credentials_persistence.usr,
        testConfig.user_credentials_persistence.pwd,
        testConfig.user_credentials_persistence.cluster,
        testConfig.user_credentials_persistence.db
    )
}

export function socialGraphTestDB() : Neo4jTestDB {
    return new Neo4jTestDB(
        testConfig.user_content_persistence.url,
        testConfig.user_content_persistence.usr,
        testConfig.user_content_persistence.pwd
    )
}

function socialGraphConnectionError() : Neo4jTestDB {
    return new Neo4jTestDB(
        testConfig.user_content_persistence.url,
        "neo4j2",
        "wrongpassword"
    )
}

function userDBConnectionError() : UserTestDB {
    return new UserTestDB(
        testConfig.user_credentials_persistence.usr,
        "wrongpassword",
        testConfig.user_credentials_persistence.cluster,
        "cluster0"
    )
}

export class TestServerConfigs {

    /**
     * This function is used to get an instance of the server for testing with
     * test databases and test certificates injected.
     *
     * @returns {CrumbServer} The server instance
     */
    private static configureTestServer(userDB: UserTestDB, graphDB: Neo4jTestDB) : CrumbServer {
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

    static default() : CrumbServer {
        let userDB = testUserDB();
        let graphDB = socialGraphTestDB();
        return this.configureTestServer(testUserDB(), socialGraphTestDB());
    }
    static userDBConnectionErrorServer() : CrumbServer {
        return this.configureTestServer(userDBConnectionError(), socialGraphTestDB());

    }
    static graphDBErrorServer() : CrumbServer {
        return this.configureTestServer(testUserDB(), socialGraphConnectionError());
    }
    static bothDBConnectionErrorServer() : CrumbServer {
        return this.configureTestServer(userDBConnectionError(), socialGraphConnectionError());
    }
}

