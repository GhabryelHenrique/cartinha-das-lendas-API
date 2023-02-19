import { App } from "./app"

new App().server.listen(3000, () => {
    console.log("Server is running on port 3000");
});