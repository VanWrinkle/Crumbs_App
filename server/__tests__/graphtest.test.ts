import {NeoGraphPersistence} from "../src/ISocialGraphPersistence/NeoGraphPersistence";
import {ComponentType, UserPostData} from "../src/ISocialGraphPersistence/ISocialGraphPersistence";


const neo = new NeoGraphPersistence();

test('should successfully create new user', async () => {
    await neo.createUserNode("André")
})

test('should successfully delete user and their posts', async () => {
    await neo.deleteUserNode("treng")
})

test('should successfully create new user nodes', async () => {
    let users = ['johnny','bobby','trent'];
    users.forEach( username => {
        neo.createUserNode(username);
    })

    let post: UserPostData = {
        contents: [
            "This is some plain text",
            "ForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb(null, "bobby", post);

    let post2: UserPostData = {
        contents: [
            "qdqwewqeasda",
            "ForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb(null, "portajohn", post2);
})

test('should successfully create freestanding post', async () => {
    let post: UserPostData = {
        contents: [
            "oij13oi1joij",
            "ForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb(null, "trent", post);
})

test('should successfully create reply to post', async () => {
    let post: UserPostData = {
        contents: [
            "oij13oi1joij",
            "ForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb("127", "trent", post);
})

test('should successfully create follow relationship', async () => {
    await neo.setUserFollowing("André", "trent", true);
})

test('should successfully remove follow relationship', async () => {
    await neo.setUserFollowing("André", "trent", false);
})
test('should successfully create like relationship', async () => {
    await neo.setCrumbLiked("André", "127", true);
})

test('should successfully remove like relationship', async () => {
    await neo.setCrumbLiked("johnny", "117", false);
})


