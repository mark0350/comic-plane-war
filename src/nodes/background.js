const Background = cc.Sprite.extend({
  ctor: function (isOver) {
    if (isOver) {
      this._super();
      const bg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('gameover.png'));
      // bg.setScale(960 / 480);
      this.addChild(bg);
    } else {
      this._super();
      // this.setScale(960 / 480);

      const menuBg1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('background.png'));
      menuBg1.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
      // menuBg1.setScale(960 / 480);
      menuBg1.setTag(1);
      this.addChild(menuBg1);

      const menuBg2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('background.png'));
      menuBg2.setPosition(cc.winSize.width / 2,
        cc.winSize.height / 2 + menuBg1.getBoundingBox().height - 10);
      // menuBg2.setScale(960 / 480);
      menuBg2.setTag(2);
      this.addChild(menuBg2);
      this.schedule(this.update);

    }
    return true;

  },

  update: function () {
    const menuBg1 = this.getChildByTag(1);
    const menuBg2 = this.getChildByTag(2);

    if (menuBg1.getPositionY() <= -menuBg1.getBoundingBox().height / 2) {
      menuBg1.setPositionY(menuBg2.getBoundingBox().height + menuBg1.getBoundingBox().height / 2 - 30);
    } else {
      menuBg1.setPositionY(menuBg1.getPositionY() - 1);
    }

    if (menuBg2.getPositionY() <= -menuBg2.getBoundingBox().height / 2) {
      menuBg2.setPositionY(menuBg1.getBoundingBox().height + menuBg2.getBoundingBox().height / 2 - 30);
    } else {
      menuBg2.setPositionY(menuBg2.getPositionY() - 1);
    }
  }

});