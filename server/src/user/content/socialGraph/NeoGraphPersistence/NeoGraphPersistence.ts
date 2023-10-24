import {ISocialGraphPersistence} from "../../../../contracts/ISocialGraphPersistence";
import neo4j, {Driver} from 'neo4j-driver'

import {Neo4jQueryBuilder} from "./Neo4jQueryBuilder";
import {CrumbFilter} from "../../../../entities/CrumbFilter";
import {Crumb, CrumbContent} from "../../../../entities/Crumb";
import {User} from "../../../../entities/User";







export class NeoGraphPersistence implements ISocialGraphPersistence {
    // TODO: Review security of connection
    #driver: Driver

    constructor(
        db_url:string,
        db_username: string,
        db_password: string,
    ) {
        this.#driver = neo4j.driver(db_url, neo4j.auth.basic(db_username, db_password))
    }

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
                    "CREATE (user:User {username: $user, created: timestamp()})",
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
    async createCrumb(parent: string | null, username: string, crumb: CrumbContent[]): Promise<void> {
        return new Promise( resolve => {
            if (parent != null && typeof(parent) != typeof ("")) {
                throw new Error('post id must be integer')
            }
            let contents: string[] = [];
            let flags: string[] = [];
            crumb.forEach( component => {
                contents.push(component.value)
                flags.push(component.type)
            })
            let query = `MATCH (u:User {username: $user}) 
                    ${parent != null? "MATCH (p) WHERE ID(p) = " + parent : ""}
                    CREATE (c:Crumb {contents: $contents, flags: $flags, created: timestamp()})
                    -[:POSTED_BY]->(u)
                    ${parent != null? "CREATE (c)-[:REPLIES_TO]->(p)":""}`
            console.log(query)
            let session = this.#driver.session();
            session
                .run(
                    query,
                    {
                        user: username,
                        contents: contents,
                        flags: flags
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


    updateCrumb(crumb_id: string, newBody: CrumbContent[]): Promise<void> {
        return new Promise(() => {})
    }
    deleteCrumb(crumb_id: string): Promise<void> {
        return new Promise(() => {})
    }
    getCrumb(crumb_id: string): Promise <Crumb> {
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
    async getCrumbs(user: string | null, filter: CrumbFilter, cutoff: string | null): Promise <Crumb[]> {
        if (cutoff === "") {cutoff = null} // Simplifies logic un the query construction
        let view: Crumb[] = [];
        let engagement = filter.sort === CrumbFilter.Sort.Engagement
        let parentID = 0;
        //TODO: do it better
        if (filter.parent_post && parseInt(filter.parent_post.toString())) {
            parentID = parseInt(filter.parent_post.toString());
        }
        //TODO: fetch engagement for single post
        let query =
            `
            ${filter.parent_post!=undefined? 
                "MATCH (parent)<-[:REPLIES_TO]-(crumb:Crumb)-[p:POSTED_BY]->(author)"
                :"MATCH (crumb:Crumb)-[p:POSTED_BY]->(author)"}
            ${Neo4jQueryBuilder.WHERE([
                filter.parent_post? "ID(parent) = $parent":"",
                (user)?"author.username <> $user":"",
                (filter.authors)?"author.username IN $authors":"",
                (filter.hashtags)?"":"" //TODO: Implement hashtags in DB
            ])}
            OPTIONAL MATCH (crumb)<-[liked:LIKES]-(liker)
            ${user? "MATCH (user:User {username: $user})":""}
            ${cutoff? "MATCH (cutoff:Crumb) WHERE ID(cutoff) = " +  cutoff:""}
            OPTIONAL MATCH (crumb)<-[:REPLIES_TO]-(reply)
            ${Neo4jQueryBuilder.WITH([
                "crumb",
                "author",
                user ? "user" : "",
                cutoff? "cutoff.created AS cutoff" : "",
                "COUNT(DISTINCT liker) AS likes",
                "COUNT(DISTINCT reply) AS replies",
            ])}
            ${cutoff?
                Neo4jQueryBuilder.WHERE_CUTOFF(
                engagement?"crumb.created":"crumb.created",
                engagement?"cutoff":"cutoff",
                filter.order)
                :
                ""}
            ${Neo4jQueryBuilder.RETURN([
                "crumb",
                "author",
                "likes",
                "replies",
                `${user? "EXISTS( (user)-[:LIKES]->(crumb) )":"false"} AS liked`,
                engagement?"likes + replies AS engagement":""
            ])}
            ${Neo4jQueryBuilder.ORDER_BY(
                [engagement? "engagement":"","crumb.created"], 
                filter.order)}
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
                        parent: parentID
                    }
                )
                .then( results => {
                    results.records.forEach( record => {
                        let flags = record.get('crumb').properties.flags;
                        let values = record.get('crumb').properties.contents;
                        let contents: CrumbContent[] = [];
                        for (let i = 0; i < flags.length; i++) {
                            contents.push({
                                type: flags[i],
                                value: values[i]
                            })
                        }
                        let timestamp = Number(record.get('crumb').properties.created.toBigInt());
                        let crumb: Crumb = {
                            author: record.get('author').properties.username,
                            timestamp_milliseconds: timestamp,
                            post_id: record.get('crumb').identity.toString(),
                            likes: record.get('likes').low,
                            replies: record.get('replies').low,
                            liked: record.get('liked'),
                            contents: contents
                        };
                        console.log("id: " + crumb.post_id + "   created: " + crumb.timestamp_milliseconds)
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
            console.log(following? addFollow : deleteFollow)

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

    async getProfileInfo(activeUser: string | null, targetUser: string): Promise<User> {
        let query =
            `MATCH (user:User {username: $user})
            OPTIONAL MATCH (user)-[:FOLLOWS]->(following)
            OPTIONAL MATCH (user)<-[:FOLLOWS]-(followed_by)
            ${Neo4jQueryBuilder.WITH([
                "user",
                "COUNT(following) AS follows_count",
                "COUNT(followed_by) AS followed_count",
                activeUser?
                "EXISTS( (activeUser:User)-[:FOLLOWS]->(user) WHERE activeUser.username = $activeUser AND user.username = $user ) AS following"
                :""
            ])}
            ${Neo4jQueryBuilder.RETURN([
                "user",
                "user.created AS created",
                "follows_count",
                "followed_count",
                activeUser? "following" : ""
            ])}
                `;
        console.log(query);
        return new Promise<User>( resolve => {
            let session = this.#driver.session();
            session
                .run(
                    query,
                    {
                        user: targetUser,
                        activeUser: activeUser
                    }
                )
                .then( results => {
                    let matches: User[] = []
                    results.records.forEach( record => {
                        let user: User = {
                            username: targetUser,
                            joined: Number(record.get('created').toBigInt()),
                            is_followed_by_user: activeUser? record.get('following') : false,
                            followers_count: record.get('followed_count').low,
                            following_count: record.get('follows_count').low
                        };
                        matches.push(user)
                    })
                    if(matches.length != 1) {
                        //TODO: Error handling
                    } else {
                        resolve(matches[0])
                    }
                })
                .catch( error => {
                    console.error(error)
                })
                .finally( () => {
                    session.close();
                })
        })
    }
}



