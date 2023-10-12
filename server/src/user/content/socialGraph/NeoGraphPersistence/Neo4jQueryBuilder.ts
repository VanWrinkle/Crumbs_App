import {CrumbFilter} from "../../../../entities/CrumbFilter";


export class Neo4jQueryBuilder {
    static WHERE(conditions: String[]): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "WHERE " + conditions.join(' AND ')
    }

    static WHERE_CUTOFF(lhs: string, rhs: string, order: CrumbFilter.Order) {
        let operator = order === CrumbFilter.Order.Descending? " < ":" > ";
        return "WHERE " + lhs + operator + rhs

    }

    static WITH(conditions: String[]): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "WITH " + conditions.join(', ')
    }

    static RETURN(conditions: String[]): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "RETURN " + conditions.join(', ')
    }

    static ORDER_BY(conditions: String[], order: CrumbFilter.Order): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "ORDER BY " + conditions.join(', ') + ((order === CrumbFilter.Order.Descending)? " DESC":" ASC");
    }
}