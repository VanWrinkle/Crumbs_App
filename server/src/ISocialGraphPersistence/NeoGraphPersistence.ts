import {ISocialGraphPersistence, UserPostData, UserPostView} from "./ISocialGraphPersistence";
import neo4j from 'neo4j-driver'
import json from 'json5';
import {Order, Sort} from "../IPostPresentationService/IPostPresentationService";

const neo4j_username = "neo4j"
const neo4j_password = "crumbdevsrule"
const neo4j_url = "neo4j://10.212.172.128:7687"


export class CrumbFilter {
    parent_post: string | undefined
    authors: string[] | undefined
    hashtags: string[] | undefined
    descending = true
    order = Order.Descending
    sort = Sort.Time
    max = 15
}


export class NeoGraphPersistence implements ISocialGraphPersistence {
    // TODO: Review security of connection
    #driver = neo4j.driver(neo4j_url, neo4j.auth.basic(neo4j_username, neo4j_password))

    async createUserNode(username: string): Promise<void> {
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

    async deleteUserNode(username: string): Promise<void> {
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
            if (parent != null && typeof(parent) != typeof ("")) {throw new Error('post id must be integer')}
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
                        contents: crumb.contents,
                        flags: crumb.flags
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

    async getCrumbs(user: string | null, filter: CrumbFilter): Promise <UserPostView[]> {
        let view: UserPostView[] = [];
        let engagement = filter.sort === Sort.Engagement
        let desc = filter.order === Order.Descending
        let query =
            `MATCH (c:Crumb)-[:POSTED_BY]->(author)
            ${filter.authors != undefined? "WHERE author.username IN $authors" : ""}
            ${filter.parent_post!=undefined? `MATCH (c)-[:REPLIES_TO]->(p:Crumb) WHERE ID(p) = ${filter.parent_post}`:""}
            OPTIONAL MATCH (c)<-[:LIKES]-(liker)
            ${engagement? "OPTIONAL MATCH (c)<-[:REPLIES_TO]-(reply)" : ""}
            WITH c, author, COUNT(DISTINCT liker) AS likes ${engagement? ", COUNT(DISTINCT reply) AS replies":""}
            RETURN c, author, likes${engagement?", replies, likes + replies AS engagement":""}
            ORDER BY ${engagement? "replies":"c.created"} ${desc? "DESC":""}
            LIMIT ${filter.max};`
        console.log(query)
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    query,
                    {
                        authors: filter.authors,
                        hashtags: filter.hashtags
                    }
                )
                .then( results => {
                    results.records.forEach( record => {
                        let crumb: UserPostView = {
                            author: record.get('author').properties.username,
                            post_id: record.get('c').identity.toString(),
                            likes: record.get('likes').low,
                            liked: false,
                            contents: [

                            ]
                        };
                        console.log(crumb)
                        view.push(crumb)
                    })
                })
                .catch( error => {
                    console.error(error)
                })
                .finally( () => {
                    session.close();
                    resolve(view);
                })
        })
    }

    async setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void> {
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
    async setCrumbLiked(username: string, crumb_id: string, likes: boolean) : Promise<void> {
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
