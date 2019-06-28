const Player = cc.Sprite.extend({
  gameLayer: null,
  lock: true,
  ctor: function (gameLayer) {
    this._super(cc.spriteFrameCache.getSpriteFrame('hero1.png'));
    this.gameLayer = gameLayer;
    var heroHoldFrames = [
      cc.spriteFrameCache.getSpriteFrame('hero1.png'),
      cc.spriteFrameCache.getSpriteFrame('hero2.png')
    ];

    var holdAnimation = new cc.Animation(heroHoldFrames, 0.1);
    this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
    this.moveIn();
    // 开枪
    this.schedule(this.shootSingleBullet, Global.shootSpeed);
    return true;
  },

  moveIn: function () {
    this.runAction(cc.sequence(
      cc.moveTo(1, cc.p(cc.winSize.width / 2, cc.winSize.height / 2)),
      cc.moveBy(2, cc.p(0, -200)),
      cc.callFunc(function (player) {
        player.lock = false;
      }, this, this)
    ));
  },

  moveBy: function (x, y) {
    if (!this.lock) {
      this.setPosition(this.getPositionX() + x, this.getPositionY() + y);
    }
  },

  shootSingleBullet: function () {
    if (!this.lock) {
      var bullet = new Bullet(2, true, this.gameLayer);
      bullet.setPosition(this.getPositionX(), this.getPositionY() + this.height / 2);
      this.gameLayer.addChild(bullet);
      this.gameLayer.bullets.push(bullet);
      // 发射子弹音效
      cc.audioEngine.playEffect('res/sounds/bullet.mp3');
    }
  },

  blowUp: function () {
    this.lock = true;
    //爆炸动画
    const blowUpFrames = [
      cc.spriteFrameCache.getSpriteFrame('hero_blowup_n1.png'),
      cc.spriteFrameCache.getSpriteFrame('hero_blowup_n2.png'),
      cc.spriteFrameCache.getSpriteFrame('hero_blowup_n3.png'),
      cc.spriteFrameCache.getSpriteFrame('hero_blowup_n4.png')
    ];
    const blowUpAnimation = new cc.Animation(blowUpFrames, 0.1);
    console.log(blowUpAnimation);
    this.stopAllActions();
    this.runAction(cc.sequence(cc.animate(blowUpAnimation), cc.callFunc((player) => {
      player.removeFromParent();
    }, this, this)));
  }
});