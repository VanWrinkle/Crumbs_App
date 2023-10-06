import {ISocialGraphPersistence, PostComponent, UserPostData, UserPostView} from "./ISocialGraphPersistence";
import neo4j from 'neo4j-driver'
import json from 'json5';
import {Order, Sort} from "../IPostPresentationService/IPostPresentationService";

const neo4j_username = "neo4j"
const neo4j_password = "crumbdevsrule"
const neo4j_url = "neo4j://10.212.172.128:7687"


/**
 * Represents a filter configuration for retrieving crumbs (posts) in the application.
 */
export class CrumbFilter {
    /**
     * The ID of the parent post to filter crumbs by replies.
     * If undefined, no filtering by parent post is applied.
     */
    parent_post: string | undefined;

    /**
     * An array of author usernames to filter crumbs by specific authors.
     * If undefined, no filtering by authors is applied.
     */
    authors: string[] | undefined;

    /**
     * An array of hashtags to filter crumbs by specific hashtags.
     * If undefined, no filtering by hashtags is applied.
     */
    hashtags: string[] | undefined;


    /**
     * The order in which crumbs should be sorted (e.g., by time, engagement, etc.).
     * Default: Order.Descending
     */
    order = Order.Descending;

    /**
     * The method used for sorting crumbs (e.g., by time, engagement, etc.).
     * Default: Sort.Time
     */
    sort = Sort.Time;

    /**
     * The maximum number of crumbs to retrieve. Limits the result set.
     * Default: 15
     */
    max = 15;
}



export class NeoGraphPersistence implements ISocialGraphPersistence {
    // TODO: Review security of connection
    #driver = neo4j.driver(neo4j_url, neo4j.auth.basic(neo4j_username, neo4j_password))

    /**
     * @brief Creates a new user node in the Neo4j database.
     *
     * This function creates a new user node in the Neo4j database with the provided username.
     *
     * @param username The username of the user to be created as a new user node.
     *
     * @return A Promise that resolves when the user node is successfully created in the database.
     */
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


