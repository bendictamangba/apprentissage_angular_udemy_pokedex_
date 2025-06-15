import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'

})

export class AuthService {
    readonly #isLoggedIn = signal (false);

    readonly isLoggedIn = this.#isLoggedIn.asReadonly();



}