import {UserPostData} from "../src/ISocialGraphPersistence/ISocialGraphPersistence";
import {CrumbParser} from "../src/CrumbParser/CrumbParser";




test ('should successfully parse hashtags and mentions in the middle of crumb', async  () => {

    let post: UserPostData =  {
        flags: ["text","hashtag","text","mention","text"],
        contents: ["I'd like to bring attention to ", "#paralympics",", starting this weekend. Thanks to ", "@Bugbear98", " for bringing it to my attention."]
    }
    const unparsed = "I'd like to bring attention to #paralympics, starting this weekend. Thanks to @Bugbear98 for bringing it to my attention."


    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})

test ('should successfully parse hashtags and mentions at either end of crumb', async  () => {

    let post: UserPostData =  {
        flags: ["hashtag", "text", "mention"],
        contents: ["#test_tag"," some words ", "@test_user"]
    }
    const unparsed = "#test_tag some words @test_user";


    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})

test ('should successfully parse empty string', async  () => {

    let post: UserPostData =  {
        flags: [],
        contents: []
    }
    const unparsed = "";


    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})


test ('should successfully parse a simple string', async  () => {

    let post: UserPostData =  {
        flags: ["text"],
        contents: ["A little duck waddled across the street."]
    }
    const unparsed = "A little duck waddled across the street.";


    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})

test ('should treat mid text and loose # or @ as regular text', async  () => {

    let post: UserPostData =  {
        flags: ["text"],
        contents: ["A little du@ck wad#dled across @ # the street."]
    }
    const unparsed = "A little du@ck wad#dled across @ # the street.";


    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})


test ('should treat comma separated tags as distinct tags', async  () => {

    let post: UserPostData =  {
        flags: ["text","hashtag","text","hashtag"],
        contents: ["Here are some tags ", "#tag",",","#tag2"]
    }
    const unparsed = "Here are some tags #tag,#tag2";

    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})

test ('should not treat an url as a hashtag', async  () => {

    let post: UserPostData =  {
        flags: ["hashtag","text"],
        contents: ["#www",".google.com"]
    }
    const unparsed = "#www.google.com";

    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})

test ('should allow word characters a-z, A-Z, 0-9 and _', async  () => {

    let post: UserPostData =  {
        flags: ["hashtag"],
        contents: ["#17_Mai"]
    }
    const unparsed = "#17_Mai";

    expect(CrumbParser.parseCrumb(unparsed)).toStrictEqual(post)
})