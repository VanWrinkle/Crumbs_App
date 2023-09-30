import {ISocialGraphPersistence, UserPostData, UserPostView} from "./ISocialGraphPersistence";
import neo4j from 'neo4j-driver'
const neo4j_username = "neo4j"
const neo4j_password = "crumbdevsrule"
const neo4j_url = "neo4j://10.212.172.128:7687"
import json from 'json5';



export class NeoGraphPersistence implements ISocialGraphPersistence {
    // TODO: Review security of connection
    #driver = neo4j.driver(neo4j_url, neo4j.auth.basic(neo4j_username, neo4j_password))

    createUserNode(username: string): Promise<void> {
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    "CREATE (user:User {username: $user})",
                    {user: username})
                .finally( () => {
                    session.close();
                    resolve();
                })
        })
    }

    deleteUserNode(username: string): Promise<void> {
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    `MATCH (u:User {username: $user})
                     OPTIONAL MATCH (c:Crumb)-[:POSTED_BY]->(u)
                     DETACH DELETE c
                     DETACH DELETE u`,
                    {user: username}
                )
                .finally( () => {
                    session.close();
                    resolve();
                })
        })
    }

    async createCrumb(parent: string | null, username: string, crumb: UserPostData): Promise<void> {
        return new Promise( resolve => {
            if (typeof(parent) != typeof ("")) {throw new Error('post id must be integer')}
            let session = this.#driver.session();
            session
                .run(
                    `MATCH (u:User {username: $user}) 
                    ${parent != null? "MATCH (p) WHERE ID(p) = " + parent : ""}
                    CREATE (c:Crumb {contents: $contents, flags: $flags})
                    -[:POSTED_BY {created: timestamp()}]->(u)
                    ${parent != null? "CREATE (c)-[:REPLIES_TO]->(p)":""}`,
                    {
                        user: username,
                        contents: json.stringify(crumb.contents),
                        flags: json.stringify(crumb.flags)
                    }
                )
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



    setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void> {
        let addFollow =
            `MATCH (n:User {username: $user})
            MATCH (m:User {username: $followTarget})
            CREATE (n)-[:FOLLOWS]->(m)`
        let deleteFollow =
            `MATCH (n:User {username: $user})-[f:FOLLOWS]->(m:User {username: $followTarget})
            DELETE f`

        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    following? addFollow : deleteFollow,
                    {
                        followTarget: followTarget,
                        user: username
                    })
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
    setCrumbLiked(username: string, crumb_id: string, likes: boolean) : Promise<void> {
        let id = parseInt(crumb_id);
        if (id === undefined) { throw new Error('Neo4j id must be an int'); }
        let addLike =
            `MATCH (n:User {username: '${username}'})
            MATCH (c:Crumb) 
            WHERE ID(c) = ${id}
            CREATE (n)-[:LIKES]->(c)`
        let removeLike =
            `MATCH (c:Crumb) 
            WHERE ID(c) = ${id}
            MATCH (n:User {username: '${username}'})-[l:LIKES]->(c)
            DELETE l`

        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run( likes? addLike : removeLike )
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
}