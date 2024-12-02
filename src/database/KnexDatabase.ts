

import knex from "knex";
import config from "./KnexDBConfig";

const KnexDatabase = knex(config);

export default KnexDatabase;