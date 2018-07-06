import { HttpInterceptor,HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SharedService } from "../services/shared.service";
import { SP_API } from "../services/sp.api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    public shared:SharedService;
   
    constructor(public storage:SharedService){
        this.shared = SharedService.getInstace();
    }
   
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        
        let localUser= this.storage.getLocalUser();
        
        let N = SP_API.baseUrl.length;
        let requestToAPI = req.url.substring(0,N) == SP_API.baseUrl;

      
        if (localUser && requestToAPI){
            const authReq =req.clone({headers: req.headers.set('Authorization','Bearer '+localUser.token)});
            return next.handle(authReq);
        }
        else{
            return next.handle(req);
        }

        
        
    }
}
export const AuthInterceptorProvider ={
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
}