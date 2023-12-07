import request from "supertest";
import {
    httpsCertificate,
    httpsPrivateKey,
} from "../../src/globals";
import {CrumbFilter} from "../../src/entities/CrumbFilter";
import {TestServerConfigs} from "../../src/testUtility/testServerConfig";
import {flushDatabases, seedDatabase} from "../../src/testUtility/serverTestUtility";



/// TEST SETUP AND TEARDOWN ////////////////////////////////////////////////////

// See https://jestjs.io/docs/setup-teardown for reference
beforeAll(() =>{
    return seedDatabase();
});
afterAll(() => {
    return flushDatabases();
});



/// VARIABLES //////////////////////////////////////////////////////////////////

let defaultFilter = new CrumbFilter();



/// GET TESTS //////////////////////////////////////////////////////////////////

describe('GET /api/getMainFeed', () => {


    it('should return an array of crumbs with default max length', async () => {
        let server = TestServerConfigs.default();
        server.run();
        await new Promise(resolve => setTimeout(resolve, 200));
        const response = await request("https://localhost")
            .get(`/api/getMainFeed`)
            .trustLocalhost(true)
            .key(httpsPrivateKey)
            .cert(httpsCertificate)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        // Verifies that the response is an array
        expect(Array.isArray(response.body)).toBe(true);
        // Verifies that the default max length is used
        expect(response.body.length).toBe(defaultFilter.max);

        // Verifies that the crumbs have the correct properties
        expect(response.body[0]).toHaveProperty('author');
        expect(response.body[0]).toHaveProperty('timestamp_milliseconds');
        expect(response.body[0]).toHaveProperty('post_id');
        expect(response.body[0]).toHaveProperty('likes');
        expect(response.body[0]).toHaveProperty('replies');
        expect(response.body[0]).toHaveProperty('liked');
        expect(response.body[0]).toHaveProperty('contents');
        await server.stop();
    })


    it('should handle malformed query values', async () => {
        let server = TestServerConfigs.default();
        await server.run();
        await new Promise(resolve => setTimeout(resolve, 200));
        const res = await request("https://localhost")
            .get(`/api/getMainFeed?max_posts=not_a_number&sort=12`)
            .trustLocalhost(true)
            .key(httpsPrivateKey)
            .cert(httpsCertificate)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        // These tests checks that the default values are used when the query values are invalid
        expect(res.body.length).toBe(defaultFilter.max);
        // Newer posts have a higher timestamp value than older posts.
        expect(res.body[0].timestamp_milliseconds)
            .toBeGreaterThan(res.body[defaultFilter.max-1].timestamp_milliseconds);

        await server.stop();
    });


    it('should return Status 504 when the graph database connection fails', async () => {
        let server = TestServerConfigs.graphDBErrorServer();
        await server.run();
        await new Promise(resolve => setTimeout(resolve, 200));

        await request("https://localhost")
            .get(`/api/getMainFeed`)
            .trustLocalhost(true)
            .key(httpsPrivateKey)
            .cert(httpsCertificate)
            .expect(504);
        await server.stop();
    })
});


