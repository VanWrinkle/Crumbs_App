import {RegistrationService} from "../user/registration/RegistrationService/RegistrationService";

import {CrumbFilter} from "../entities/CrumbFilter";
import {socialGraphTestDB, testUserDB} from "./testServerConfig";

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
    await persistence.init();
    await console.log("Seeding databases");
    let registrationService = new RegistrationService(
        testUserDB(),
        persistence
    )
    await registrationService.registerUser("test_user", "test_password");
    await registrationService.registerUser("test_user2", "test_password2");
    for await (let x of Array(defaultFilter.max * 2).keys()) {
        await persistence.createCrumb(null, "test_user", [{type: "text", value: `test crumb ${x}`}]);
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
    let persistence = socialGraphTestDB();
    await persistence.init();
    await persistence.dropDatabase();
    await testUserDB().flushLoginInfo();
    await console.log("Databases flushed");
}

