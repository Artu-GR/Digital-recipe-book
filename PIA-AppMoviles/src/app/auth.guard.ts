import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "./auth.service";
import { map } from "rxjs";

const routerInjection = () => inject(Router);

const authStateObs$ = () => inject(AuthService).authState$;


export const authGuard: CanActivateFn = () => {
    const router = routerInjection();

    return authStateObs$().pipe(
        map((user) => {
            if (!user) {
                router.navigateByUrl('/');
                return false;
            }
            return true;
        })
    );
}

export const publicGuard: CanActivateFn = () => {
    const router = routerInjection();

    return authStateObs$().pipe(
        map((user) => {
            if (user){
                router.navigateByUrl('/tabs');
                return false;
            }
            return true
        })
    )
}
