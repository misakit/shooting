enchant();

// 移動速度
var SPEED = 1;
var shot_count = 4;

window.onload = function() {
  game = new Game(320, 320);
  game.fps = 24;
  game.preload('map0.png', 'graphic.png', 'effect0.gif', 'pad.png');

  game.score = 0;

  game.keybind(90, 'z'); //zキー
  game.keybind(88, 'x'); //xキー

  game.onload = function() {
    map = new Map(16, 16);
    map.image = game.assets['map0.png'];
    map.loadData(
      [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]
    );
    game.rootScene.addChild(map);

    player = new Player(140, 10);

    var sprite  = new Sprite(100, 100);	// スプライト生成
    var surface = new Surface(100, 100);	// サーフェス生成

    // canvas 描画
    // 円塗りつぶし描画
    surface.context.beginPath();
    surface.context.arc(50, 50, 45, 0, Math.PI*2, false);
    surface.context.fillStyle = "white";
    surface.context.fill();

    // 円ストローク描画
    surface.context.beginPath();
    surface.context.arc(50, 50, 45, 0, Math.PI*2, false);
    surface.context.strokeStyle = "gray";
    surface.context.lineWidth = 2;
    surface.context.stroke();

    sprite.image = surface;	// サーフェスを画像としてセット
    sprite.moveTo(200, 200);
    game.rootScene.addChild(sprite);

    sprite.ontouchstart = function() {
      //alert(1);
      if (shot_count > 0) {
        var s = new PlayerShoot(player.x, player.y);
        shot_count--;
        console.log(shot_count);
      }
    };

    pad = new Pad();
    pad.moveTo(10,200);
    game.rootScene.addChild(pad);

    enemies = new Array();
    itemenemies = new Array();

    scoreLabel = new ScoreLabel(8, 170);
    game.rootScene.addChild(scoreLabel);

    // Executed every other frame
    game.rootScene.addEventListener("enterframe", function(e){
      if (rand(100) < 5 && game.frame % 3 == 0) {
        var y = rand(140);
        var enemy = new Enemy(320, y, 0.1);
        enemy.key = game.frame;
        enemies[game.frame] = enemy;
        console.log("this is enemy.");
      } else if (rand(100) < 5 && game.frame % 7 == 0) {
        var y = rand(100);
        while (y < 30) {
          y = rand(100);
        }
        var itemenemy = new ItemEnemy(320, y, 0.1);
        itemenemy.key = game.frame;
        itemenemies[game.frame] = itemenemy;
      }
      scoreLabel.score = game.score;
    });

  };
  game.start();
};

/**
 * Sprite クラスを継承して, Player クラスを作成する。
 * enchant.Class.create の第一引数に継承元のクラスを指定し、
 * 第二引数にオブジェクトとして、追加・オーバーライドしたいメソッドやプロパティを指定する。
 * ここでは、コンストラクタのみをオーバーライドしている。
 */
var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function (x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets['graphic.png'];
    this.x = x;
    this.y = y;
    this.frame = 0;

    this.onenterframe = function() {
      var input = game.input;
      if (input.left)  { this.x -= SPEED; }
      if (input.right) { this.x += SPEED; }
      if (input.z || input.x)  {
        if (game.frame % 3 == 0 && shot_count > 0) {
          var s = new PlayerShoot(this.x, this.y);
          shot_count--;
          console.log(shot_count);
        }
      }
      /*
      if (input.down)  {
        if (game.frame % 3 == 0 && shot_count > 0) {
          var s = new PlayerShoot(this.x, this.y);
          shot_count--;
          console.log(shot_count);
        }
      }
      */
    };

    game.rootScene.addChild(this);
  }
});

/**
 * Succeeds Sprite class, creates bullet class.
 * Usage is indirect, succeeding PlayerShoot, EnemyShoot.
 * Spriteクラスを継承して、弾クラスを生成する。
 * 直接は使わず、PlayerShoot、EnemyShootから継承して利用する
 */
 
var Shoot = enchant.Class.create(enchant.Sprite, {
  initialize: function (x, y, direction) {
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets['graphic.png'];
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moveSpeed = 2;

    this.addEventListener('enterframe', function () {
      this.x += this.moveSpeed * Math.cos(this.direction);
      this.y += this.moveSpeed * Math.sin(this.direction);
      //if(this.y > 160 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
      if(this.x < -this.width || this.y < -this.height) {
        this.remove();
      } else if (this.y > 140 || this.x > 320 ) {
        this.remove();
        shot_count++;
        console.log(shot_count);
      }
    });

    game.rootScene.addChild(this);
  },
  remove: function () {
    game.rootScene.removeChild(this);
    delete this;
  }
});

/**
 * PlayerShoot (self shooting) class. Created and succeeds Shoot class.
 * PlayerShoot (自弾) クラス。Shootクラスを継承して作成する。
 */

