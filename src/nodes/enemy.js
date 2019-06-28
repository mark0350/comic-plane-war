var Enemy = cc.Sprite.extend({
    type: 1,
    hp: 0,
    gameLayer: null,
    ctor: function (type, gameLayer) {
      this.type = type;
      this.hp = Global.enemyHp(type);
      this.gameLayer = gameLayer;
      if (type === 3) {
        this._super(cc.spriteFrameCache.getSpriteFrame('enemy' + type + '_n1.png'));
        var holdFrames = [
          cc.spriteFrameCache.getSpriteFrame('enemy' + type + '_n1.png'),
          cc.spriteFrameCache.getSpriteFrame('enemy' + type + '_n2.png')
        ];
        var holdAnimation = new cc.Animation(holdFrames, 0.1);
        this.runAction(cc.repeatForever(cc.animate(holdAnimation)));
      } else {
        this._super(cc.spriteFrameCache.getSpriteFrame('enemy' + type + '.png'));
      }
      this.schedule(this.moveDown);

      return true;

    },
    moveDown: function () {
      this.setPositionY(this.getPositionY() - Global.enemySpeed(this.type));
      if (this.getPositionY() < -this.height / 2) {
        this.remove();
      }
    },
    hit: function () {
      if (--this.hp <= 0) {
        this.blowUp();
      }

    },
    blowUp: function () {
      this.remove();
      this.gameLayer.addScore(this.type);
    },
    remove: function () {
      const index = this.gameLayer.enemies.indexOf(this);
      this.gameLayer.enemies.splice(index, 1);
      this.removeFromParent(true);

    }
  }
);