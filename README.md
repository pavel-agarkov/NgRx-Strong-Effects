# Strongly typed NgRx Effects

This package provides type assertions and methods to implement strongly typed NgRx effects. Implementation depends on [Conditional types](https://github.com/Microsoft/TypeScript/pull/21316) and can't be used without it.

After importing all actions like this
```ts
import * as Actions from "./example.actions";
```

## You can use

### ActionsUnion
```ts
export type Action = ActionsUnion<typeof Actions>;
```
instead of
```ts
export type Action = Actions.RouterNavigation | Actions.Publish | Actions.Published | ...
```
### ActionTypesUnion
```ts
export type ActionTypes = ActionTypesUnion<typeof Actions>;
```
instead of
```ts
export type ActionTypes = "ROUTER_NAVIGATION" | "PUBLISH" | "PUBLISHED" ...
```
### CreateActionTypesEnum
```ts
export const ActionTypes = CreateActionTypesEnum(Actions);
```
instead of
```ts
export enum ActionTypes: {
    RouterNavigation = "ROUTER_NAVIGATION";
    Publish = "PUBLISH";
    Published = "PUBLISHED";
    ...
}
```

## With all of it in place now you can write strongly typed effects like this:

```ts
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";
import { ActionTypes, Action } from "./example.action-sets";

@Injectable()
export class ExampleEffects
{
    constructor(protected readonly actions$: Actions<Action>) { }

    @Effect() publishCommand$ = this.actions$.ofType(ActionTypes.Publish)
        .switchMap(act =>
        {
            console.log(act.payload.name);
            return of();
        });

    @Effect() publishedEvent$ = this.actions$.ofType(ActionTypes.Published)
        .pipe(switchMap(act =>
        {
            console.log(act.payload.timestamp);
            return of();
        }));
}
```

If you don't want to wait for Conditional types to arrive - you can use a simplified [version that works even w/o them](https://github.com/pavel-agarkov/NgRx-Strong-Effects/tree/w/o-conditional-types)