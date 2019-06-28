const GameLayer = cc.Layer.extend({
  bullets: [],
  enemies: [],
  ctor: function () {
    this._super();
    this.bullets = [];
    this.enemies = [];
    // 预载入资源
    cc.spriteFrameCache.addSpriteFrames(res.shoot_plist);
    cc.spriteFrameCache.addSpriteFrames(res.shoot_background_plist);

    // 音乐
    cc.audioEngine.playEffect('res/sounds/game_music.mp3', true);


    // 背景载入
    const bg = new Background(false);
    bg.setPosition(0, 0);
    this.addChild(bg);

    // 创建主角战机
    const player = new Player(this);
    player.setPosition(cc.winSize.width / 2, -player.height / 2);
    player.setScale(0.5, 0.5);
    this.addChild(player);
    player.setTag(1);
    const score = new cc.LabelBMFont('0', res.font);
    score.setPosition(cc.winSize.width - 20, cc.winSize.height - 20);
    score.setTag(2);
    this.addChild(score);

    this.schedule(this.createEnemy.bind(this, 1), Global.createEnemySpeed(1));
    this.schedule(() => this.createEnemy(2), Global.createEnemySpeed(2));
    this.schedule(() => this.createEnemy(3), Global.createEnemySpeed(3));


    return true;
  },
  onEnter: function () {
    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouch: true,
      onTouchBegan: this.touchBegan,
      onTouchMoved: this.touchMoved,
      onTOuchEnded: this.touchEnded
    }, this);
    this.schedule(this.collision);
  },

  touchBegan: function (touch, event) {
    event.getCurrentTarget().touchStartX = touch.getLocation().x;
    event.getCurrentTarget().touchStartY = touch.getLocation().y;
    return true;
  },
  touchMoved: function (touch, event) {
    var touchX = touch.getLocation().x;
    var touchY = touch.getLocation().y;
    var touchStartX = event.getCurrentTarget().touchStartX;
    var touchStartY = event.getCurrentTarget().touchStartY;
    var player = event.getCurrentTarget().getChildByTag(1);
    if (player != null) {
      player.moveBy(touchX - touchStartX, touchY - touchStartY);
      event.getCurrentTarget().touchStartX = touchX;
      event.getCurrentTarget().touchStartY = touchY;
    }
    return true;
  },
  touchEnded: function (touch, event) {
    return true;
  },

  createEnemy: function (type) {
    var enemy = new Enemy(type, this);
    var randomX = Math.random() * (cc.winSize.width - enemy.width / 2 - enemy.width / 2) + enemy.width / 2;

    enemy.setPosition(randomX, cc.winSize.height + enemy.height / 2);
    this.addChild(enemy);
    this.enemies.push(enemy);
  },

  collision: function () {
    const player = this.getChildByTag(1);
    for (let enemy of this.enemies) {
      if (cc.rectIntersectsRect(player.getBoundingBox(), enemy.getBoundingBox())) {
        this.unschedule(this.collision);
        player.blowUp();
      }
      for (let bullet of this.bullets) {
        if (cc.rectIntersectsRect(enemy.getBoundingBox(), bullet.getBoundingBox())) {
          enemy.hit();
          bullet.remove();
        }
      }
    }
  },
  addScore: function (type) {
    const score = this.getChildByTag(2);
    let addScore = 0;
    const curScore = parseInt(score.getString());
    switch (type) {
      case 1:
        addScore = 100 + Math.ceil(Math.random() * (curScore / 1000));
        break;
      case 2:
        addScore = 200 + Math.ceil(Math.random() * (curScore / 1000));
        break;
      case 3:
        addScore = 500 + Math.ceil(Math.random() * (curScore / 1000));
        break;
    }
    score.setString(curScore + addScore);


  }
});

const GameScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    const layer = new GameLayer();
    this.addChild(layer);
    return true;
  }

});