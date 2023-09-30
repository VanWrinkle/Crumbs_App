import {NeoGraphPersistence} from "../src/ISocialGraphPersistence/NeoGraphPersistence";
import {ComponentType, UserPostData} from "../src/ISocialGraphPersistence/ISocialGraphPersistence";


const neo = new NeoGraphPersistence();

test('should successfully create new user nodes', async () => {
    let users = ['johnny','bobby','trent'];
    users.forEach( username => {
        neo.createUserNode(username);
    })

    let post: UserPostData = {
        contents: [
            "This is some plain text",
            "DicksOutForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb("bobby", post);

    let post2: UserPostData = {
        contents: [
            "Dickbags",
            "DicksOutForHarambe"
        ],
        flags: [
            ComponentType.Text,
            ComponentType.Hash
        ]
    }
    await neo.createCrumb("portajohn", post2);
    await neo.setUserFollowing("bobby", "johnny", true);

})

test('should successfully create follow relationship', async () => {
    await neo.setUserFollowing("bobby", "johnny", true);

})

