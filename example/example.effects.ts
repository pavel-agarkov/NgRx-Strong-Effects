import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";

import { ActionTypes, Action } from "./example.action-sets";
import * as ActionsModule from "./example.actions";


@Injectable()
export class ExampleEffects
{
    constructor(protected readonly actions$: Actions<Action, typeof ActionsModule>) { }

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