import {NeoGraphPersistence} from "../../src/user/content/socialGraph/NeoGraphPersistence/NeoGraphPersistence";
import {Crumb, CrumbContent} from "../../src/entities/Crumb";


const neo = new NeoGraphPersistence(
                "neo4j://10.212.172.128:7687",
                "neo4j",
                "crumbdevsrule"
            );

test('instantiate complex social graph', async () => {
    const usernames = [
        'HappyGiraffe87',
        'SunshineRunner',
        'CoolDolphin42',
        'StarryNight123',
        'MountainExplorer',
        'CoffeeLover55',
        'TechNinja99',
        'MusicJunkie28',
        'AdventureSeeker',
        'Beachcomber75',
        'NightOwl17',
        'NatureEnthusiast',
        'Bookworm2022',
        'SkyWatcher64',
        'FoodieAdventurer',
        'HikingFanatic',
        'ArtisticSoul22',
        'YogaMaster36',
        'GamerPro99',
        'TravelBug88'
    ];
/*
    let post: UserPostData = {
        contents: [ "text" ],
        flags: [ ComponentType.Text ]
    }

    let crumbIDs: string[] = []

    usernames.forEach( name => {
        neo.createUserNode(name);
    })
    usernames.forEach( name => {
        for( let i = 0; i < 5; i++) {

            neo.createCrumb(null, name, post)
            neo.setUserFollowing(name, usernames[Math.floor(Math.random() * 20)], true)
        }
        let filter = new CrumbFilter()
        filter.authors = [name];
        neo.getCrumbs(null, filter, null)
            .then(crumbs => {
                crumbs.forEach( crumb => {
                    crumbIDs.push(crumb.post_id)
                })
            })

        crumbIDs.push()
    })
    let sleep = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(2000)
    console.log(crumbIDs.length)
    usernames.forEach(user => {
        for(let i = 0; i < 40; i++ ) {
            neo.setCrumbLiked(user, crumbIDs[Math.floor(Math.random()*crumbIDs.length)], true)
            neo.createCrumb(crumbIDs[Math.floor(Math.random()*crumbIDs.length)], user, post)
        }
    })
*/
})


//////////////// MANAGING USER NODES ///////////////////////////////////////////
test('should successfully delete user and their posts', async () => {
    const usernames = [
        'HappyGiraffe87',
        'SunshineRunner',
        'CoolDolphin42',
        'StarryNight123',
        'MountainExplorer',
        'CoffeeLover55',
        'TechNinja99',
        'MusicJunkie28',
        'AdventureSeeker',
        'Beachcomber75',
        'NightOwl17',
        'NatureEnthusiast',
        'Bookworm2022',
        'SkyWatcher64',
        'FoodieAdventurer',
        'HikingFanatic',
        'ArtisticSoul22',
        'YogaMaster36',
        'GamerPro99',
        'TravelBug88'
    ];
    await usernames.forEach(async name => await neo.deleteUserAndCrumbs(name))
    // await neo.deleteUserNodeAndUserCrumbs("NightOwl17")
})
/*
test('should successfully create new user nodes', async () => {
    let users = ['johnny','bobby','trent','xXxninjaslayer2011xXx'];
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
*/


///////////// MANAGING CRUMBS //////////////////////////////////////////////////
/*
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
*/
/*
test('should successfully create reply to post', async () => {
    let post: CrumbContents = {
        contents: [
            "Nå må du gi deg da"
        ],
        flags: [
            CrumbComponentType.Text
        ]
    }
    await neo.createCrumb("1039", "vanwrinkle", post);
})
*/

/*
*/

////////  MANAGING RELATIONSHIPS //////////////////////////////////////////////
/*
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
*/
/*
test('should retrieve posts', async () => {
    let filter = new CrumbFilter();
    filter.sort = Sort.Time;
    filter.max = 5
    await neo.getCrumbs(null, filter, null);
})
*/



