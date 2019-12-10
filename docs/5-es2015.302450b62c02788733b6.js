(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{TzaR:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class t{}var r=u("pMnS"),o=u("iInd"),s=u("SVse"),a=u("eIep");class c{constructor(l,n,u,e){this.userService=l,this.accountService=n,this.route=u,this.router=e}ngOnInit(){this.route.params.pipe(Object(a.a)(l=>this.accountService.getAccount(l.summonerName))).subscribe(l=>{this.account=l,this.setupProfileIcon(l.profileIconId),this.setupUser(l.id)})}setupUser(l){this.userService.getUser(l).subscribe(l=>{this.user=l[0],this.setupRankedEmblem(this.user.tier)})}setupRankedEmblem(l){this.rankedEmblemSource=`/assets/ranked-emblems/Emblem_${l}.png`}setupProfileIcon(l){this.profileIconSource=`/assets/profileicon/${l}.png`}onSubmit(l){console.log("###SUBMITTED: "+l),this.router.navigate([`/league/${l}`])}}var i=u("LRne"),b=u("IheW"),m=u("vkgz"),p=u("JIr8");let h=(()=>{class l{constructor(l){this.http=l,this.userUrl="https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway"}getUser(l){const n=this.userUrl,u={headers:new b.g({"Content-Type":"application/json"}),params:(new b.h).set("endpoint",`/lol/league/v4/entries/by-summoner/${l}`).set("token","RGAPI-9b4c2b3c-2ff7-46cb-b414-e09e6c38cdf2")};return this.http.get(n,u).pipe(Object(m.a)(n=>console.log(`fetched User id=${l}`)),Object(p.a)(this.handleError(`getUser id=${l}`)))}handleError(l="operation",n){return u=>(console.error(u),console.log(`UserService: ${l} failed: ${u.message}`),Object(i.a)(n))}}return l.ngInjectableDef=e.Eb({factory:function(){return new l(e.Fb(b.c))},token:l,providedIn:"root"}),l})(),g=(()=>{class l{constructor(l){this.http=l,this.apiUrl="https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway"}getAccount(l){const n=this.apiUrl,u={headers:new b.g({"Content-Type":"application/json"}),params:(new b.h).set("endpoint",`/lol/summoner/v4/summoners/by-name/${l}`).set("token","RGAPI-9b4c2b3c-2ff7-46cb-b414-e09e6c38cdf2")};return this.http.get(n,u).pipe(Object(m.a)(n=>console.log(`fetched Account summonerName=${l}`)),Object(p.a)(this.handleError(`getAccount summonerName=${l}`)))}handleError(l="operation",n){return u=>(console.error(u),console.log(`AccountService: ${l} failed: ${u.message}`),Object(i.a)(n))}}return l.ngInjectableDef=e.Eb({factory:function(){return new l(e.Fb(b.c))},token:l,providedIn:"root"}),l})();var d=e.lb({encapsulation:0,styles:[[""]],data:{}});function f(l){return e.Ab(0,[(l()(),e.nb(0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["user-overview works!"])),(l()(),e.nb(2,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["Common picks:"])),(l()(),e.nb(4,0,null,null,2,"a",[["routerLink","/league/KingOfTryndamere"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.xb(l,5).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t}),null,null)),e.mb(5,671744,null,0,o.m,[o.k,o.a,s.g],{routerLink:[0,"routerLink"]},null),(l()(),e.zb(-1,null,["go to KingOfTryndamere~~~!"])),(l()(),e.nb(7,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.nb(8,0,null,null,2,"a",[["routerLink","/league/tugatom"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.xb(l,9).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t}),null,null)),e.mb(9,671744,null,0,o.m,[o.k,o.a,s.g],{routerLink:[0,"routerLink"]},null),(l()(),e.zb(-1,null,["go to tugatom~~~!"])),(l()(),e.nb(11,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),e.nb(12,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["Summoner Form"])),(l()(),e.nb(14,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e.nb(15,0,null,null,1,"label",[["for","nameInput"]],null,null,null,null,null)),(l()(),e.zb(-1,null,["Summoner Name"])),(l()(),e.nb(17,0,[["nameInput",1]],null,0,"input",[["id","nameInput"],["required",""],["type","text"]],null,null,null,null,null)),(l()(),e.nb(18,0,null,null,1,"button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onSubmit(e.xb(l,17).value)&&t),t}),null,null)),(l()(),e.zb(-1,null,["Submit"])),(l()(),e.nb(20,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["Rank"])),(l()(),e.nb(22,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["User Data"])),(l()(),e.nb(24,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(25,null,["leagueId: ","\n"])),(l()(),e.nb(26,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(27,null,["queueType: ","\n"])),(l()(),e.nb(28,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(29,null,["tier: ","\n"])),(l()(),e.nb(30,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(31,null,["rank: ","\n"])),(l()(),e.nb(32,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(33,null,["summonerId: ","\n"])),(l()(),e.nb(34,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(35,null,["summonerName: ","\n"])),(l()(),e.nb(36,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(37,null,["leaguePoints: ","\n"])),(l()(),e.nb(38,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(39,null,["wins: ","\n"])),(l()(),e.nb(40,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(41,null,["losses: ","\n"])),(l()(),e.nb(42,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(43,null,["veteran: ","\n"])),(l()(),e.nb(44,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(45,null,["inactive: ","\n"])),(l()(),e.nb(46,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(47,null,["freshBlood: ","\n"])),(l()(),e.nb(48,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(49,null,["hotStreak: "," "])),(l()(),e.nb(50,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["Account Data"])),(l()(),e.nb(52,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(53,null,["profileIconId: ","\n"])),(l()(),e.nb(54,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(55,null,["name: ","\n"])),(l()(),e.nb(56,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(57,null,["puuid: ","\n"])),(l()(),e.nb(58,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(59,null,["summonerLevel: ","\n"])),(l()(),e.nb(60,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(61,null,["accountId: ","\n"])),(l()(),e.nb(62,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(63,null,["id: ","\n"])),(l()(),e.nb(64,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(65,null,["revisionDate: "," "])),(l()(),e.nb(66,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.nb(67,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),e.nb(68,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],(function(l,n){l(n,5,0,"/league/KingOfTryndamere"),l(n,9,0,"/league/tugatom")}),(function(l,n){var u=n.component;l(n,4,0,e.xb(n,5).target,e.xb(n,5).href),l(n,8,0,e.xb(n,9).target,e.xb(n,9).href),l(n,25,0,u.user.leagueId),l(n,27,0,u.user.queueType),l(n,29,0,u.user.tier),l(n,31,0,u.user.rank),l(n,33,0,u.user.summonerId),l(n,35,0,u.user.summonerName),l(n,37,0,u.user.leaguePoints),l(n,39,0,u.user.wins),l(n,41,0,u.user.losses),l(n,43,0,u.user.veteran),l(n,45,0,u.user.inactive),l(n,47,0,u.user.freshBlood),l(n,49,0,u.user.hotStreak),l(n,53,0,u.account.profileIconId),l(n,55,0,u.account.name),l(n,57,0,u.account.puuid),l(n,59,0,u.account.summonerLevel),l(n,61,0,u.account.accountId),l(n,63,0,u.account.id),l(n,65,0,u.account.revisionDate),l(n,67,0,u.profileIconSource),l(n,68,0,u.rankedEmblemSource)}))}function v(l){return e.Ab(0,[(l()(),e.nb(0,0,null,null,1,"app-user-overview",[],null,null,null,f,d)),e.mb(1,114688,null,0,c,[h,g,o.a,o.k],null,null)],(function(l,n){l(n,1,0)}),null)}var k=e.jb("app-user-overview",c,v,{},{},[]);class w{constructor(l){this.router=l,this.submitted=!1}onSubmit(l){console.log("###SUBMITTED: "+l),this.submitted=!0,this.router.navigate([`/league/${l}`])}ngOnInit(){}}var z=e.lb({encapsulation:0,styles:[[""]],data:{}});function I(l){return e.Ab(0,[(l()(),e.nb(0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.zb(-1,null,["league works!"])),(l()(),e.nb(2,0,null,null,2,"a",[["routerLink","tugatom"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.xb(l,3).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t}),null,null)),e.mb(3,671744,null,0,o.m,[o.k,o.a,s.g],{routerLink:[0,"routerLink"]},null),(l()(),e.zb(-1,null,["go to tugatom~~~!"])),(l()(),e.nb(5,0,null,null,1,"app-user-overview",[],null,null,null,f,d)),e.mb(6,114688,null,0,c,[h,g,o.a,o.k],null,null)],(function(l,n){l(n,3,0,"tugatom"),l(n,6,0)}),(function(l,n){l(n,2,0,e.xb(n,3).target,e.xb(n,3).href)}))}function y(l){return e.Ab(0,[(l()(),e.nb(0,0,null,null,1,"app-league",[],null,null,null,I,z)),e.mb(1,114688,null,0,w,[o.k],null,null)],(function(l,n){l(n,1,0)}),null)}var S=e.jb("app-league",w,y,{},{},[]);u("cUpR"),u("HDdC"),u("DH7j"),u("EY2u"),u("ZUHj"),u("l7GE"),u("lJxs"),u("Cfvw");class j{constructor(){this._accessors=[]}add(l,n){this._accessors.push([l,n])}remove(l){for(let n=this._accessors.length-1;n>=0;--n)if(this._accessors[n][1]===l)return void this._accessors.splice(n,1)}select(l){this._accessors.forEach(n=>{this._isSameGroup(n,l)&&n[1]!==l&&n[1].fireUncheck(l.value)})}_isSameGroup(l,n){return!!l[0].control&&l[0]._parent===n._control._parent&&l[1].name===n.name}}const U=new e.o("NgFormSelectorWarning");class E{}class x{static withConfig(l){return{ngModule:x,providers:[{provide:U,useValue:l.warnOnDeprecatedNgFormSelector}]}}}class A{}u.d(n,"LeagueModuleNgFactory",(function(){return $}));var $=e.kb(t,[],(function(l){return e.vb([e.wb(512,e.j,e.W,[[8,[r.a,S,k]],[3,e.j],e.v]),e.wb(4608,s.i,s.h,[e.s,[2,s.o]]),e.wb(4608,j,j,[]),e.wb(1073742336,s.b,s.b,[]),e.wb(1073742336,o.n,o.n,[[2,o.s],[2,o.k]]),e.wb(1073742336,A,A,[]),e.wb(1073742336,E,E,[]),e.wb(1073742336,x,x,[]),e.wb(1073742336,t,t,[]),e.wb(1024,o.i,(function(){return[[{path:"",component:w},{path:":summonerName",component:c}]]}),[])])}))}}]);