import {Neo4jQueryBuilder} from "../src/user/content/socialGraph/NeoGraphPersistence/Neo4jQueryBuilder";
import {CrumbFilter} from "../src/entities/CrumbFilter";




test ('should inject AND between conditions', () => {
    let expected = "WHERE this AND that";
    expect(Neo4jQueryBuilder.WHERE(["this","that"])).toEqual(expected)
})

test ('should ignore empty conditions', () => {
    let expected = "";
    expect(Neo4jQueryBuilder.WHERE(["",""])).toEqual(expected)
})

test ('should construct ORDER BY', ()=>  {
    let expected = "ORDER BY that DESC"
    expect(Neo4jQueryBuilder.ORDER_BY(["", "that"], CrumbFilter.Order.Descending))
})
