import * as Actions from "./example.actions";
// import { ActionsUnion, ActionTypesUnion, CreateActionTypesEnum } from "ngrx-strong-effects";
// link to local folder instead of real npm package:
import { ActionsUnion, ActionTypesUnion, CreateActionTypesEnum } from "../src/index";

export type Action = ActionsUnion<typeof Actions>;
// instead of:
// type Action = Actions.RouterNavigation | Actions.Publish | Actions.Published

export type ActionTypes = ActionTypesUnion<typeof Actions>;
// instead of:
// type ActionTypes = "ROUTER_NAVIGATION" | "Publish" | "Published"

export const ActionTypes = CreateActionTypesEnum(Actions);
// instead of:
// enum ActionTypes: {
//     RouterNavigation = "ROUTER_NAVIGATION";
//     Publish = "Publish";
//     Published = "Published"
// }