var PlayerShoot = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, Math.PI/2);
    this.frame = 12;
    this.addEventListener('enterframe', function () {
      for (var i in enemies) {
        if(enemies[i].intersect(this)) {
          this.remove();
          enemies[i].remove();
          game.score += 100;
          shot_count++;
          console.log(shot_count);
        }
      }
      for (var i in itemenemies) {
        if(itemenemies[i].intersect(this)) {
          this.remove();
          itemenemies[i].remove();
          var item = new ItemShoot(this.x, this.y);
          game.score += 10;
          shot_count++;
          console.log(shot_count);
        }
      }
    });
  }
});

var Enemy = enchant.Class.create(enchant.Sprite, {
  /**
   * Enemy class constructor. Used to create enemy object.
   * Unlike Player, it moves self-sufficiently, requiring necessary programming.
   * In constructor, in addition to initial postion (x, y), the directional movement angle omega is set.
   * Enemy クラスのコンストラクタ。敵機のオブジェクトを生成するために用いる。
   * Player と異なり自律して動くため、そのための処理が追加されている。
   * コンストラクタには初期位置 (x, y) のほか、移動方向の角速度 omega を指定する。
   */
  initialize: function (x, y, omega) {
    /**
     * As with the Player class, you set size at 16x16 Sprite base and expand.
     * Playerクラスと同じく 大きさ 16x16 のSpriteをベースとして拡張していく。
     */
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets['graphic.png'];
    this.x = x;
    this.y = y;
    this.frame = 3;

    this.omega = omega;

    /**
     * Set movement angle and movement speed (pixels per frame).
     * Here rotation angle (for circles, this is 360°) is used.
     * 移動方向と、移動速度(ピクセル毎フレーム)を指定する。
     * ここでは度数法 (円周を360°とする) を用いる。
     */
    this.direction = 0;
    this.moveSpeed = 3;

    //this.tl.moveBy(-30, 30, 30).moveBy(-30, -30, 30).loop();
    /**
     * ets processing executed each time enemy object is drawn.
     * One frame moves, and if drawn within the parameters of the image this.remove(); is used and image is removed from drawing tree.
     * 敵機が描画されるごとに実行する処理を指定する。
     * 1フレームぶん移動し、画面に描画される範囲外であれば this.remove(); を実行し、描画ツリーから除く。
     */
    this.addEventListener('enterframe', function () {
      this.move();

      if(this.y > 140 || this.y < 30 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        this.remove();
      } else if(rand(100) < 5) {
        var s = new EnemyShoot(this.x, this.y);
      }
    });
    /**
     * Normally addChild is performed in Group or Scene from outside constructor,
     * but here this process is performed within constructor.
     * 通常はコンストラクタの外から、Group や Scene に addChild するが、
     * ここではコンストラクタの中でこの処理を行っている。
     */
    game.rootScene.addChild(this);
  },
  /**
   * Sets function called up for movement.
   * By overriding from outside this function, you can change movement partway through.
   * 移動のために呼ばれる関数を指定する。
   * この関数を外からオーバーライドすることによって、途中で動きを変えたりすることができる。
   */
  move: function () {
    /**
     * You change the movement direction angle only, and move only by that amount.
     * In the initialization settings smooth rotation occurs.
     * 移動方向を角速度ぶんだけ変化させ、移動方向に速度ぶんだけ移動する。
     * 初期設定ではゆるやかな回転運動となる。
     */
    this.direction += this.omega;
    this.x -= this.moveSpeed * Math.cos(this.direction / 180 * Math.PI);
    this.y += this.moveSpeed * Math.sin(this.direction / 180 * Math.PI);
  },
  remove: function () {
    game.rootScene.removeChild(this);
    delete enemies[this.key];
  }
});

var ItemEnemy = enchant.Class.create(enchant.Sprite, {
  initialize: function (x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets['graphic.png'];
    this.x = x;
    this.y = y;
    this.frame = 4;

    this.direction = 0;
    this.moveSpeed = 2;

    this.tl.moveBy(-30, 30, 30).moveBy(-30, -30, 30).loop();

    this.addEventListener('enterframe', function () {
      if(this.y > 140 || this.y < 30 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        this.remove();
      }
    });
    game.rootScene.addChild(this);
  },

  remove: function () {
    game.rootScene.removeChild(this);
    delete itemenemies[this.key];
  }
});

var EnemyShoot = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    this.frame = 13;
    this.addEventListener('enterframe', function () {
      if(player.within(this, 8)) {
        var bomb = new Sprite(16, 16);
        bomb.image = game.assets['effect0.gif'];
        game.rootScene.addChild(bomb);
        bomb.frame = 0;
        bomb.moveTo(player.x, player.y);
        game.end(game.score, "SCORE: " + game.score)
      }
    });
  }
});
var ItemShoot = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    this.frame = 9;
    this.addEventListener('enterframe', function () {
      if(player.within(this, 8)) {
        this.remove();
        SPEED += 0.5;
        console.log("SPEED = " + SPEED);
      }
    });
  },
  remove: function () {
    game.rootScene.removeChild(this);
    //delete enemies[this.key];
  }
});