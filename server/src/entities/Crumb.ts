
export class Crumb {
    static #hashtagRegEx = /(?<!\w)#\w+/g;
    static #mentionRegEx = /(?<!\w)@\w+/g;

    author: string
    timestamp_milliseconds: number
    post_id: string
    likes: number
    liked: boolean
    contents: CrumbContent[]

    constructor(
        author: string,
        timestamp_milliseconds: number,
        post_id: string,
        likes: number,
        liked: boolean,
        contents: string | undefined
    ) {
        this.author = author;
        this.timestamp_milliseconds = timestamp_milliseconds;
        this.post_id = post_id;
        this.likes = likes;
        this.liked = liked;
        if (contents) {
            this.contents = Crumb.parseContentsFromString(contents);
        } else {
            this.contents = []
        }
    }

    static parseContentsFromString(crumbText: string): CrumbContent[] {
        let crumbContent: CrumbContent[] = []
        let indices: Index[]  = []
        indices = Crumb.#getWordMatchIndices(
            crumbText, Crumb.#hashtagRegEx, indices, "hashtag");
        indices = Crumb.#getWordMatchIndices(
            crumbText, Crumb.#mentionRegEx, indices, "mention");
        indices.sort( (a, b) => { return a.start - b.start })
        if (indices.length != 0) {
            indices = Crumb.#fillInTextIndices(indices, crumbText.length)
            indices.forEach( (index) => {
                crumbContent.push( {
                    type: index.type,
                    value: crumbText.substring(index.start, index.end)
                })
            })
        } else if (crumbText.length != 0 ) {
            crumbContent.push({
                type: CrumbComponentType.Text,
                value: crumbText
            })
        }
        return crumbContent;
    }

    static #getWordMatchIndices(text: string, regex: RegExp, indices:Index[], type:string)  {
        let match:  RegExpExecArray | null;
        while ((match = regex.exec(text)) != null) {
            indices.push({
                start: match.index,
                end: match.index+match[0].length,
                type: type
            })
        }
        return indices;
    }

    static #fillInTextIndices(indices: Index[], wordLength: number) {
        if (indices != undefined) {}
        let filledIndices: Index[] = []
        if(indices[0].start != 0) {
            filledIndices.push({
                start: 0,
                end: indices[0].start,
                type: CrumbComponentType.Text
            })
        }
        for (let i = 0; i < indices.length-1; i++) {
            filledIndices.push(indices[i])
            if (indices[i].end != indices[i+1].start) {
                filledIndices.push({
                    start: indices[i].end,
                    end: indices[i+1].start,
                    type: CrumbComponentType.Text
                })
            }
        }
        filledIndices.push(indices[indices.length-1])
        if(indices[indices.length-1].end != wordLength) {
            filledIndices.push({
                start: indices[indices.length-1].end,
                end: wordLength,
                type: CrumbComponentType.Text
            })
        }
        return filledIndices;
    }
}

export interface CrumbContent {
    type: string
    value: string
}

export class CrumbComponentType {
    static Text = "text"
    static Hash = "hash"
    static Mention = "mention"
    static URL = "url"
}


interface Index {
    start: number,
    end: number,
    type: string
}

