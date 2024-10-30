# Portfolio Blog Starter

This is a porfolio site template complete with a blog. Includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

### Clone 

```bash
git clone https://github.com/mylonasg88/blog-custom-auth-nextjs .
```

Run local PostgresSQL
```
$ docker run --name custom-auth-nextjs-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

Your PG credentials should look like this:

- Username: `postgres` (the default)
- Password: `mysecretpassword` (as specified in your - Docker command)
- Host: `localhost` (if connecting from your local machine to Docker)
- Port: `5432` (the default PostgreSQL port)
- Database: `postgres` (the default database name)
 
 In your .env file paste this to connect to docker Postgres Database:
 POSTGRES_URL=`postgres://postgres:mysecretpassword@localhost:5432/postgres`


Then, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/templates) ([Documentation](https://nextjs.org/docs/app/building-your-application/deploying)).
