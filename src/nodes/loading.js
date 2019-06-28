const Loading = cc.Sprite.extend({
  ctor: function () {
    this._super();

    const loadFrames = [
      cc.spriteFrameCache.getSpriteFrame('game_loading1.png'),
      cc.spriteFrameCache.getSpriteFrame('game_loading2.png'),
      cc.spriteFrameCache.getSpriteFrame('game_loading3.png'),
      cc.spriteFrameCache.getSpriteFrame('game_loading4.png')
    ];

    const loadAnimation = new cc.Animation(loadFrames, 0.5);
    this.runAction(cc.repeatForever(cc.animate(loadAnimation)));

    return true;
  }
});