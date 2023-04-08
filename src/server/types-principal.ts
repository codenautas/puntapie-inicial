import * as backendPlus from "backend-plus";

// exposes APIs from this package
export * from "backend-plus";
export * from "pg-promise-strict";

export interface User extends backendPlus.User{
    usuario:string
    rol:string
}

export type Constructor<T> = new(...args: any[]) => T;