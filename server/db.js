import postgres from 'postgres'

export const sql = postgres({
    host: '192.168.147.50',
    port: 5432,
    db: 'sofia',
    username: 'sofiaJK',
    password: 'knopasona2005'
})