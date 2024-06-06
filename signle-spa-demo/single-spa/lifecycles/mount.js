import {MOUNTED, MOUNTING, NOT_MOUNTED} from "../application/app.helpers.js";

export function toMountPromise(app) {
    return Promise.resolve().then(() => {
        if (app.status !== NOT_MOUNTED) {
            return app
        }
        // debugger
        // app.status = MOUNTING
        return app.mount(app.customProps).then(() => {
            app.status = MOUNTED
            return app
        })
    })
}
