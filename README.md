# Vite template
This project contains a skeleton for a React/TypeScript web-app that includes:
### Front end:
- Redux/Redux toolkit
- React query
- Example setup files for React context
- Framer motion
- Tailwind/Styled Components + Daisy UI
### Back end:
- Socket.io
- express/http


## Get started:
1. Fork the repo and clone to your personal device
2. Navigate into the vite_template repo in your editor 
3. To start the socket.io and express server, run the following commands:
  - `cd server`
  - `npm install`
  - `npm run start` 
5. To initialize the front end, run the following commands:
  - `cd ..` (if you are coming from the server directory)
  - `cd vite-project`
  - `npm install`
  - `npm run dev`

## Navigating the project:
### Front end:
Important files/folders to note are:
- `query`: contains React query example client, fetchers
- `store`: contains Redux store setup and slice example
- `types`: contains example interface export
- `src`:
  - `context`: contains context setup files for socket client and example data
 
### Back end:
