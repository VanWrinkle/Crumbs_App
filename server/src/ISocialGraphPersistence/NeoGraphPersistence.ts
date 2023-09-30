import {ISocialGraphPersistence, UserPostData, UserPostView} from "./ISocialGraphPersistence";
import neo4j from 'neo4j-driver'
const neo4j_username = "neo4j"
const neo4j_password = "crumbdevsrule"
const neo4j_url = "neo4j://10.212.172.128:7687"
import json from 'json5';



export class NeoGraphPersistence implements ISocialGraphPersistence {
    // TODO: Review security of connection
    #driver = neo4j.driver(neo4j_url, neo4j.auth.basic(neo4j_username, neo4j_password))

    async testConnectivity(): Promise<void> {
        return new Promise( resolve => {
            this.#driver.verifyConnectivity()
                .then( () => {
                    console.log("connected successfully")
                })
                .catch( (error) => {
                    console.error("Connection or authentication failed:", error)
                })
        })
    }
    createUserNode(username: string): Promise<void> {
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    `CREATE (user:User {username: '${username}'})`)
                .then( () => {})
                .finally( () => {
                    session.close();
                    resolve();
                })
        })
    }

    deleteUserNode(username: string): Promise<void> {
        return new Promise(() => {})
    }

    async createCrumb(username: string, crumb: UserPostData): Promise<void> {
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    `MATCH (u:User {username:'${username}'}) 
                    CREATE (c:Crumb {contents: ${json.stringify(crumb.contents)}, flags: ${json.stringify(crumb.flags)}})
                    -[:POSTED_BY {created: timestamp()}]->(u)`)
                .then( () => {})
                .catch( error => {
                    console.error(error)
                })
                .finally( () => {
                    session.close();
                    resolve();
                })
        })
    }






























    updateCrumb(crumb_id: string, newBody: UserPostData): Promise<void> {
        return new Promise(() => {})
    }
    deleteCrumb(crumb_id: string): Promise<void> {
        return new Promise(() => {})
    }
    getCrumb(crumb_id: string): Promise <UserPostView> {
        return new Promise(() => {})
    }
    // Relationships
    setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void> {
        let addFollow =
            `MATCH (n:User {username: '${username}'})
            MATCH (m:User {username: '${followTarget}'})
            CREATE (n)-[:FOLLOWS]->(m)`
        let deleteFollow =
            `MATCH (n:User {username: '${username}'})-[f:FOLLOWS]->(m:User {username: '${followTarget}'})
            DELETE f`

        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run( following? addFollow : deleteFollow )
                .then( () => {})
                .catch( error => {
                    console.error(error)
                })
                .finally( () => {
                    session.close();
                    resolve();
                })
        })
    }
    setCrumbLiked(username: string, liked: boolean) : Promise<void> {
        return new Promise(() => {})
    }
    setCrumbParent(crumb_id: string, parent_id: string): Promise<void> {
        return new Promise(() => {})
    }
}