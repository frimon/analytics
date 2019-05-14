'use strict'

exports.up = async knex => {

  await knex.schema.raw(
    'CREATE VIEW bounced_sessions AS '
    + 'SELECT * FROM sessions WHERE id IN( '
    + '  SELECT session_id '
    + '  FROM page_views '
    + '  GROUP BY session_id HAVING COUNT(session_id) = 1 '
    + ')',
  )
}

exports.down = async knex => {

  await knex.schema.raw('DROP VIEW IF EXISTS bounced_sessions')
}
