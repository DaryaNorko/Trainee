import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Member } from "../_models/member";
import { MembersService } from "../_services/members.service";

// такое можно использовать, если нам нужно получить member до того, как начнёт собираться страница в HTML
// и в app-routing.module добавить

@Injectable({
    providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {

    constructor(private memberService: MembersService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember(route.paramMap.get('username'));
    }
}