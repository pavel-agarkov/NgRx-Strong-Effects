import { RouterNavigationAction, RouterNavigationPayload } from "@ngrx/router-store";
import { RouterStateSnapshot } from "@angular/router";

/**
 * Just to have it in one list with other actions
 * This class is used only for reflection
*/
export abstract class RouterNavigation implements RouterNavigationAction
{
    readonly type = "ROUTER_NAVIGATION";
    readonly payload: RouterNavigationPayload<RouterStateSnapshot> = null as any;
    constructor() { }
};

export class Publish
{
    readonly type = "PUBLISH";
    constructor(
        readonly payload: Readonly<{ id: number, name: string }>
    ) { }
}

export class Published
{
    readonly type = "PUBLISHED";
    constructor(
        readonly payload: Readonly<{ id: number, name: string, timestamp: Date }>
    ) { }
}
