const MenuLayer = cc.Layer.extend({
  ctor: function () {
    this._super();
    cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);

    const bg = new Background(false);
    bg.setPosition(0, 0);
    this.addChild(bg);

    const gameTitle = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('shoot_copyright.png'));
    gameTitle.setPosition(cc.winSize.width / 2, cc.winSize.height * 3 / 4);
    gameTitle.runAction(cc.speed(cc.repeatForever(cc.sequence(cc.scaleTo(1, 0.7),
      cc.scaleTo(1, 1))), 1));
    this.addChild(gameTitle);

    const startButton = new cc.MenuItemSprite(
      new cc.Sprite('res/game_start.png'),
      new cc.Sprite('res/game_start_selected.png'),
      function () {
        cc.audioEngine.playEffect('res/sounds/button.mp3');
        cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
      }, this
    );

    const helpButton = new cc.MenuItemSprite(
      new cc.Sprite('res/game_help.png'),
      new cc.Sprite('res/game_help_selected.png'),
      function () {
        cc.audioEngine.playEffect('res/sounds/button.mp3');
        cc.director.runScene(new cc.TransitionFade(1, new HelpScene()));
      }, this
    );

    helpButton.setPosition(startButton.getPositionX(), startButton.getPositionY() - 50);

    const menu = new cc.Menu(startButton, helpButton);

    this.addChild(menu);

    // loading
    const loading = new Loading();
    loading.setPosition(cc.winSize.width / 2, 100);
    this.addChild(loading);

    return true;

  },


});

const MenuScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new MenuLayer();
    this.addChild(layer);
  }
});