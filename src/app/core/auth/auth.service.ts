import { Injectable, signal } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'

})

export class AuthService {
    readonly #isLoggedIn = signal (false);
    readonly isLoggedIn = this.#isLoggedIn.asReadonly();

    login (name: string, password: string): Observable<boolean> {
      const isLoggedIn = name == 'lulu' && password == 'lulu#';
      this.#isLoggedIn.set(isLoggedIn);
      return of(isLoggedIn).pipe(delay(1000));
    }
    

  }
  
  

