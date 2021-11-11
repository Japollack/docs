---
slug: templates-nextjs
title: NextJS JAMStack Template
---

## NextJS

NextJS is a framework built on top of React that aims to solve a lot of the pain points related to rapidly developing a React application.
NextJS takes care of setting up common patterns for development, and built-in features like routing, pre-rendering, CSS/Sass support, hot reload, any many more,
making it a very attractive way to build React applications.

## NextJS and JAMStack

NextJS enables the building of a static site generation through the use of the [`next export`](https://nextjs.org/docs/advanced-features/static-html-export) command.
This allows us to host the generated static site anywhere we like and have a clean separation between the generated static site and a well-defined webservice API provided by ServiceStack.
The JAMStack pattern promotes this separation of JavaScript, API and Markup (JAM) as the architecture of websites and applications that deliver great performance but also flexibility.
It is common to have content heavy sites, using statically generated *Markup*, that utilize modern frontend libraries and *JavaScript* combined with data from an *API* to make content compelling and interactive.

## NextJS and Edge Functions

NextJS creators, Vercel, also offer a way to host *Edge Functions* using JavaScript can integrate with their other hosting services.
This provides a convenient and fast way to provide custom server functionality without worrying about the hosting.

However, as convenient as they are, these don't produce a well-defined HTTP API for easy reuse outside your web application.
This is where ServiceStack can offer a developer experience that will not only enable fast integration for your NextJS application, but for multiple client applications you might need in the future.

## Project Structure

Following this JAMStack pattern, the `nextjs-jam` template has a separate folder for the `ui` NextJS application, and the `api`, the ServiceStack API.

- `.deploy` - Files used for built-in GitHub Actions deployment.
- `.github` - GitHub Actions workflows for deployment to GitHub Pages and a Linux server with `docker compose`.
- `ui` - NextJS application used to generate your static site.
- `api` - ServiceStack application hosting your well-defined web service APIs.
- `Dockerfile` - Dockerfile for your ServiceStack application.

## UI project

## API project

## Development vs Production

During local development, the template utilizes `next.config.js` to handle rewrites from the localhost:3000 domain to our locally running ServiceStack API.

![](./images/jamstack/nextjs-local-dev.svg)

This allows us to use the ServiceStack API and the ServiceStack client to take advantage of typed end to end development, just like building any other client for a ServiceStack service.
However, we can also leverage the [`stale-while-revalidate`](https://swr.vercel.app/) library built into the NextJS framework to apply conditional fetching and local cache.

```typescript
import { client } from '../lib/gateway'
import { Hello } from '../lib/dtos'
import useSWR from 'swr';

const HelloApi = ({ name }:any) => {
  const { data, error } = useSWR(`Hello:${name}`, key => client.get(new Hello({ name })))
  if (error) return <div className="ml-2 text-red-500">{error.message}</div>
  return <div className="ml-3 text-2xl">{data ? data.result : 'loading...'}</div>
}
```

Once deployed, the hosted statically generated site will call the API at the `PROD_API` configured address. 
If you are hosting across multiple domains, you will need to configure your ServiceStack application to support CORS for the domain where you host the output from the `ui` project.

```csharp
Plugins.Add(new CorsFeature(allowOriginWhitelist:new[]{ 
    "https://localhost:5001",
    "http://localhost:5000",
    "http://localhost:3000",
    "https://nextjs-gh.web-templates.io"
}, allowCredentials:true));
```

By default, the GitHub Actions provided with the template will deploy to GitHub Pages. GitHub Pages can be configured using a `CNAME` file to use a custom domain.
The above use of the `CorsFeature` plugin in `Configure.AppHost.cs` shows we are adding the `nextjs-gh.web-templates.io` domain to the `allowOriginWhitelist` so the server will accept requests from our GitHub Pages domain of `https://nextjs-gh.web-templates.io`.

![](./images/jamstack/nextjs-hosted.svg)


## Deployment process

JAMStack deployments are extremely flexible since the UI and API are logically separated.
They can be hosted together with the API also serving the statically generated site files, or using separate hosts with a variety of different setups.

This template utilizes [GitHub Actions](https://github.com/features/actions) to build and deploy the UI and API projects.
The UI project is hosted directly on [GitHub Pages](https://pages.github.com/) while the API is bundled into a Docker image and can be hosted on any [Linux server with SSH access and Docker Compose](/do-github-action-mix-deployment).

To support both, the `npm publish` command copies the statically generated site to the `wwwroot` folder within the API before it is bundled into a docker image.
Additionally, the `release.yml` GitHub Actions workflow pushes the UI to the `gh-pages` branch of your repository to enable GitHub Pages.

## Ways to deploy

The template will trigger a deployment on every push or Release to the GitHub repository. It can also be deployed manually providing the *version* you want to redeploy.

This adhoc method can work with the default `latest` as well as any previous Release tags you have created.
This provides a basic rollback mechanism. If you have been uses `Releases`to tag your application, you can specify a tag, eg `v2` and the GitHub Action will do the following.

- Checkout your code at the specified tag
- Rebuild and deploy your `ui`
- Use the specified tag to change which version is running via `docker compose` on the remote server

> The provided GitHub Actions are just a starting point for how to deploy your application. When your hosting requirements change you'll need to update your GitHub Actions to suit.

## Hosting