    /**
     * @brief Deletes a user node and all Crumb (post) nodes posted by that user in the Neo4j database.
     *
     * This function deletes a user node and all associated Crumb (post) nodes posted by that user from the Neo4j database.
     *
     * @param username The username of the user whose node and Crumb nodes are to be deleted.
     *
     * @return A Promise that resolves when the user node and associated Crumb nodes are successfully deleted from the database.
     */
    async deleteUserNodeAndUserCrumbs(username: string): Promise<void> {
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


    /**
     * @brief Creates a new Crumb (post) in the Neo4j database.
     *
     * This function creates a new Crumb (post) in the Neo4j database with the provided user as the author.
     *
     * @param parent The ID of the parent Crumb (post) to which this Crumb is a reply, or null if it's a new post.
     * @param username The username of the user creating the Crumb.
     * @param crumb An object containing the data for the new Crumb, including its contents and flags.
     *
     * @return A Promise that resolves when the Crumb is successfully created in the database.
     *
     * @throws {Error} Throws an error if the parent ID is provided and is not a valid integer.
     */
    async createCrumb(parent: string | null, username: string, crumb: UserPostData): Promise<void> {
        return new Promise( resolve => {
            if (parent != null && typeof(parent) != typeof ("")) {throw new Error('post id must be integer')}
            let session = this.#driver.session();
            session
                .run(
                    `MATCH (u:User {username: $user}) 
                    ${parent != null? "MATCH (p) WHERE ID(p) = " + parent : ""}
                    CREATE (c:Crumb {contents: $contents, flags: $flags, created: timestamp()})
                    -[:POSTED_BY]->(u)
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


    /**
     * Retrieves a list of UserPostView objects based on specified user and filter criteria.
     *
     * @param user The username of the user for whom to retrieve crumbs or null for all users.
     * @param filter An object specifying filter criteria, including sorting, ordering, authors, and more.
     * @param cutoff ID of post used to get cutoff value for time or engagement
     * @returns A Promise that resolves to an array of UserPostView objects representing the retrieved crumbs.
     */
    async getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <UserPostView[]> {
        let view: UserPostView[] = [];
        let engagement = filter.sort === Sort.Engagement
        let desc = filter.order === Order.Descending
        //TODO: fetch engagement for single post
        let query =
            `MATCH (c:Crumb)-[p:POSTED_BY]->(author)
            WHERE author.username <> $user
            ${filter.authors != undefined? "WHERE author.username IN $authors" : ""}
            ${filter.parent_post!=undefined? "MATCH (c)-[:REPLIES_TO]->(p:Crumb) WHERE ID(p) = $parent":""}
            OPTIONAL MATCH (c)<-[:LIKES]-(liker)
            ${cutoff? "MATCH (cutoff:Crumb) WHERE ID(cutoff) = " +  cutoff:""}
            ${engagement? "OPTIONAL MATCH (c)<-[:REPLIES_TO]-(reply)" : ""}
            WITH c, author, ${cutoff?"cutoff.created AS cutoff,":""} COUNT(DISTINCT liker) AS likes ${engagement? ", COUNT(DISTINCT reply) AS replies":""}
            ${cutoff? (engagement? "WHERE c.created > cutoff":"WHERE c.created < cutoff") :""}
            RETURN c, author, likes${engagement?", replies, likes + replies AS engagement":""}
            ORDER BY ${engagement? "engagement":"c.created"} ${desc? "DESC":""}
            LIMIT ${filter.max};`
        console.log(query)
        return new Promise( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    query,
                    {
                        user: user,
                        authors: filter.authors,
                        hashtags: filter.hashtags,
                        parent: filter.parent_post
                    }
                )
                .then( results => {
                    results.records.forEach( record => {
                        let flags = record.get('c').properties.flags;
                        let values = record.get('c').properties.contents;
                        let contents: PostComponent[] = [];
                        for (let i = 0; i < flags.length; i++) {
                            contents.push({
                                type: flags[i],
                                value: values[i]
                            })
                        }
                        let crumb: UserPostView = {
                            author: record.get('author').properties.username,
                            post_id: record.get('c').identity.toString(),
                            likes: record.get('likes').low,
                            liked: false,
                            contents: contents
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


    /**
     * @brief Sets or removes a follow relationship between two users in the Neo4j database.
     *
     * This function creates or deletes a "FOLLOWS" relationship between two users in the Neo4j database,
     * based on the provided parameters.
     *
     * @param username The username of the user initiating the follow or unfollow action.
     * @param followTarget The username of the user to be followed or unfollowed.
     * @param following A boolean indicating whether to establish a follow (true) or remove a follow (false).
     *
     * @return A Promise that resolves when the follow relationship is successfully updated in the database.
     */
    async setUserFollowing(username: string, followTarget: string, following: boolean): Promise <void> {
        let addFollow =
            `MATCH (n:User {username: $user})
            MATCH (m:User {username: $followTarget})
            WHERE NOT EXISTS((n)-[:FOLLOWS]->(m)) AND n.username <> m.username
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


    /**
     * @brief Sets or removes a "LIKES" relationship between a user and a Crumb (post) in the Neo4j database.
     *
     * This function creates or deletes a "LIKES" relationship between a user and a Crumb (post) in the Neo4j database,
     * based on the provided parameters.
     *
     * @param username The username of the user performing the like or dislike action.
     * @param crumb_id The Neo4j ID of the Crumb (post) to be liked or unliked.
     * @param likes A boolean indicating whether to like (true) or remove a like (false) from the Crumb.
     *
     * @return A Promise that resolves when the "LIKES" relationship is successfully updated in the database.
     *
     * @throws {Error} Throws an error if the provided Neo4j ID is not a valid integer.
     */
    async setCrumbLiked(username: string, crumb_id: string, likes: boolean) : Promise<void> {
        let id = parseInt(crumb_id);
        if (id === undefined) { throw new Error('Neo4j id must be an int'); }
        let addLike =
            `MATCH (n:User {username: '${username}'})
            MATCH (m: User)<-[:POSTED_BY]-(c:Crumb)
            WHERE ID(c) = ${id} AND NOT EXISTS((n)-[:LIKES]->(c)) AND m.username <> n.username
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
