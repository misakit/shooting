enchant();

// 移動速度
var SPEED = 2;
var rand = function(n){
  return Math.floor(Math.random() * n) + 1;
};

window.onload = function() {
  game = new Game(320, 200);
  game.fps = 24;
  game.preload('map0.png');
  game.preload('graphic.png');
  game.preload('effect0.gif');

  game.score = 0;
  game.touched = false;

  game.onload = function() {
    //game.rootScene.backgroundColor = 'black';
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
    enemies = new Array();

    /**
     * Executed every other frame
     * フレームごとに実行する
     */
    game.rootScene.addEventListener("enterframe", function(e){
      if(rand(1000) < game.frame / 20 * Math.sin(game.frame / 100) + game.frame / 20 + 50) {
        var y = rand(140);
        var omega = y < 160 ? 0.01 : -0.01;
        var enemy = new Enemy(320, y, omega);
        enemy.key = game.frame;
        enemies[game.frame] = enemy;
      }
      scoreLabel.score = game.score;
    });
    scoreLabel = new ScoreLabel(8, 170);
    game.rootScene.addChild(scoreLabel);
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
    /*
    game.rootScene.addEventListener('touchstart', function (e) {
      player.y = e.y;
      game.touched = true;
    });
    game.rootScene.addEventListener('touchmove', function (e) {
      player.y = e.y;
    });
    game.rootScene.addEventListener('touchend', function (e) {
      player.y = e.y;
      game.touched = false;
    });
    */

    this.onenterframe = function() {
      var input = game.input;
      if (input.left)  { this.x -= SPEED; }
      if (input.right) { this.x += SPEED; }
      if (input.down)  { if (game.frame % 3 == 0) {
        var s = new PlayerShoot(this.x, this.y);
      } }
    };
    game.rootScene.addChild(this);

    /*
    this.addEventListener('enterframe', function () {
      if (game.input.down && game.frame % 3 == 0) {
        var s = new PlayerShoot(this.x, this.y);
      }
      this.move();
    });
    game.rootScene.addChild(this);
  },
  move: function () {
    if (game.input.left) {
      var vx = Math.cos(Math.PI) * SPEED;
      this.x = this.x + vx;
    } else if (game.input.right) {
      var vx = Math.cos(Math.PI) * SPEED;
      this.x = this.x - vx;
    }
     */
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
      if(this.y > 160 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        this.remove();
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

    /**
     * Display enemy image.
     * You divide the graphic.png image into 16x16 lattices,
     * and start counting from 0 at the top left, and because the image you want to display is at 3, you set frame to 3.
     * 敵機の画像を表示する。
     * graphic.png の画像を 16x16 の格子で区切ると、
     * 左上を0番目として数えて、表示したい画像は3番目にあるため、frameには3を指定する。
     */
    this.frame = 3;
    /**
     * Sets rotation angle.
     * Here rotation angle (for circles, this is 360°) is used.
     * 角速度を指定する。
     * ここでは度数法 (円周を360°とする) を用いる。
     */
    this.omega = omega;

    /**
     * Set movement angle and movement speed (pixels per frame).
     * Here rotation angle (for circles, this is 360°) is used.
     * 移動方向と、移動速度(ピクセル毎フレーム)を指定する。
     * ここでは度数法 (円周を360°とする) を用いる。
     */
    this.direction = 0;
    this.moveSpeed = 3;

    /**
     * ets processing executed each time enemy object is drawn.
     * One frame moves, and if drawn within the parameters of the image this.remove(); is used and image is removed from drawing tree.
     * 敵機が描画されるごとに実行する処理を指定する。
     * 1フレームぶん移動し、画面に描画される範囲外であれば this.remove(); を実行し、描画ツリーから除く。
     */
    this.addEventListener('enterframe', function () {
      this.move();

      if(this.y > 160 || this.y < 30 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
        this.remove();
      } else if(this.age % 30 == 0) {
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
    this.y += this.moveSpeed * Math.sin(this.direction / 180 * Math.PI)
  },
  remove: function () {
    /**
     * Deletes enemy object (body) from drawing tree.
     * By this processing, the enemy object
     * will no longer be displayed anywhere, withdrawing it via GC.
     * 描画ツリーから敵機のオブジェクト(自身)を取り除く。
     * この処理により敵機オブジェクトは
     * どこからも参照されなくなるので、GCによって回収される。
     */
    game.rootScene.removeChild(this);
    delete enemies[this.key];
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