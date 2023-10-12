



enum Order {
    Ascending,
    Descending
}

enum Sort {
    Time,
    Engagement
}

/**
 * Represents a filter configuration for retrieving crumbs (posts) in the application.
 */
export class CrumbFilter {

    private _parent_post: string | undefined;
    private _authors: string[] | undefined;
    private _hashtags: string[] | undefined;
    private _order = Order.Descending;
    private _sort = Sort.Time;
    private _max = 15;

    /**
     * Get the ID of the parent post to filter crumbs by replies.
     * If undefined, no filtering by parent post is applied.
     */
    get parent_post(): string | undefined {
        return this._parent_post;
    }

    /**
     * Set the ID of the parent post to filter crumbs by replies.
     */
    set parent_post(value: string | undefined) {
        this._parent_post = value;
    }

    /**
     * Get an array of author usernames to filter crumbs by specific authors.
     * If undefined, no filtering by authors is applied.
     */
    get authors(): string[] | undefined {
        return this._authors;
    }

    /**
     * Set an array of author usernames to filter crumbs by specific authors.
     */
    set authors(value: string[] | undefined) {
        this._authors = value;
    }

    /**
     * Get an array of hashtags to filter crumbs by specific hashtags.
     * If undefined, no filtering by hashtags is applied.
     */
    get hashtags(): string[] | undefined {
        return this._hashtags;
    }

    /**
     * Set an array of hashtags to filter crumbs by specific hashtags.
     */
    set hashtags(value: string[] | undefined) {
        this._hashtags = value;
    }

    /**
     * Get the order in which crumbs should be sorted (e.g., by time, engagement, etc.).
     * Default: Order.Descending
     */
    get order(): Order {
        return this._order;
    }

    /**
     * Set the order in which crumbs should be sorted.
     */
    set order(value: Order) {
        this._order = value;
    }

    /**
     * Get the method used for sorting crumbs (e.g., by time, engagement, etc.).
     * Default: Sort.Time
     */
    get sort(): Sort {
        return this._sort;
    }

    /**
     * Set the method used for sorting crumbs.
     */
    set sort(value: Sort) {
        this._sort = value;
    }

    /**
     * Get the maximum number of crumbs to retrieve. Limits the result set.
     * Default: 15
     */
    get max(): number {
        return this._max;
    }

    /**
     * Set the maximum number of crumbs to retrieve.
     * Set value is clamped between 0 and 200
     */
    set max(value: number) {
        this._max = value;
        this._max = Math.min(this._max, 200);
        this._max = Math.max(this._max, 0);
    }
}

export namespace CrumbFilter {
    export enum Order {
        Ascending,
        Descending
    }

    export enum Sort {
        Time,
        Engagement
    }
}