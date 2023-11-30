import {RegistrationService} from "../user/registration/RegistrationService/RegistrationService";

import {CrumbFilter} from "../entities/CrumbFilter";
import {socialGraphTestDB, TestServerConfigs, testUserDB} from "./testServerConfig";

/**
 * This function is used to seed the databases with test data prior to running
 * the tests.
 *
 * @see testUserDB
 * @see socialGraphTestDB
 */


export async function seedDatabase() {
    let defaultFilter = new CrumbFilter();
    let persistence = socialGraphTestDB();
    await console.log("Seeding databases");
    let registrationService = new RegistrationService(
        testUserDB(),
        socialGraphTestDB()
    )
    await persistence.createUserNode("test_user").then();
    await registrationService.registerUser("test_user", "test_password");
    await persistence.createUserNode("test_user2").then();
    await registrationService.registerUser("test_user2", "test_password2");
    for await (let x of Array(defaultFilter.max * 2).keys()) {
        await persistence.createCrumb(null, "test_user", [{type: "text", value: "test crumb x"}]);
    }
    await console.log("Databases seeded");
}


/**
 * This function is used to flush the databases after running the tests.
 *
 * @see testUserDB
 * @see socialGraphTestDB
 */
export async function flushDatabases() {
    await console.log("Flushing databases");
    await socialGraphTestDB().dropDatabase();
    await testUserDB().flushLoginInfo();
    await console.log("Databases flushed");
}

