# Frazzot Portfolio

Welcome to the source code for the [art portfolio](https://frazzot.com) belonging to [Frazzot](https://instagram.com/frazzotart).

## Quick Start
To get the repo and install the required node packages for development run:
```Bash
git clone https://github.com/vincent-uden/frazzot-portfolio
cd frazzot-portfolio

npm install
npx prisma db push
```
Then to start the server
```Bash
npm run dev
```

In order to get some of the more advanced functionality such as the admin page and email confirmations for the forms some environment variables are required. The aim is to manage these in a typesafe manner in the future.
- `SHA_SECRET`: A 64 character long random secret key for signing JWTs.
- `GMAIL_KEY`: An application password for GMail.

Also, for now there are 4 folders that need to be created in public in order for image uploads to work:
```
./public
  ├─ fonts        (already exists)
  ├─ img          (already exists)
  ├─ gallery      (+)
  ├─ thumbnail    (+)
  ├─ thumbnail_md (+)
  └─ thumbnail_lg (+)
```

## Submitting code
Before submitting code for a pull request make sure to run `npx prettier -w ./src` in order to properly format the source code. The dependencies are set up to not only format the Typescript and CSS but also the order of the Tailwind classes.

## Stack
The project is based on the [T3 Stack](https://github.com/t3-oss/create-t3-app). See that repo for more details but the most important parts (to me) are:
- [TypeScript](https://typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
## Deployment
TODO...
