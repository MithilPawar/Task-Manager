# Client (React + Vite)

Frontend for the Task Manager MERN project.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Environment

Create `client/.env` from `client/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Notes

- The app expects backend cookies for authentication (`withCredentials: true`).
- Backend should run on `http://localhost:8000` by default.
- See the root README for complete full-stack setup.
