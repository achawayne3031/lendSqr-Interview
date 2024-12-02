import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_accounts", (table) => {
        table.increments("id").primary().unique();
        table.string("full_name").notNullable();
        table.string("email").notNullable();
        table.boolean("phone").notNullable().defaultTo(false);
        table.boolean("status").notNullable().defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user_accounts");
}