import { Observable } from "rxjs/Observable";
import { } from "@ngrx/effects";

declare module "@ngrx/effects" {
    export class Actions<V extends { type: string }> extends Observable<V>
    {
        ofType<T extends V["type"]>(...allowedTypes: T[]): Actions<ActionsOfType<V, T>>;
    }
};

declare type ActionsModule = { [className: string]: { prototype: { type: string } } };
declare type ActionWithType<Type extends string> = { type: Type };
export declare type ActionTypesUnion<TModule extends ActionsModule> = TModule[keyof TModule]["prototype"]["type"];
export declare type ActionsUnion<TModule extends ActionsModule> = TModule[keyof TModule]["prototype"];
export declare type ActionsOfType<A, T extends string> = A extends ActionWithType<T>?A: never;

/**
 * Generates enum with all action class names as properties and action types as velues
 * @param fromActionsModule - reference to a module with actions like Actions from `import * as Actions from "./some.actions"`
 */
export function CreateActionTypesEnum<TModule extends ActionsModule>(fromActionsModule: TModule)
    : Readonly<{[className in keyof TModule]: TModule[className]["prototype"]["type"]}>
{
    const actionsEnum: any = {};
    for (let actionClassName in fromActionsModule)
    {
        actionsEnum[actionClassName] =
            new ((fromActionsModule[actionClassName].prototype as any).constructor)().type
    }
    return actionsEnum;
}