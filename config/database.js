module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'dpg-ceur5a9a6gdjl6q6mskg-a.singapore-postgres.render.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'marketing_ta53'),
      user: env('DATABASE_USERNAME', 'marketing_ta53_user'),
      password: env('DATABASE_PASSWORD', '137bku2kNXEW64cHDiVjAckkgPDKkDqP'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
