
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_wallet", (table) => {
        table.increments("id").primary().unique();
        table.integer('user_id').unsigned().notNullable().references("id").inTable("user_accounts").onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user_wallet");
}