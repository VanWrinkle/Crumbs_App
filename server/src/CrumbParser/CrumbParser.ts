import {UserPostData} from "../ISocialGraphPersistence/ISocialGraphPersistence";

export interface Index {
    start: number,
    end: number,
    type: string
}

export class CrumbParser {
    static #hashtagRegEx = /(?<!\w)#\w+/g;
    static #mentionRegEx = /(?<!\w)@\w+/g;

    static parseCrumb(crumbText: string): UserPostData {
        let userPost: UserPostData = {
            contents: [],
            flags: []
        }
        let indices: Index[]  = []
        indices = this.#getWordMatchIndices(
            crumbText, this.#hashtagRegEx, indices, "hashtag");
        indices = this.#getWordMatchIndices(
            crumbText, this.#mentionRegEx, indices, "mention");
        indices.sort( (a, b) => { return a.start - b.start })
        if (indices.length != 0) {
            indices = this.#fillInTextIndiceslet(indices, crumbText.length)
            indices.forEach( (index) => {
                userPost.flags.push(index.type);
                userPost.contents.push(
                    crumbText.substring(index.start, index.end)
                );
            })
        } else if (crumbText.length != 0 ) {
            userPost.flags.push("text");
            userPost.contents.push(crumbText)
        }
        return userPost;
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

    static #fillInTextIndiceslet(indices: Index[], wordLength: number) {
        if (indices != undefined) {}
        let filledIndices: Index[] = []
        if(indices[0].start != 0) {
            filledIndices.push({
                start: 0,
                end: indices[0].start,
                type: "text"
            })
        }
        for (let i = 0; i < indices.length-1; i++) {
            filledIndices.push(indices[i])
            if (indices[i].end != indices[i+1].start) {
                filledIndices.push({
                    start: indices[i].end,
                    end: indices[i+1].start,
                    type: "text"
                })
            }
        }
        filledIndices.push(indices[indices.length-1])
        if(indices[indices.length-1].end != wordLength) {
            filledIndices.push({
                start: indices[indices.length-1].end,
                end: wordLength,
                type: "text"
            })
        }
        return filledIndices;
    }
}
