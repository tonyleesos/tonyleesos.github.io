window.__require=function e(t,a,i){function n(s,r){if(!a[s]){if(!t[s]){var o=s.split("/");if(o=o[o.length-1],!t[o]){var l="function"==typeof __require&&__require;if(!r&&l)return l(o,!0);if(c)return c(o,!0);throw new Error("Cannot find module '"+s+"'")}s=o}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){return n(t[s][1][e]||e)},d,d.exports,e,t,a,i)}return a[s].exports}for(var c="function"==typeof __require&&__require,s=0;s<i.length;s++)n(i[s]);return n}({Battle:[function(e,t,a){"use strict";cc._RF.push(t,"f11ccuzoOVLdJ+t8nnV4YAf","Battle");var i=cc.Class({name:"Card",properties:{id:cc.Integer,type:cc.Integer,level:cc.Integer,value:cc.Integer,realValue:{get:function(){return this.value*this.level}}}});cc.Class({extends:cc.Component,properties:{cardFrames:[cc.SpriteFrame],enemyBlood:{default:100,type:cc.Integer},playerDefense:{default:0,type:cc.Integer},playerHitrate:{default:0,type:cc.Integer},playerBlood:{default:50,type:cc.Integer},enemyBloodBar:cc.ProgressBar,playerBloodBar:cc.ProgressBar,activeCards:[cc.Button],handCards:[cc.Button],handCardBlockInputEvents:cc.Node,hitPicture:cc.Sprite,hitedPicture:cc.Sprite,WinPopupWindow:cc.Sprite,LosePopupWindow:cc.Sprite,EnemyTalk:[cc.Sprite],BackGrounpBGM:cc.AudioSource,missHitPicture:cc.Animation,HealAnimation:cc.Animation,DefenseAnimation:cc.Animation,DefenseIcon:cc.Sprite,AttackView:cc.Sprite,UpHitRateAnimation:cc.Animation,UpHitRateView:cc.Sprite,AttackView1:cc.Sprite,AttackView2:cc.Sprite,AttackView3:cc.Sprite,AttackView4:cc.Sprite,DefenseView:cc.Sprite,HealView:cc.Sprite,AttackBgm:cc.AudioClip,DefenseBgm:cc.AudioClip,HealBgm:cc.AudioClip,HitedBgm:cc.AudioClip},onLoad:function(){var e=this;this.handCardBlockInputEvents.zIndex=999,this._activeCardObjects=[],this._handCardObjects=[],this._currentEnemyBlood=this.enemyBlood,this._currentPlayerBlood=this.playerBlood,this._disableHandCardCount=0,this._isDragging=!1,this.handCards.forEach(function(t,a){e.bindHandCardEvents(t,a)}.bind(this)),this.audio2=this.node.getChildByName("BackGrounpBGM").getComponent(cc.AudioSource)},start:function(){var e=this;this.audio2.loop=!0,this.audio2.mute=!1,this.audio2.play(),this.showEnemyTalk();for(var t=0;t<7;t++)this._handCardObjects.push(this.getRandomCard());this.refresh(),cc.tween(this.node).delay(1).call(function(){e.combineHandCards(!0)}).start()},refreshActiveCards:function(){for(var e=0;e<3;e++)if(this._activeCardObjects[e]){var t=0==this._activeCardObjects[e].type?0:3*(this._activeCardObjects[e].type-1)+this._activeCardObjects[e].level;this.activeCards[e]._sprite.spriteFrame=this.cardFrames[t]}else this.activeCards[e]._sprite.spriteFrame=null},refreshHandCards:function(){for(var e=0;e<7;e++)if(this._handCardObjects[e]){var t=0==this._handCardObjects[e].type?0:3*(this._handCardObjects[e].type-1)+this._handCardObjects[e].level;this.handCards[e]._sprite.spriteFrame=this.cardFrames[t]}else this.handCards[e]._sprite.spriteFrame=null},refreshBlood:function(){this.enemyBloodBar.progress=this._currentEnemyBlood/this.enemyBlood,this.playerBloodBar.progress=this._currentPlayerBlood/this.playerBlood},refresh:function(){this.refreshActiveCards(),this.refreshHandCards(),this.refreshBlood()},getRandom:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},getNotRepeatRandom:function(){for(var e=[0,1,2,3],t=[],a=0;a<1;a++){var i=Math.floor(Math.random()*e.length);t.push(e.splice(i,1)[0])}return i},getRandomCard:function(){switch(cc.sys.localStorage.getItem("levelSceneName")){case"battle":return this.classifyCardtype(3);case"battle2":return this.classifyCardtype(5);case"battle3":return this.classifyCardtype(3);case"battle4":return this.classifyCardtype(4)}},classifyCardtype:function(e){var t=this.getRandom(1,e),a=new i;if(a.id=t,a.level=1,"battle3"==cc.sys.localStorage.getItem("levelSceneName"))switch(t){case 1:a.type=1,a.value=10;break;case 2:a.type=2,a.value=15;break;case 3:a.type=3,a.value=20}else if("battle4"==cc.sys.localStorage.getItem("levelSceneName"))switch(t){case 1:a.type=1,a.value=15;break;case 2:a.type=2,a.value=2;break;case 3:a.type=3,a.value=2;break;case 4:a.type=4,a.value=1}else switch(t){case 1:a.type=1,a.value=10;break;case 2:a.type=2,a.value=2;break;case 3:a.type=3,a.value=2;break;case 4:a.type=4,a.value=15;break;case 5:a.type=5,a.value=1}return a},getMoveCard:function(){var e=new i;return e.id=0,e.level=0,e.type=0,e.value=0,e},combineHandCards:function(e){var t,a=this;do{var n=null,c=[];t=this._handCardObjects.length;for(var s=0;s<this._handCardObjects.length;s++){var r=!1;if(n){var o=new i;o.id=n.id,o.type=n.type,o.value=n.value,n.type==this._handCardObjects[s].type&&n.level==this._handCardObjects[s].level&&n.level<3?(o.level=n.level+1,r=!0):o.level=n.level,c.push(o)}n=r?null:this._handCardObjects[s],s==this._handCardObjects.length-1&&n&&c.push(n)}this._handCardObjects=c}while(t!=this._handCardObjects.length);this.refreshHandCards(),e&&this._handCardObjects.length<7&&cc.tween(this.node).call(function(){a.disableHandCards()}).delay(.5).call(function(){a.drawCard()}).call(function(){a.enableHandCards()}).start()},drawCard:function(){for(var e=this,t=0;t<7-this._handCardObjects.length;t++)this._handCardObjects.push(this.getRandomCard());this.refreshHandCards(),cc.tween(this.node).call(function(){e.disableHandCards()}).delay(.5).call(function(){e.combineHandCards(!0)}).call(function(){e.enableHandCards()}).start()},onHandCardClick:function(e,t){var a=this;!this._isDragging&&this._activeCardObjects.length<3?(this._activeCardObjects.push(this._handCardObjects.splice(t,1)[0]),this.refresh(),this.combineHandCards(!1),3==this._activeCardObjects.length&&cc.tween(this.node).delay(1).call(function(){a.onCardAction()}).start()):this._isDragging=!1},onCardMoved:function(e,t){for(var a=this,i=this._handCardObjects.length,n=0;n<this._handCardObjects.length;n++)if(this.handCards[n].node.x+62>=t&&this.handCards[n].node.x<t){i=n;break}if(e!=i&&e!=i-1){var c=this._handCardObjects[e];if(i>e){for(n=e;n<i-1;n++)this._handCardObjects[n]=this._handCardObjects[n+1];this._handCardObjects[i-1]=c}else{for(n=e;n>i;n--)this._handCardObjects[n]=this._handCardObjects[n-1];this._handCardObjects[i]=c}this._activeCardObjects.push(this.getMoveCard()),this.refresh();var s=cc.tween(this.node).call(function(){a.disableHandCards()}).delay(.5).call(function(){a.combineHandCards(!1)});3==this._activeCardObjects.length&&(s=s.delay(1).call(function(){a.onCardAction()})),s.call(function(){a.enableHandCards()}).start()}},onCardAction:function(){var e=this,t=cc.tween(this.node).call(function(){e.disableHandCards()});this.showEnemyTalk();for(var a=0;a<this._activeCardObjects.length;a++)t=t.call(function(){var a=e._activeCardObjects.splice(0,1)[0];if("battle3"==cc.sys.localStorage.getItem("levelSceneName"))e.attack(a.realValue,t,a.type);else if("battle4"==cc.sys.localStorage.getItem("levelSceneName"))switch(a.type){case 1:e.attack(a.realValue,t,a.type);break;case 2:e.defense(a.realValue,a.type);break;case 3:e.heal(a.realValue);break;case 4:e.uphitrate(a.realValue,a.type)}else switch(a.type){case 1:e.attack(a.realValue,t,a.type);break;case 2:e.defense(a.realValue,a.type);break;case 3:e.heal(a.realValue);break;case 4:e.attack(a.realValue,t,a.type);break;case 5:e.uphitrate(a.realValue,t,a.type)}e.refreshActiveCards(),e.refreshBlood()}).delay(1).call(function(){e.initialRound()});t=t.call(function(){e.playerDefense<=10&&(e._currentPlayerBlood-=10-e.playerDefense),cc.audioEngine.play(e.HitedBgm,!1,.5),e.hitedPicture.node.active=!0,e.playerDefense=0,e.playerHitrate=0,e.showEnemyTalk(),e._currentPlayerBlood<=0&&(e.showLosePopup(),t.stop()),e.refresh()}).delay(1).call(function(){e.hitedPicture.node.active=!1,e.drawCard()}).call(function(){e.enableHandCards()}).start()},initialRound:function(){this.hitPicture.node.active=!1,this.AttackView.node.active=!1,"battle4"==cc.sys.localStorage.getItem("levelSceneName")&&(this.missHitPicture.node.active=!1,this.UpHitRateView.node.active=!1),"battle3"==cc.sys.localStorage.getItem("levelSceneName")&&(this.AttackView1.node.active=!1,this.AttackView2.node.active=!1,this.AttackView3.node.active=!1),"battle2"==cc.sys.localStorage.getItem("levelSceneName")&&(this.AttackView4.node.active=!1,this.missHitPicture.node.active=!1,this.UpHitRateView.node.active=!1),this.DefenseView.node.active=!1,this.DefenseIcon.node.active=!1,this.HealView.node.active=!1,this.HealAnimation.node.active=!1},bindHandCardEvents:function(e,t){var a,i=this,n=!1;e.node.on(cc.Node.EventType.TOUCH_START,function(t){n=!0,a=e.node.x,e.node.zIndex=100}),e.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){if(n){var a=t.getDelta(),c=e.node.x+a.x;c>=195&&(c=195),c<=-195&&(c=-195),e.node.x=c,i._isDragging=!0}}.bind(this)),e.node.on(cc.Node.EventType.TOUCH_END,function(c){var s=e.node.x;n=!1,e.node.x=a,e.node.zIndex=0,i._isDragging&&i.onCardMoved(t,s)}.bind(this)),e.node.on(cc.Node.EventType.TOUCH_CANCEL,function(c){var s=e.node.x;n=!1,e.node.x=a,e.node.zIndex=0,i._isDragging&&i.onCardMoved(t,s)}.bind(this))},enableHandCards:function(){this._disableHandCardCount--,this._disableHandCardCount<=0&&(this._disableHandCardCount=0,this.handCardBlockInputEvents.active=!1)},disableHandCards:function(){this._disableHandCardCount++,this.handCardBlockInputEvents.active=!0},attack:function(e,t,a){"battle3"==cc.sys.localStorage.getItem("levelSceneName")||"battle"==cc.sys.localStorage.getItem("levelSceneName")?(this._currentEnemyBlood-=e,cc.audioEngine.play(this.AttackBgm,!1,.5),this.hitPicture.node.active=!0,"battle3"==cc.sys.localStorage.getItem("levelSceneName")?1===a?this.AttackView1.node.active=!0:2===a?this.AttackView2.node.active=!0:3===a&&(this.AttackView3.node.active=!0):this.AttackView.node.active=!0):(this.getRandom(this.playerHitrate,4)>=2?(this._currentEnemyBlood-=e,cc.audioEngine.play(this.AttackBgm,!1,.5),this.hitPicture.node.active=!0,this.AttackView.node.active=!0):(this.missHitPicture.node.active=!0,this.missHitPicture.play()),1===a?this.AttackView.node.active=!0:4===a&&"battle4"!=cc.sys.localStorage.getItem("levelSceneName")&&(this.AttackView4.node.active=!0));if(this._currentEnemyBlood<=0)return this.showWinPopup(),this.winLevelSet(),this.initialRound(),void t.stop()},defense:function(e,t){this.playerDefense+=e,this.DefenseIcon.node.active=!0,this.DefenseAnimation.play(),cc.audioEngine.play(this.DefenseBgm,!1,.5),2===t?this.DefenseView.node.active=!0:5===t&&(this.DefenseView2.node.active=!0)},heal:function(e){this._currentPlayerBlood+=e,this.HealView.node.active=!0,this.HealAnimation.node.active=!0,this.HealAnimation.play(),cc.audioEngine.play(this.HealBgm,!1,.5)},uphitrate:function(e){this.UpHitRateAnimation.play(),this.UpHitRateView.node.active=!0,cc.audioEngine.play(this.HealBgm,!1,.5),this.playerHitrate>4?this.playerHitrate=3:this.playerHitrate+=e},showWinPopup:function(){this.WinPopupWindow.node.active=!0,cc.tween(this.WinPopupWindow.node).to(.5,{scale:1,opacity:255},{easing:"quartInOut"}).start()},winLevelSet:function(){var e=cc.sys.localStorage.getItem("levelSceneName"),t=0;"battle"==e?t=0:"battle2"==e?t=1:"battle3"==e?t=2:"battle4"==e&&(t=3);var a=JSON.parse(cc.sys.localStorage.getItem("Levelsettings"));t>=3?(a[t].levelState="FINISH",a[t+1].levelState="FINISH"):"FINISH"!=a[t].levelState&&(a[t+1].levelState="UNLOCKED",a[t].levelState="FINISH"),cc.sys.localStorage.setItem("Levelsettings",JSON.stringify(a))},showLosePopup:function(){this.LosePopupWindow.node.active=!0,cc.tween(this.LosePopupWindow.node).to(.5,{scale:1,opacity:255},{easing:"quartInOut"}).start()},showEnemyTalk:function(){var e=this,t=this.getNotRepeatRandom(),a=cc.tween(this.EnemyTalk);a=a.call(function(){for(var a=0;a<e.EnemyTalk.length;a++)e.EnemyTalk[a].node.active=a==t}).start()}}),cc._RF.pop()},{}],ChangeStoryPic:[function(e,t,a){"use strict";cc._RF.push(t,"c08d23yc4NGxLCETjdFsDyY","ChangeStoryPic"),cc.Class({extends:cc.Component,ctor:function(){this._storyFrameIndex=1},properties:{storyNode:cc.Node,nextButtonNode:cc.Node,storyFrames:[cc.SpriteFrame]},onNext:function(){var e=this.storyNode.getComponent(cc.Sprite);this._storyFrameIndex>this.storyFrames.length-1?this._storyFrameIndex=this._storyFrameIndex:this._storyFrameIndex=this._storyFrameIndex+1,e.spriteFrame=this.storyFrames[this._storyFrameIndex],this._storyFrameIndex>=this.storyFrames.length-1&&(this.nextButtonNode.active=!1,this._storyFrameIndex=0)},onload:function(){this._storyFrameIndex=0,this.storyNode.getComponent(cc.Sprite).spriteFrame=this.storyFrames[this._storyFrameIndex],this.nextButtonNode.active=!0}}),cc._RF.pop()},{}],LevelSetting:[function(e,t,a){"use strict";cc._RF.push(t,"9bdf84bTbNDYrVdCJseT/Kr","LevelSetting"),a.__esModule=!0,a.Levelsettings=void 0;a.Levelsettings=[{level:1,levelState:"UNLOCKED",sceneName:"battle"},{level:2,levelState:"LOCKED",sceneName:"battle2"},{level:3,levelState:"LOCKED",sceneName:"battle3"},{level:4,levelState:"LOCKED",sceneName:"battle4"},{level:5,levelState:"LOCKED",sceneName:"battle5"}],cc._RF.pop()},{}],LoadingProgressBar:[function(e,t,a){"use strict";cc._RF.push(t,"8cbcdNbt1pEEZeD2QZ8+er8","LoadingProgressBar"),cc.Class({extends:cc.Component,properties:{progress:cc.ProgressBar,text:cc.Label},start:function(){var e=this,t=cc.sys.localStorage.getItem("levelSceneName");this.text.string="0%",this.progress.progress=0,cc.director.preloadScene(t,function(t,a,i){var n=t/a;e.progress.progress=n,e.text.string=parseInt(100*n)+"%",console.log(e.text.string)},function(){cc.director.loadScene(t)})}}),cc._RF.pop()},{}],MusicLoop:[function(e,t,a){"use strict";cc._RF.push(t,"87407BkzlRH0p7POYV6E84Y","MusicLoop"),cc.Class({extends:cc.Component,properties:{BackGrounpBGM:cc.AudioSource},onLoad:function(){this.audio2=this.node.getChildByName("BackGrounpBGM").getComponent(cc.AudioSource)},start:function(){this.audio2.loop=!0,this.audio2.mute=!1,this.audio2.play()}}),cc._RF.pop()},{}],PopupWindow:[function(e,t,a){"use strict";cc._RF.push(t,"be07ady7wRFWpP+zOcFY/xn","PopupWindow"),cc.Class({extends:cc.Component,ctor:function(){},properties:{},Show_Window:function(){this.node.active=!0},Hide_Window:function(){this.node.active=!1},Next_Click:function(){},Exit_Click:function(){this.Hide_Window()}}),cc._RF.pop()},{}],SceneFacade:[function(e,t,a){"use strict";cc._RF.push(t,"d92be3+8lBCKZdLU76R9P66","SceneFacade"),cc.Class({extends:cc.Component,properties:{},start:function(){},loadScene:function(e,t){cc.director.loadScene(t)},loadLevelScene:function(e,t){cc.sys.localStorage.setItem("levelSceneName",t)},reloadSecen:function(){cc.director.loadScene(cc.sys.localStorage.getItem("levelSceneName"))}}),cc._RF.pop()},{}],SelectLevel:[function(e,t,a){"use strict";cc._RF.push(t,"bd7d6fbqdNOVaGlu0p7jcTH","SelectLevel");var i=e("./LevelSetting.js");cc.Class({extends:cc.Component,properties:{level:[cc.Node],unlockPic:[cc.SpriteFrame],lockPic:[cc.SpriteFrame],finishPic:[cc.SpriteFrame],CheakPoint_BlockInputEvent:[cc.Node]},onLoad:function(){this.CheakPoint_BlockInputEvent.zIndex=999,this.initLevels()},initLevels:function(){if(cc.sys.localStorage.getItem("Levelsettings")){var e=JSON.parse(cc.sys.localStorage.getItem("Levelsettings"));for(t=0;t<e.length;t++)this.level[t].Levelsettings=e[t],this.InitLevelPic(this.level[t].Levelsettings.levelState,t)}else{for(var t=0;t<i.Levelsettings.length;t++)this.level[t].Levelsettings=i.Levelsettings[t],this.InitLevelPic(this.level[t].Levelsettings.levelState,t);cc.sys.localStorage.setItem("Levelsettings",JSON.stringify(i.Levelsettings))}},InitLevelPic:function(e,t){"UNLOCKED"==e?(this.level[t].children[0].getComponent(cc.Sprite).spriteFrame=this.unlockPic[t],this.level[t].children[1].active=!1):"LOCKED"==e?(this.level[t].children[0].getComponent(cc.Sprite).spriteFrame=this.lockPic[t],this.level[t].children[1].active=!0):"FINISH"==e&&(this.level[t].children[0].getComponent(cc.Sprite).spriteFrame=this.finishPic[t],this.level[t].children[1].active=!1,4==t&&(this.level[t].active=!0))},start:function(){}}),cc._RF.pop()},{"./LevelSetting.js":"LevelSetting"}],SpriteIndex:[function(e,t,a){"use strict";cc._RF.push(t,"24dacw8QS1Kpr0ZBSQEQOkx","SpriteIndex"),cc.Class({extends:cc.Component,properties:{_index:20,spr:{default:[],type:cc.SpriteFrame},bar:{get:function(){return this._index},set:function(e){e<0||(this._index=e%spr.length,this.node.getComponent(cc.Sprite).spriteFrame=this.spr[this._index])}}},onLoad:function(){var e=this;this.schedule(function(){e._index++},3)},onTouchChange:function(){this._index++}}),cc._RF.pop()},{}]},{},["Battle","ChangeStoryPic","LevelSetting","LoadingProgressBar","MusicLoop","PopupWindow","SceneFacade","SelectLevel","SpriteIndex"]);