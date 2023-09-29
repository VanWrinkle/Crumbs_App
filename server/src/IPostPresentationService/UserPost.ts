

enum ComponentType {
    Text,
    Hash,
    Mention,
    ImageID
}


export interface PostComponent {
    key: ComponentType
    value: string
}


export interface UserPost {
    user: string
    id: string
    contents: PostComponent[]
}

