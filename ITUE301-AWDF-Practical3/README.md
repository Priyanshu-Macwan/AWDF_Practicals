# ITUE301 AWDF Practical 3

A React and Vite project by Priyanshu Macwan (24CS049) that fetches public repositories from the GitHub REST API and renders them dynamically.

## Practical goals

- Consume a public REST API with `fetch`.
- Use `useEffect` and `async`/`await` for asynchronous data retrieval.
- Show loading, error, empty, and success states.
- Render repository cards from the API response.
- Filter the rendered data and retry a failed request.

## Run locally

```bash
npm install
npm run dev
```

The page loads public repositories for `Priyanshu-Macwan` from `https://api.github.com/users/Priyanshu-Macwan/repos`.
