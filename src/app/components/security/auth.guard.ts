import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedService } from "../../services/shared.service";

@Injectable()
export class AuthGuard implements CanActivate{
    public shared : SharedService;

    constructor(private router: Router){
            this.shared =SharedService.getInstace();
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | boolean{
            if(this.shared.isLoggerdIn()){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }

        }

}