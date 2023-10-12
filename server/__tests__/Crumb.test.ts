import {Crumb, CrumbContent} from "../src/entities/Crumb";


test('should successfully parse hashtags and mentions in the middle of crumb', async () => {
    const post = [
        { type: "text", value: "I'd like to bring attention to " },
        { type: "hashtag", value: "#paralympics" },
        { type: "text", value: ", starting this weekend. Thanks to " },
        { type: "mention", value: "@Bugbear98" },
        { type: "text", value: " for bringing it to my attention." }
    ];
    const unparsed = "I'd like to bring attention to #paralympics, starting this weekend. Thanks to @Bugbear98 for bringing it to my attention.";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should successfully parse hashtags and mentions at either end of crumb', async () => {
    const post = [
        { type: "hashtag", value: "#test_tag" },
        { type: "text", value: " some words " },
        { type: "mention", value: "@test_user" }
    ];
    const unparsed = "#test_tag some words @test_user";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should successfully parse empty string', async () => {
    const post: CrumbContent[] = [];
    const unparsed = "";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should successfully parse a simple string', async () => {
    const post = [{ type: "text", value: "A little duck waddled across the street." }];
    const unparsed = "A little duck waddled across the street.";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should treat mid text and loose # or @ as regular text', async () => {
    const post = [{ type: "text", value: "A little du@ck wad#dled across @ # the street." }];
    const unparsed = "A little du@ck wad#dled across @ # the street.";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should treat comma-separated tags as distinct tags', async () => {
    const post = [
        { type: "text", value: "Here are some tags " },
        { type: "hashtag", value: "#tag" },
        { type: "text", value: "," },
        { type: "hashtag", value: "#tag2" }
    ];
    const unparsed = "Here are some tags #tag,#tag2";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should not treat a URL as a hashtag', async () => {
    const post = [
        { type: "hashtag", value: "#www" },
        { type: "text", value: ".google.com" }
    ];
    const unparsed = "#www.google.com";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});

test('should allow word characters a-z, A-Z, 0-9, and _', async () => {
    const post = [{ type: "hashtag", value: "#17_Mai" }];
    const unparsed = "#17_Mai";

    expect(Crumb.parseContentsFromString(unparsed)).toStrictEqual(post);
});
