import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    database: "to_do_app",
    user: "root",
    password: "",
    namedPlaceholders: true,
})