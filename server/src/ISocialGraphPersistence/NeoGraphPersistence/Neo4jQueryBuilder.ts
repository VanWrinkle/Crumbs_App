import {Order, Sort} from "../../IPostPresentationService/IPostPresentationService";

export class Neo4jQueryBuilder {
    static WHERE(conditions: String[]): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "WHERE " + conditions.join(' AND ')
    }

    static WHERE_CUTOFF(lhs: string, rhs: string, order: Order) {
        let operator = order === Order.Descending? " < ":" > ";
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

    static ORDER_BY(conditions: String[], order: Order): string {
        conditions = conditions.filter((val) => { return val !== "" })
        if (conditions.length === 0) { return "" }
        return "ORDER BY " + conditions.join(', ') + ((order === Order.Descending)? " DESC":" ASC");
    }
}