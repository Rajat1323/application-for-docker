import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Service/Auth/auth-service.service';


export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthServiceService);
    const router = inject(Router);
    if(!auth.isLoggedIn()){
      router.navigate(['auth/login']);
    }
    return auth.isLoggedIn();
    
};
