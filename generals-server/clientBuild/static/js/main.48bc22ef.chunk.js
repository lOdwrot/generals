(this["webpackJsonpgenerals-front"]=this["webpackJsonpgenerals-front"]||[]).push([[0],{182:function(e,t,a){e.exports={"speed-slider":"BattleHistory_speed-slider__1IaQG"}},188:function(e,t,a){e.exports=a(382)},193:function(e,t,a){},223:function(e,t){},27:function(e,t,a){e.exports={"ability-panel":"Abilities_ability-panel__3qPLH","ability-block-container":"Abilities_ability-block-container__3GhIM","ability-block":"Abilities_ability-block__1IWen","filler-block":"Abilities_filler-block__3xwKI","filler-block__disabled":"Abilities_filler-block__disabled__1QYAQ","ability-description-box":"Abilities_ability-description-box__2pgdv","selected-block":"Abilities_selected-block__cdLMW",clickable:"Abilities_clickable__y9Paf","popover-stats":"Abilities_popover-stats__3nSM0"}},357:function(e,t,a){},37:function(e,t,a){e.exports={"lobby-wrapper":"Lobby_lobby-wrapper__lDjyO","lobby-content-box":"Lobby_lobby-content-box__QuG4U",header:"Lobby_header__2r9_D",subtytle:"Lobby_subtytle__2WrLL",logo:"Lobby_logo__tbCPE","logo-left":"Lobby_logo-left__1BVEf","logo-right":"Lobby_logo-right__3mpPN"}},381:function(e,t,a){},382:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(10),i=a.n(r),c=(a(193),a(194),a(11)),l=a(385),s=a(387),u=a(124),d=a(16),m=a(6),p=a(163),b=a.n(p),y={address:"/"},f=a(48),g="game.setBoard",v=function(e){return{type:"game.setActiveField",payload:e}},h=function(e){return{type:"game.setCommands",payload:e}},E=function(e){return{type:"game.removeCommands",payload:e}},w=function(e){return{type:"game.setPlayerRole",payload:e}},O=function(e){return{type:"game.abilitySelection",payload:e}},_={userName:"King",socketId:"",roomId:""},C=a(44),j=[],k={reborn:0,unite:0,moveCapitol:0,defender:0,plowingField:0,scan:0,autumn:0,archery:0},x={players:[],playerIdToTeamId:{},board:[[]],activeField:{x:-1,y:-1},commands:[],userColors:{},usersStats:{},tourCounter:0,playerRole:"lobby",moveType:"all",abilitySelection:null,cooldowns:k,abilityVisibleFields:{},passiveAbilities:[]},A={privateSettings:{},gameSettings:{mapWidth:20,mapHeight:20,gameMode:"Conquest",nonAggression:50,castlesDensity:.5,mountainDensity:.5,archeryTowersDensity:.3,observerTowersDensity:.3,abandonedFortressesDensity:.3,castleProduction:1,fieldProduction:25,turnDuration:1e3}},S={history:[],userColors:{}},I={user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"user.setName":return Object(m.a)({},e,{userName:t.payload});case"user.setUser":return Object(m.a)({},e,{},t.payload);case"game.setPlayers":return Object(m.a)({},e,{},t.payload.find((function(t){return t.socketId===e.socketId})));default:return e}},messages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"messages.addMessage":return[].concat(Object(C.a)(e),[t.payload]);default:return e}},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"game.setPlayers":return Object(m.a)({},e,{players:t.payload,playerIdToTeamId:t.payload.reduce((function(e,t){return Object(m.a)({},e,Object(d.a)({},t.socketId,t.teamId))}),{}),userColors:t.payload.reduce((function(e,t){return Object(m.a)({},e,Object(d.a)({},t.socketId,t.color))}),{})});case g:return Object(m.a)({},e,{board:t.payload});case"game.setActiveField":return Object(m.a)({},e,{activeField:t.payload,moveType:"all"});case"game.setCommands":return Object(m.a)({},e,{commands:t.payload});case"game.removeCommands":return Object(m.a)({},e,{commands:e.commands.filter((function(e){return!t.payload.includes(e.id)}))});case"game.setPlayerRole":return Object(m.a)({},e,{playerRole:t.payload,cooldowns:k,abilityVisibleFields:{},passiveAbilities:[]});case"game.updateStats":return Object(m.a)({},e,{},t.payload);case"game.setMoveType":return Object(m.a)({},e,{moveType:t.payload});case"game.abilitySelection":return Object(m.a)({},e,{abilitySelection:t.payload});case"game.setCooldown":return Object(m.a)({},e,{cooldowns:Object(m.a)({},e.cooldowns,{},t.payload)});case"game.cooldownTic":var a=Object(m.a)({},e.cooldowns);return Object.keys(a).forEach((function(e){return a[e]&&a[e]--})),Object(m.a)({},e,{cooldowns:a});case"game.addAbilityVisibleFields":var n=Object(m.a)({},e.abilityVisibleFields);return t.payload.forEach((function(e){var t=e.x,a=e.y;n[t]||(n[t]={}),n[t][a]=!0})),Object(m.a)({},e,{abilityVisibleFields:n});case"game.addPassiveAbility":return Object(m.a)({},e,{passiveAbilities:[].concat(Object(C.a)(e.passiveAbilities),[t.payload])});default:return e}},settings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REPLACE_GAME_SETTING":return Object(m.a)({},e,{gameSettings:t.payload});case"MODIFY_GAME_SETTING":var a=t.payload,n=a.settingName,o=a.value;return Object(m.a)({},e,{gameSettings:Object(m.a)({},e.gameSettings,Object(d.a)({},n,o))});default:return e}},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"history.erase":return S;case"history.setUserColors":return Object(m.a)({},e,{userColors:t.payload});case g:return Object(m.a)({},e,{history:[].concat(Object(C.a)(e.history),[t.payload])});default:return e}}},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return Object(f.c)(I)(e,t)},T=a(165),F=(a(227),[T.a]);var M,D,P,L=f.a.apply(void 0,F)(f.d)(N),R=a(12),B=function(e){return e.game.players},G=function(e){return e.game.board},H=function(e){return e.game.activeField},K=function(e){return e.game.commands},U=function(e){return e.game.userColors},V=function(e){return e.game.playerRole},W=function(e){return e.game.usersStats},q=function(e){return e.game.tourCounter},J=function(e){return e.game.moveType},Q=function(e){return e.game.abilitySelection},Y=function(e){return e.game.playerIdToTeamId},X=function(e){return e.game.cooldowns},$=function(e){return e.game.abilityVisibleFields},z=function(e){return e.game.passiveAbilities},Z="".concat(".","/battleStart1.mp3"),ee="".concat(".","/open.mp3"),te="".concat(".","/dialogs/Welcome.wav"),ae=("".concat(".","/cnquest.mp3"),["".concat(".","/peacefullMusic.mp3"),"".concat(".","/peacefullMusic2.mp3"),"".concat(".","/peacefullMusic3.mp3"),"".concat(".","/peacefullMusic4.mp3")]),ne="".concat(".","/battleMusic.mp3"),oe="".concat(".","/lost.mp3"),re="".concat(".","/won.mp3"),ie=function(){return Se(ee)},ce=function(){return Ie(te)},le=function(){return Se(Object(R.sample)(ae))},se="".concat(".","/battleMusic2.mp3"),ue="".concat(".","/dialogs/RiseFromAshes.wav"),de="".concat(".","/dialogs/PlowingField1.wav"),me=("".concat(".","/dialogs/PlowingField2.wav"),["".concat(".","/dialogs/WarningAttack.wav")]),pe="".concat(".","/dialogs/WarningAttack2.wav"),be=["".concat(".","/dialogs/RandomCapitol.wav"),"".concat(".","/dialogs/RandomCapitol2.wav")],ye="".concat(".","/dialogs/MoveCapitol.wav"),fe=["".concat(".","/dialogs/UniteArmy1.wav"),"".concat(".","/dialogs/UniteArmy2.wav"),"".concat(".","/dialogs/UniteArmy3.wav"),"".concat(".","/dialogs/UniteArmy4.wav")],ge=["".concat(".","/dialogs/Defender1.wav"),"".concat(".","/dialogs/Defender2.wav"),"".concat(".","/dialogs/Defender3.wav"),"".concat(".","/dialogs/Defender4.wav")],ve="".concat(".","/dialogs/ConquerCapitol.wav"),he="".concat(".","/dialogs/LostCapitol.wav"),Ee=["".concat(".","/dialogs/ConquerCastle.wav"),"".concat(".","/dialogs/ConquerCastle2.wav")],we=["".concat(".","/dialogs/ArchPrepare1.wav"),"".concat(".","/dialogs/ArchPrepare2.wav")],Oe=["".concat(".","/dialogs/5gSelect.wav"),"".concat(".","/dialogs/5gSelect2.wav")],_e="".concat(".","/dialogs/5gEffect.mp3"),Ce=function(){return Ie(_e)},je="".concat(".","/dialogs/FindCapitol.wav"),ke=["".concat(".","/dialogs/ArchShooted3.wav")],xe=.5,Ae=1,Se=function(e){M||((M=new Audio).onended=function(){return"fighter"===V(L.getState())&&Se(se)}),M.pause(),M.src=e,M.load(),M.volume=xe,M.play()},Ie=function(e){console.log("Playing: ",e),D||(D=new Audio),D.pause(),D.src=e,D.load(),D.volume=Ae,D.play()},Ne=function(e){console.log("Playing2: ",e),P||(P=new Audio),P.pause(),P.src=e,P.load(),P.volume=Ae,P.play()},Te=b()(y.address),Fe=function(e){return Te.emit("eraseCommands",e)},Me=function(e,t){return Te.emit("executeInstantCommand",e,t)};Te.on("startBattle",(function(){L.dispatch(v({x:-1,y:-1})),L.dispatch(h([])),L.dispatch(w("fighter")),L.dispatch(O(null)),Se(Z),setTimeout((function(){return le()}),6e3);var e=B(L.getState()).reduce((function(e,t){return Object(m.a)({},e,Object(d.a)({},t.socketId,t.color))}),{});L.dispatch({type:"history.erase"}),L.dispatch(function(e){return{type:"history.setUserColors",payload:e}}(e))})),Te.on("updateStats",(function(e){return L.dispatch(function(e){return{type:"game.updateStats",payload:e}}(e))})),Te.on("loser",(function(){Se(oe)})),Te.on("winner",(function(){Se(re),L.dispatch(w("spectator"))})),Te.on("endOfPeace",(function(){return Se(ne)})),Te.on("updateBoard",(function(e){var t=L.getState().user.teamId,a=L.getState().game.playerIdToTeamId;e.flat().filter((function(e){return a[e.owner]===t})).forEach((function(t){for(var a=t.x,n=t.y,o=a-1;o<=a+1;o++)for(var r=n-1;r<=n+1;r++)e[r]&&e[r][o]&&(e[r][o].isVisible=!0)})),L.dispatch(function(e){return{type:g,payload:e}}(e))})),Te.on("removeCommands",(function(e){return L.dispatch(E(e))})),Te.on("setCooldown",(function(e,t){L.dispatch(function(e,t){return{type:"game.setCooldown",payload:Object(d.a)({},e,t)}}(e,t)),"reborn"===e&&Ie(ue),"unite"===e&&Ie(Object(R.sample)(fe)),"defender"===e&&Ie(Object(R.sample)(ge)),"autumn"===e&&Ce(),"revealCapitols"===e&&L.dispatch({type:"game.addPassiveAbility",payload:"revealCapitols"})})),Te.on("cooldownTic",(function(){return L.dispatch({type:"game.cooldownTic"})})),Te.on("confirmScan",(function(e){for(var t=e.x,a=e.y,n=[],o=t-1;o<=t+1;o++)for(var r=a-1;r<=a+1;r++)n.push({x:o,y:r});L.dispatch({type:"game.addAbilityVisibleFields",payload:n})})),Te.on("sound_ConquerCastle",(function(){return Ie(Object(R.sample)(Ee))})),Te.on("sound_ConquerCapitol",(function(){return Ie(ve)})),Te.on("sound_LostCapitol",(function(){return Ie(he)})),Te.on("sound_archeryShooted",(function(){return Ie(Object(R.sample)(ke))})),Te.on("sound_autumn",Ce),Te.on("sound_capitolAttack",(function(){return Ie(Object(R.sample)(me))})),Te.on("sound_lostCastle",(function(){return Ie(pe)}));Te.on("chat",(function(e){return L.dispatch({type:"messages.addMessage",payload:e})}));var De=function(){return Te.emit("createRoom",L.getState().user.userName)};Te.on("setRoomSettings",(function(e){return L.dispatch(function(e){return{type:"REPLACE_GAME_SETTING",payload:e}}(e))})),Te.on("joined",(function(e){return L.dispatch(function(e){return{type:"user.setUser",payload:e}}(e))})),Te.on("refreshPlayersInRoom",(function(e){return L.dispatch(function(e){return{type:"game.setPlayers",payload:e}}(e))})),Te.on("noRoom",(function(){return window.alert("No room with given id")}));var Pe=a(2),Le=a(37),Re=a.n(Le),Be=function(e){return e.user},Ge=a(72),He=a.n(Ge),Ke=["Kings","Knights","Rulers","Hussars","Monarchs","Warriors","Heroes","Spartans","Franks","Kings4","Kings5","Kings6","Kings7","Kings8","Kings9","Kings10","Kings11","Kings12","Kings13","Kings13"],Ue=function(){var e=Object(Pe.c)(B),t=Object(Pe.c)(Be);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:He.a["room-header"]},"Room: ",t.roomId),o.a.createElement("div",{className:He.a["rooms-wrapper"]},e.map((function(a,n){return o.a.createElement("div",{key:n},o.a.createElement("div",{className:He.a["room-name"]},"Team ",Ke[n]),o.a.createElement("div",null,o.a.createElement("div",{className:He.a["players-block"]},e.filter((function(e){return e.teamId===n})).map((function(e){return o.a.createElement("div",{key:e.socketId},e.userName)}))),o.a.createElement(u.a,{onClick:function(){return e=n,Te.emit("changeTeam",e);var e},disabled:t.teamId===n},"Join")))}))))},Ve=l.a.Item,We=function(){var e=Object(Pe.b)(),t=Object(n.useState)(""),a=Object(c.a)(t,2),r=a[0],i=a[1],l=Object(n.useState)(!1),d=Object(c.a)(l,2),m=d[0],p=d[1],b=Object(Pe.c)(Be),y=!!b.roomId;return o.a.createElement("div",{className:Re.a["lobby-wrapper"]},o.a.createElement("div",{className:Re.a["lobby-content-box"]},o.a.createElement("img",{alt:"logo",src:"/logo.png",className:"".concat(Re.a.logo,"  ").concat(Re.a["logo-left"])}),o.a.createElement("img",{alt:"logo",src:"/logo.png",className:"".concat(Re.a.logo,"  ").concat(Re.a["logo-right"])}),o.a.createElement("h3",{className:Re.a.header},"Overlight Generals ",o.a.createElement("br",null),o.a.createElement("span",{className:Re.a.subtytle},"Kings Alliance")),o.a.createElement(Ve,{help:"User Name"},o.a.createElement("div",{style:{display:"flex"}},o.a.createElement(s.a,{onChange:function(t){return e({type:"user.setName",payload:t.target.value})},value:b.userName,placeholder:"User Name",disabled:m||y}),!b.roomId&&o.a.createElement(u.a,{type:"primary",disabled:m||y,onClick:function(){return p(!0)}},"Confirm"))),!b.roomId&&o.a.createElement("div",null,o.a.createElement(u.a,{disabled:b.roomId,onClick:De,style:{width:"255px"}},"Create Room")),!b.roomId&&o.a.createElement("div",null,o.a.createElement(Ve,{help:"Room ID to join"},o.a.createElement("div",{style:{display:"flex"}},o.a.createElement(s.a,{placeholder:"Room ID",onChange:function(e){return i(e.target.value)}}),o.a.createElement(u.a,{onClick:function(){return function(e){return Te.emit("join",{roomId:e,userName:L.getState().user.userName})}(r)}},"Join")))),b.roomId&&o.a.createElement(Ue,null)))},qe=function(e){return e.messages},Je=a(74),Qe=a.n(Je),Ye=function(){var e=Object(n.useState)(""),t=Object(c.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(!1),l=Object(c.a)(i,2),d=l[0],m=l[1],p=Object(Pe.c)(qe);return o.a.createElement("div",{className:Qe.a["chat-wrapper"]},o.a.createElement("div",{onClick:function(){return m(!d)},className:Qe.a["chat-header"]},"Room Chat"),d&&o.a.createElement("div",null,o.a.createElement("div",{className:Qe.a["chat-history"]},p.map((function(e,t){return o.a.createElement("div",{key:t},e)}))),o.a.createElement("div",{className:Qe.a["new-message"]},o.a.createElement(s.a,{placeholder:"Message....",value:a,onChange:function(e){return r(e.target.value)}}),o.a.createElement(u.a,{onClick:function(){var e;e=a,Te.emit("sendMessage",e),r("")}},"Send Message"))))},Xe=(a(357),a(1)),$e=a.n(Xe),ze=a(174),Ze=a.n(ze),et=function(e){var t=K(L.getState()),a=G(L.getState()),n=H(L.getState()),o=J(L.getState()),r=n.x,i=n.y,c=at(r,i,e),l=c.x,s=c.y,u=c.direction;if(tt(l,s,a)&&tt(r,i,a)){var d=a[s][l];if(!d.isVisible||"mountain"!==d.type){var m,p={from:{x:r,y:i},direction:u,id:Ze()(),type:"all"===o?"MOVE_ALL":"MOVE_HALF"};m=p,Te.emit("addCommand",m),L.dispatch(v({x:l,y:s})),L.dispatch(h([].concat(Object(C.a)(t),[p])))}}},tt=function(e,t,a){return e>=0&&e<a[0].length&&t>=0&&t<a.length},at=function(e,t,a){var n;return"w"===a&&(n="u",t--),"s"===a&&(t++,n="d"),"a"===a&&(e--,n="l"),"d"===a&&(e++,n="r"),{x:e,y:t,direction:n}},nt=function(e,t){return L.dispatch(v({x:e,y:t}))},ot=["w","s","a","d"],rt=function(e){var t=e.key;if(ot.includes(t))return et(t);"e"===t&&it(),"q"===t&&ct()},it=function(){var e=K(L.getState());if(0!==e.length){var t=e[e.length-1],a=[t.id];if(t.from){var n=t.from,o=n.x,r=n.y;nt(o,r)}Fe(a),L.dispatch(E(a))}},ct=function(){var e=K(L.getState());if(0!==e.length){var t=e.map((function(e){return e.id}));Fe(t),L.dispatch(E(t))}},lt=o.a.memo((function(e){var t=e.field,a=e.commands,n=e.visibleFromAbility,r=e.userColors,i=e.abilitySelection,c=e.notifyMouseOver,l=e.clearAbilityHover,s=e.isHoveredByAbility,u=Object(Pe.c)(Be),d=Object(Pe.c)(H),m=Object(Pe.c)(J),p=Object(Pe.c)(Y),b=Object(Pe.b)(),y=t.type,f=t.owner,g=t.units,v=t.x,h=t.y,E=t.isVisible,w=u.socketId===f,_=d.x===v&&d.y===h,C=function(){return!!i&&("reborn"===i&&"castle"===y&&p[f]===p[u.socketId]||("moveCapitol"===i&&"castle"===y&&f===u.socketId||("plowingField"===i&&"plain"===y&&f===u.socketId||(!("archeryFire"!==i||!n&&!E)||("scan"===i||void 0)))))};return o.a.createElement("div",{onClick:function(){if(w&&!n){if("capitol"===y&&Math.random()<.08&&Ie(Object(R.sample)(be)),_&&"all"===m)return L.dispatch({type:"game.setMoveType",payload:"half"});nt(v,h)}},onContextMenu:function(e){e.preventDefault(),C()&&Me(i,{x:v,y:h}),i&&b(O(null))},onMouseEnter:function(){return C()?c(v,h):l()},style:{backgroundColor:n||!0!==!E?"n"===f?"grey":r[f]||"grey":"#202020",backgroundImage:st(y,E||n)},className:$e()("board-tile",{clickable:w||C(),"selected-field":_,"hovered-by-ability":s})},_&&"half"===m?"50%":(n||!!E)&&null!=g&&g,a.map((function(e){return o.a.createElement("div",{className:ut(e)},function(e){switch(e.direction){case"u":return"\u2191";case"d":return"\u2193";case"l":return"\u2190";case"r":return"\u2192";default:return"x"}}(e))})))}),(function(e,t){return!!(Object(R.isEqual)(e.commands,t.commands)&&Object(R.isEqual)(e.field,t.field)&&Object(R.isEqual)(e.visibleFromAbility,t.visibleFromAbility)&&Object(R.isEqual)(e.isHoveredByAbility,t.isHoveredByAbility))}));function st(e,t){var a="";return t=t||window.debug,"plain"===e||!t&&"capitol"===e?"unset":(t||"capitol"===e?"castle"===e?a="/city.png":"mountain"===e?a="/mountain.png":"capitol"===e?a="/crown.png":"defendedCapitol"===e?a="/defendedCrown.png":"archeryTower"===e?a="/archery_tower.png":"observerTower"===e?a="/observer_tower.png":"abandonedFortress"===e&&(a="/tower5G.png"):a="/obstacle.png","url(".concat("."+a,")"))}function ut(e){switch(e.direction){case"u":return"arrow-container arrow-up";case"d":return"arrow-container arrow-down";case"l":return"arrow-container arrow-left";case"r":return"arrow-container arrow-right";default:return alert("command without direction")}}var dt=function(e){var t=e.overridedBoard,a=e.overridedUserColors,r=t||Object(Pe.c)(G),i=a||Object(Pe.c)(U),l=Object(Pe.c)(K),s=Object(Pe.c)(V),u=Object(Pe.c)($),d=Object(Pe.c)(z),m=Object(Pe.c)(Q),p=Object(n.useState)({}),b=Object(c.a)(p,2),y=b[0],f=b[1],g="spectator"===s||"historySpectator"===s||!0===window.debug,v=d.includes("revealCapitols"),h=function(e){var t=e.movementX,a=e.movementY;if(1===e.buttons){var n=document.getElementById("board"),o=n.style,r=o.left,i=o.top;n.style.left=Number(r.slice(0,-2))+t+"px",n.style.top=Number(i.slice(0,-2))+a+"px"}},E=function(e){var t=e.deltaY,a=document.getElementById("board"),n=Number(a.style.transform.slice(6,-1))+(t>0?-.1:.1);n>2||n<.3||(a.style.transform="scale(".concat(String(n).padEnd(3,".0"),")"))},w=function(e,t){if(m){for(var a={},n=e-1;n<=e+1;n++)for(var o=t-1;o<=t+1;o++)a[n]||(a[n]={}),a[n][o]=!0;f(a)}},O=function(){return f({})};Object(n.useEffect)((function(){return setTimeout((function(){var e=L.getState(),t=e.game.usersStats[e.user.socketId].ownedSpecialFields[0];t||console.error("# no capitol for player found");var a=t.x,n=t.y,o=document.getElementById("board");o.style.top="".concat(window.innerHeight/2-45*n,"px"),o.style.left="".concat(window.innerWidth/2-45*a,"px")}),1e3),"historySpectator"!==s&&window.addEventListener("keypress",rt),window.addEventListener("mousemove",h),window.addEventListener("mousewheel",E),function(){"historySpectator"!==s&&window.removeEventListener("keypress",rt),window.removeEventListener("mousemove",h),window.removeEventListener("mousewheel",E)}}),[]);var _=l.reduce((function(e,t){var a="".concat(t.from.x,"-").concat(t.from.y);return e[a]||(e[a]=[]),e[a].push(t),e}),{});return o.a.createElement("div",null,o.a.createElement("div",{id:"board",className:"board-container",style:{left:"10px",top:"10px",transform:"scale(1)"}},r.map((function(e,t){return o.a.createElement("div",{key:t,className:"board-row "},e.map((function(e,t){var a,n;return o.a.createElement(lt,{key:t,abilitySelection:m,userColors:i,visibleFromAbility:g||(null===(a=u[e.x])||void 0===a?void 0:a[e.y])||v&&("capitol"===e.type||"defendedCapitol"===e.type),commands:_["".concat(e.x,"-").concat(e.y)]||[],field:e,notifyMouseOver:w,clearAbilityHover:O,isHoveredByAbility:m&&(null===(n=y[e.x])||void 0===n?void 0:n[e.y])})})))}))))},mt=a(92),pt=a.n(mt),bt=a(388),yt=a(383),ft=a(386),gt=function(e){return e.settings.gameSettings},vt=l.a.Item,ht=(bt.a.Option,Object(R.debounce)((function(e){return function(e){return Te.emit("setRoomSettings",e)}(e)}),500)),Et=function(){var e,t=Object(Pe.c)(gt),a=Object(Pe.c)(Be),n=Object(Pe.c)(B),r=Object(Pe.b)(),i=a.socketId===(null===(e=n[0])||void 0===e?void 0:e.socketId),c=t.mapWidth,l=t.mapHeight,s=(t.gameMode,t.nonAggression),d=t.castlesDensity,m=t.mountainDensity,p=t.castleProduction,b=t.fieldProduction,y=t.turnDuration,f=t.archeryTowersDensity,g=t.observerTowersDensity,v=t.abandonedFortressesDensity,h=function(e,t){r(function(e,t){return{type:"MODIFY_GAME_SETTING",payload:{settingName:e,value:t}}}(e,t)),ht(gt(L.getState()))},E=function(){return e=t,Te.emit("start",e);var e};return a.roomId?o.a.createElement("div",{className:pt.a["settings-wrapper"]},o.a.createElement("div",{className:pt.a["settings-content-box"]},o.a.createElement(u.a,{onClick:function(){return E()},type:"primary",style:{width:"300px",marginTop:"10px"},disabled:!i},"Battle!"),o.a.createElement("div",{className:pt.a["settings-list"]},o.a.createElement(yt.a,null,"Only Host Can Modify This Settings"),o.a.createElement(yt.a,null,"Map Dimmensions"),o.a.createElement("div",null,o.a.createElement(vt,{help:"Map Width: ".concat(c)},o.a.createElement(ft.a,{disabled:!i,min:15,max:55,value:c,onChange:function(e){return h("mapWidth",e)}})),o.a.createElement(vt,{help:"Map Height: ".concat(l)},o.a.createElement(ft.a,{disabled:!i,min:15,max:55,value:l,onChange:function(e){return h("mapHeight",e)}}))),o.a.createElement(yt.a,null,"Game Rules"),o.a.createElement(vt,{help:"Duration Of Non-Aggression Pact: ".concat(s)},o.a.createElement(ft.a,{disabled:!i,min:10,max:300,step:10,value:s,onChange:function(e){return h("nonAggression",e)}})),o.a.createElement(yt.a,null,"Map Objects"),o.a.createElement("div",null,o.a.createElement(vt,{help:"Castles Density: ".concat(d)},o.a.createElement(ft.a,{disabled:!i,min:0,max:1,step:.1,value:d,onChange:function(e){return h("castlesDensity",e)}})),o.a.createElement(vt,{help:"Mountains Density: ".concat(m)},o.a.createElement(ft.a,{disabled:!i,min:0,max:1,step:.1,value:m,onChange:function(e){return h("mountainDensity",e)}})),o.a.createElement(vt,{help:"Abandoned Fortesses Density: ".concat(v)},o.a.createElement(ft.a,{disabled:!i,min:0,max:1,step:.1,value:v,onChange:function(e){return h("abandonedFortressesDensity",e)}})),o.a.createElement(vt,{help:"Observer Towers Density: ".concat(g)},o.a.createElement(ft.a,{disabled:!i,min:0,max:1,step:.1,value:g,onChange:function(e){return h("observerTowersDensity",e)}})),o.a.createElement(vt,{help:"Archery Towers Density: ".concat(f)},o.a.createElement(ft.a,{disabled:!i,min:0,max:1,step:.1,value:f,onChange:function(e){return h("archeryTowersDensity",e)}}))),o.a.createElement(yt.a,null,"Other"),o.a.createElement("div",null,o.a.createElement(vt,{help:"Castles Units Production Time: ".concat(p)},o.a.createElement(ft.a,{disabled:!i,min:1,max:60,step:1,value:p,onChange:function(e){return h("castleProduction",e)}})),o.a.createElement(vt,{help:"Field Units Production Time: ".concat(b)},o.a.createElement(ft.a,{disabled:!i,min:1,max:60,step:1,value:b,onChange:function(e){return h("fieldProduction",e)}})),o.a.createElement(vt,{help:"Turn Duration: ".concat(y," ms")},o.a.createElement(ft.a,{disabled:!i,min:250,max:3e3,step:250,value:y,onChange:function(e){return h("turnDuration",e)}})))))):null},wt=a(75),Ot=a.n(wt),_t=function(){var e,t=Object(Pe.c)(B),a=Object(Pe.c)(U),n=Object(Pe.c)(W),r=Object(Pe.c)(Be),i=Object(Pe.c)(q),c=Object(Pe.c)(V),l=Object(Pe.c)(gt).nonAggression,s=Object(Pe.b)();return o.a.createElement("div",{className:Ot.a["info-panel"]},o.a.createElement("div",{className:$e()(Ot.a["grid-container"])},o.a.createElement("div",null),o.a.createElement("div",null,"Team"),o.a.createElement("div",{className:Ot.a["room-header"]},"Player"),o.a.createElement("div",null,"Army"),o.a.createElement("div",null,"Lands"),t.map((function(e){var t,r;return o.a.createElement(o.a.Fragment,{key:e.socketId},o.a.createElement("div",null,o.a.createElement("div",{className:Ot.a["color-box"],style:{background:a[e.socketId]}})),o.a.createElement("div",null,e.teamId),o.a.createElement("div",null,"".concat(e.userName)),o.a.createElement("div",null,(null===(t=n[e.socketId])||void 0===t?void 0:t.units)||0),o.a.createElement("div",null,(null===(r=n[e.socketId])||void 0===r?void 0:r.lands)||0))}))),o.a.createElement("div",null,"Tour: ",i," / ",l),o.a.createElement("div",null,"spectator"===c&&o.a.createElement(u.a,{type:"primary",onClick:function(){le(),s(w("historySpectator"))},style:{width:"100%"}},"Battle History"),("spectator"===c||"historySpectator"===c)&&o.a.createElement(u.a,{onClick:function(){return s(w("lobby"))},type:"danger",style:{width:"100%"}},"Back To Lobby!"),"fighter"===c&&0===(null===(e=n[r.socketId])||void 0===e?void 0:e.lands)&&o.a.createElement(u.a,{onClick:function(){return s(w("spectator"))},type:"danger",style:{width:"100%"}},"Accept Failure")))},Ct=a(66),jt=a.n(Ct),kt=a(389),xt=a(390),At=function(){var e=Object(n.useState)(50),t=Object(c.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(100),l=Object(c.a)(i,2),s=l[0],d=l[1],m=function(e){r(e),function(e){xe=e,M&&(M.volume=xe)}(e/100)},p=function(e){d(e),function(e){Ae=e,D&&(D.volume=Ae),P&&(P.volume=Ae)}(e/100)};return o.a.createElement("div",{className:jt.a["audio-panel"]},o.a.createElement("div",{className:jt.a.controller},o.a.createElement(u.a,{onClick:function(){return p(s?0:100)},icon:o.a.createElement(kt.a,null)}),o.a.createElement("div",{className:jt.a["slider-wrapper"]},o.a.createElement(ft.a,{min:0,max:100,onChange:p,value:s}))),o.a.createElement("div",{className:jt.a.controller},o.a.createElement(u.a,{onClick:function(){return m(a?0:100)},icon:o.a.createElement(xt.a,null)}),o.a.createElement("div",{className:jt.a["slider-wrapper"]},o.a.createElement(ft.a,{min:0,max:100,onChange:m,value:a}))))},St=(a(381),function(e){return e.history.history}),It=function(e){return e.history.userColors},Nt=a(182),Tt=a.n(Nt),Ft=a(391),Mt=a(392),Dt=a(393),Pt=a(394),Lt=a(395),Rt=a(396),Bt=function(e){var t=Object(n.useState)(e),a=Object(c.a)(t,2),o=a[0],r=a[1],i=Object(n.useRef)(o);return Object(n.useEffect)((function(){i.current=o}),[o]),[o,i,r]},Gt=function(){var e=Object(Pe.c)(St),t=Object(Pe.c)(It),a=Bt(0),r=Object(c.a)(a,3),i=(r[0],r[1]),l=r[2],s=Object(n.useState)(e[0]),d=Object(c.a)(s,2),m=d[0],p=d[1],b=Bt(25),y=Object(c.a)(b,3),f=y[0],g=y[1],v=y[2],h=Bt(!1),E=Object(c.a)(h,3),w=E[0],O=E[1],_=E[2],C=function(t){l(t),p(e[t])},j=function(e){var t=i.current-e;C(t<0?0:t)},k=function(t){var a=i.current+t;C(a>=e.length?e.length-1:a)},x=function t(a){(a||O.current)&&e[i.current+1]&&(C(i.current+1),1)&&setTimeout((function(){t()}),1e3/g.current)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:Tt.a["speed-slider"]},o.a.createElement(ft.a,{max:100,min:1,step:1,value:f,onChange:v}),o.a.createElement("div",null,"Speed x ",f),o.a.createElement("div",null,o.a.createElement(u.a,{icon:o.a.createElement(Ft.a,null),onClick:function(){return j(40)}}),o.a.createElement(u.a,{icon:o.a.createElement(Mt.a,null),onClick:function(){return j(20)}}),o.a.createElement(u.a,{icon:o.a.createElement(Dt.a,null),onClick:function(){return j(10)}}),!w&&o.a.createElement(u.a,{type:"primary",onClick:function(){_(!0),x(!0)}},"Auto Play"),w&&o.a.createElement(u.a,{type:"primary",onClick:function(){return _(!1)}},"Pause"),o.a.createElement(u.a,{icon:o.a.createElement(Pt.a,null),onClick:function(){return k(10)}}),o.a.createElement(u.a,{icon:o.a.createElement(Lt.a,null),onClick:function(){return k(20)}}),o.a.createElement(u.a,{icon:o.a.createElement(Rt.a,null),onClick:function(){return k(40)}}))),m&&o.a.createElement(dt,{overridedBoard:m,overridedUserColors:t}))},Ht=a(27),Kt=a.n(Ht),Ut=a(384),Vt=function(e){var t,a=e.ability,n=e.handleClick,r=e.disabled,i=void 0!==r&&r,c=e.selectedAbility,l=e.cooldown,s=e.isPassive,u=e.isOwned,m=Object(Pe.b)(),p=a.name,b=a.description,y=a.icon,f=a.id,g=a.maxCooldown,v=a.cost,h=a.from,E=l||i;return o.a.createElement(Ut.a,{title:p,placement:"rightTop",content:o.a.createElement("div",{className:Kt.a["ability-description-box"]},o.a.createElement("div",{className:Kt.a["popover-stats"]},o.a.createElement("div",null,"Cost: ".concat(v," units from ").concat(h)),!s&&o.a.createElement("div",null,"Cooldown: ",l||"0","/",g),s&&o.a.createElement("div",null,"Passive Ability")),b)},o.a.createElement("div",{className:Kt.a["ability-block-container"]},o.a.createElement("div",{onClick:function(){c===f?m(O(null)):!i&&n()},style:{backgroundImage:y},className:$e()(Kt.a["ability-block"],(t={},Object(d.a)(t,Kt.a["selected-block"],c===f),Object(d.a)(t,Kt.a.clickable,!u&&!E),t))},o.a.createElement("div",{style:{boxShadow:u?"inset 0 0px 3px 40px rgba(255, 223, 0, 0.35":"inset 0 0px 3px ".concat(Math.ceil(40*l/g),"px rgba(0, 0, 0, 0.8)")},className:$e()(Kt.a["filler-block"],Object(d.a)({},Kt.a["filler-block__disabled"],!u&&E))}))))},Wt=function(e){return"url(".concat("."+e,")")},qt={name:"Reborn From Ashes",id:"reborn",type:"select",icon:Wt("/ability_reborn.jpg"),description:"Reborn in on of ally's castle. Click on ability and select (by right click) a castle with minimum 100 units to reborn there.",cost:100,from:"ally castle",maxCooldown:500},Jt=[{name:"Unite Army",id:"unite",icon:Wt("/ability_uniteArmy.png"),type:"instant",description:"Gather all units from whole kingdom in your capitol immediately.",cost:0,from:"capitol",maxCooldown:500},{name:"Move Capitol",id:"moveCapitol",icon:Wt("/ability_moveCapitol.jpg"),type:"select",description:"Select owned castle to your new capitol. Select ability and right click on selected castle.",cost:250,from:"capitol",maxCooldown:250},{name:"Ultra Defender",id:"defender",icon:Wt("/logo.png"),type:"instant",description:"Units inside you capitol fight with double power for short period",cost:50,from:"capitol",maxCooldown:1e4},{name:"Plowing The Field",id:"plowingField",type:"select",icon:Wt("/ability_plowingField.png"),description:"Clear one of controlled fields from your units to hide from enemies.",cost:250,from:"capitol",maxCooldown:250}],Qt=[{name:"Scan Area",id:"scan",type:"select",icon:Wt("/ability_observer.png"),description:"Scan area you can not reach. Selected fields (by right click) will be visible even if you have no units in this area.",cost:150,from:"observation tower",fromFieldName:"observerTower",maxCooldown:100},{name:"Longrange Archery Fire",id:"archeryFire",type:"select",icon:Wt("/ability_archery.png"),description:"Select (by right click) one of visible fields and order archeries longrange fire. Damage 60% of units on empty areas and 20% in buildings",cost:600,from:"archery tower",fromFieldName:"archeryTower",maxCooldown:400},{name:"Autumn Of The Middle Ages",id:"autumn",type:"instant",icon:Wt("/ability_autumn.png"),description:"Cause a tragedy across all kingdoms. After tragedy only one unit on every standard field will remain.",cost:1500,from:"abondoned fortress",fromFieldName:"abandonedFortress",maxCooldown:2500}],Yt=[{name:"Reveal Capitols",id:"revealCapitols",type:"instant",icon:Wt("/ability_show_crown.PNG"),description:"Make all capitols visible on map (only you can see it).",cost:3e3,from:"capitol",maxCooldown:1}],Xt=function(){var e=Object(Pe.c)(Be),t=Object(Pe.c)(W),a=Object(Pe.c)(Q),n=Object(Pe.c)(X),r=Object(Pe.c)(z),i=Object(Pe.b)(),c=t[e.socketId];if(!c)return null;var l=!c.units,s=function(e){var t=e.type,a=e.id;"select"===t&&function(e){i(O(e))}(a),"instant"===t&&Me(a),"archeryFire"===a&&Ne(Object(R.sample)(we)),"autumn"===a&&Ne(Object(R.sample)(Oe)),"revealCapitols"!==a&&"scan"!==a||Ie(je),"moveCapitol"===a&&Ie(ye),"plowingField"===a&&Ie(Object(R.sample)([de]))},u=c.ownedSpecialFields.find((function(e){return"capitol"===e.type||"defendedCapitol"===e.type}));return o.a.createElement("div",{className:Kt.a["ability-panel"]},l&&o.a.createElement(Vt,{handleClick:function(){return s(qt)},disabled:!1,ability:qt,selectedAbility:a,cooldown:n[qt.id]}),!l&&Jt.map((function(e){return o.a.createElement(Vt,{key:e.id,handleClick:function(){return s(e)},disabled:u.units<=e.cost,ability:e,selectedAbility:a,cooldown:n[e.id]})})),!l&&Yt.map((function(e){return o.a.createElement(Vt,{key:e.id,handleClick:function(){return s(e)},disabled:u.units<=e.cost,isPassive:!0,isOwned:r.includes(e.id),ability:e,selectedAbility:a,cooldown:n[e.id]})})),Qt.filter((function(e){return c[e.fromFieldName]})).map((function(e){return o.a.createElement(Vt,{key:e.id,handleClick:function(){return s(e)},disabled:!c.ownedSpecialFields.some((function(t){return t.type===e.fromFieldName&&t.units>e.cost})),ability:e,selectedAbility:a,cooldown:n[e.id]})})))};var $t=function(){var e=Object(Pe.c)(V);return Object(n.useEffect)((function(){setTimeout(ce,1e3),setTimeout(ie,5e3)}),[]),o.a.createElement("div",null,o.a.createElement(At,null),"fighter"===e&&o.a.createElement(Xt,null),o.a.createElement(_t,null),o.a.createElement(Ye,null),"lobby"===e&&o.a.createElement(o.a.Fragment,null,o.a.createElement(We,null),o.a.createElement(Et,null)),("fighter"===e||"spectator"===e)&&o.a.createElement(dt,null),"historySpectator"===e&&o.a.createElement(Gt,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(Pe.a,{store:L},o.a.createElement($t,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},66:function(e,t,a){e.exports={"audio-panel":"AudioControl_audio-panel__1D5FQ",controller:"AudioControl_controller__2uprX","slider-wrapper":"AudioControl_slider-wrapper__3K4Ro"}},72:function(e,t,a){e.exports={"rooms-wrapper":"RoomTeams_rooms-wrapper__3evw5","room-header":"RoomTeams_room-header__1i6AB","room-name":"RoomTeams_room-name__2odmr","players-block":"RoomTeams_players-block__24cKH"}},74:function(e,t,a){e.exports={"chat-wrapper":"LiveChat_chat-wrapper__3yyAJ","chat-history":"LiveChat_chat-history__2VHgG","chat-header":"LiveChat_chat-header__1SPj-","new-message":"LiveChat_new-message__1I6jr"}},75:function(e,t,a){e.exports={"info-panel":"GameInfo_info-panel__3NB7p","grid-container":"GameInfo_grid-container__1DJ7y","color-box":"GameInfo_color-box__kQ-B1"}},92:function(e,t,a){e.exports={"settings-wrapper":"Settings_settings-wrapper__1-tcm","settings-content-box":"Settings_settings-content-box__38rES","settings-list":"Settings_settings-list__3xNVK"}}},[[188,1,2]]]);
//# sourceMappingURL=main.48bc22ef.chunk.js.map