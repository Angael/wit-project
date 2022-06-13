const UID_LEN = 36;

exports.up = async function (knex) {
    return knex.schema

        .createTable('account', table => {
            table.string('uid', UID_LEN).primary();
            table.boolean('isActive').defaultTo(false).nullable();
        })
        .createTable('file', table => {
            table.increments('id');

            table.string('account_uid', UID_LEN).notNullable();
            table.foreign('account_uid').references('account.uid');

            table.string('filename', 256);
        });
};

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('file').dropTableIfExists('account');
};
