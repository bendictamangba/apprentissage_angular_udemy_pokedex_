import { CanActivate, CanActivateFn } from "@angular/router";


export const AuthGward: CanActivateFn =() => {
   console.info('le gward a ete appele');
   
        return true;
    }
