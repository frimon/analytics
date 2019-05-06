'use strict'

exports.up = async knex => {

  await knex.schema.raw(
    'CREATE VIEW session_lengths AS SELECT * FROM ('
    + '  SELECT created_at, '
    + '  EXTRACT('
    + '    EPOCH FROM ('
    + '    (SELECT left_at FROM page_views WHERE session_id = sessions.id ORDER BY left_at DESC LIMIT 1) - '
    + '    (SELECT visited_at FROM page_views WHERE session_id = sessions.id ORDER BY visited_at ASC LIMIT 1)'
    + '   )'
    + '  ) AS length'
    + '  FROM sessions'
    + ') AS sl '
    + 'WHERE length IS NOT NULL',
  )
}

exports.down = async knex => {

  await knex.schema.raw('DROP VIEW IF EXISTS session_lengths')
}
