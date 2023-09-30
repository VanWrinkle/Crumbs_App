import {UserPostView} from "./ISocialGraphPersistence";


interface ICrumbParserService {
    parseJsonToCrumb(jsonBody: string): UserPostView
}