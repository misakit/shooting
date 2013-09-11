enchant();

var SPEED = 1;
var SHOOT_MAX = 4;
var ENEMY_COUNTER = 0;
var ITEM_ENEMY_COUNTER = 0;

window.onload = function() {
  game = new Game(320, 320);
  game.fps = 24;
  game.preload('map0.png', 'graphic.png', 'icon0.png', 'effect0.gif', 'pad.png');

  game.score = 0;

  game.keybind(90, 'z');
  game.keybind(88, 'x');

  game.onload = function() {
    map = new Map(16, 16);
    map.image = game.assets['map0.png'];
    map.loadData(
      [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
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
      if (SHOOT_MAX > 0) {
        var s = new PlayerShoot(player.x, player.y);
        SHOOT_MAX--;
        console.log(SHOOT_MAX);
      }
    };

    pad = new Pad();
    pad.moveTo(30,200);
    pad.scaleX = 1.5;
    pad.scaleY = 1.5;
    game.rootScene.addChild(pad);

    enemies = new Array();
    itemenemies = new Array();

    scoreLabel = new ScoreLabel(8, 165);
    game.rootScene.addChild(scoreLabel);

    // Executed every other frame
    game.rootScene.addEventListener("enterframe", function(e){
      // enemy 出現率
      if (rand(10) < 5) {
        var x = 0;
      } else {
        var x = 320;
      }
      switch (ENEMY_COUNTER) {
        case 0:
          if (rand(10) < 8 && game.frame % 7 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var enemy = new Enemy(x, y, 0);
            enemy.key = game.frame;
            enemies[game.frame] = enemy;
            ENEMY_COUNTER++;
          }
          break;
        case 1:
          if (rand(10) < 8 && game.frame % 7 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var enemy = new Enemy(x, y, 0);
            enemy.key = game.frame;
            enemies[game.frame] = enemy;
            ENEMY_COUNTER++;
          }
          break;
        case 2:
          if (rand(10) < 5 && game.frame % 7 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var enemy = new Enemy(x, y, 0);
            enemy.key = game.frame;
            enemies[game.frame] = enemy;
            ENEMY_COUNTER++;
          }
          break;
        case 3:
          if (rand(10) < 5 && game.frame % 7 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var enemy = new Enemy(x, y, 0);
            enemy.key = game.frame;
            enemies[game.frame] = enemy;
            ENEMY_COUNTER++;
          }
          break;
        case 4:
          if (rand(10) < 2 && game.frame % 7 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var enemy = new Enemy(x, y, 0);
            enemy.key = game.frame;
            enemies[game.frame] = enemy;
            ENEMY_COUNTER++;
          }
          break;
        default:
          console.log("ENEMY_COUNTER = " + ENEMY_COUNTER);
          break;
      }
      switch (ITEM_ENEMY_COUNTER) {
        case 0:
          if (rand(10) < 1 && game.frame % 10 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var itemenemy = new ItemEnemy(x, y, 0);
            itemenemy.key = game.frame;
            itemenemies[game.frame] = itemenemy;
            ITEM_ENEMY_COUNTER++;
          }
          break;
        case 1:
          if (rand(10) < 1 && game.frame % 10 == 0) {
            var y = rand(120);
            while (y < 30) {
              y = rand(120);
            }
            var itemenemy = new ItemEnemy(x, y, 0);
            itemenemy.key = game.frame;
            itemenemies[game.frame] = itemenemy;
            ITEM_ENEMY_COUNTER++;
          }
          break;
        default :
          console.log("ITEM_ENEMY_COUNTER = " + ITEM_ENEMY_COUNTER)
          break;
      }
      /*
      if (rand(100) < 5 && game.frame % 3 == 0) {
        var y = rand(120);
        while (y < 30) {
          y = rand(120);
        }
        var enemy = new Enemy(320, y, 0);
        enemy.key = game.frame;
        enemies[game.frame] = enemy;
      } else if (rand(100) < 5 && game.frame % 7 == 0) {
        var y = rand(100);
        while (y < 30) {
          y = rand(100);
        }
        var itemenemy = new ItemEnemy(320, y, 0);
        itemenemy.key = game.frame;
        itemenemies[game.frame] = itemenemy;
      }
      */
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
    this.MOVE_RANGE_X = game.width - this.width;

    this.onenterframe = function() {
      var input = game.input;
      if (input.left)  {
        this.scaleX = - 1; // 左右を反転させる
        this.scaleY = 1;
        if (this.x < 0) {
          this.x  = 0;
        } else {
          this.x -= SPEED;
        }
      }
      if (input.right) {
        this.scaleX = 1; // 左右を反転させる
        this.scaleY = 1;
        if (this.x > this.MOVE_RANGE_X) {
          this.x  = this.MOVE_RANGE_X;
        } else {
          this.x += SPEED;
        }      }
      if (input.z || input.x)  {
        if (game.frame % 3 == 0 && SHOOT_MAX > 0) {
          var s = new PlayerShoot(this.x, this.y);
          SHOOT_MAX--;
          console.log(SHOOT_MAX);
        }
      }
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
        SHOOT_MAX++;
        console.log(SHOOT_MAX);
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
        //if(enemies[i].intersect(this)) {
        if(enemies[i].within(this, 10)) {
          var burst = new Burst(enemies[i].x, enemies[i].y);
          this.remove();
          enemies[i].remove();
          burst.animation();
          game.score += 100;
          SHOOT_MAX++;
        }
      }
      for (var i in itemenemies) {
        if(itemenemies[i].within(this, 10)) {
          var burst = new Burst(itemenemies[i].x, itemenemies[i].y);
          this.remove();
          itemenemies[i].remove();
          burst.animation();
          if (rand(100) > 70) {
            var speedUpItem = new SpeedUpItem(this.x, this.y);
          } else if (rand(100) < 30) {
            var speedDownItem = new SpeedDownItem(this.x, this.y);
          } else {
            var shootMaxUpItem = new ShootMaxUpItem(this.x, this.y);
          }
          game.score += 10;
          SHOOT_MAX++;
          console.log(SHOOT_MAX);
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
    if (x == 0) {this.goRightFlag = true;}

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
      } else if(rand(100) < 2) {
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
    if (this.goRightFlag == true) {
      this.x += this.moveSpeed * Math.cos(this.direction / 180 * Math.PI);
    } else {
      this.x -= this.moveSpeed * Math.cos(this.direction / 180 * Math.PI);
    }
    this.y += this.moveSpeed * Math.sin(this.direction / 180 * Math.PI);
  },
  remove: function () {
    game.rootScene.removeChild(this);
    delete enemies[this.key];
    ENEMY_COUNTER--;
  }
});

var ItemEnemy = enchant.Class.create(enchant.Sprite, {
  initialize: function (x, y) {
    enchant.Sprite.call(this, 16, 16);
    this.image = game.assets['graphic.png'];
    this.x = x;
    this.y = y;
    this.frame = 4;
    if (x == 0) {this.goRightFlag = true;}

    this.direction = 0;
    this.moveSpeed = 2;

    if (this.goRightFlag == true) {
      this.tl.moveBy(30, 30, 30).moveBy(30, -30, 30).loop();
    } else {
      this.tl.moveBy(-30, 30, 30).moveBy(-30, -30, 30).loop();
    }

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
    ITEM_ENEMY_COUNTER--;
  }
});

var EnemyShoot = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    //this.direction = Math.PI + Math.atan2((this.y - player.y), (this.x - player.x));
    this.frame = 13;
    this.addEventListener('enterframe', function () {
      //console.log("Shoot x = " + this.x + "; Shoot y = " + this.y);
      //console.log("Player x = " + player.x + "; Player y = " + player.y);
      //console.log("rad = " + Math.atan2((this.y - player.y), (this.x - player.x)));
      if(player.within(this, 8)) {
        var burst = new Burst(player.x, player.y);
        game.rootScene.removeChild(player);
        burst.end();
      }
    });
  }
});

var SpeedUpItem = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    this.image = game.assets['icon0.png'];
    this.frame = 65;
    this.moveSpeed = 1;

    this.addEventListener('enterframe', function () {
      if(player.within(this, 6)) {
        this.remove();
        msg = new Label("SPEED UP!");
        msg.color = "white";
        msg.x = 130;
        msg.y = 140;
        game.rootScene.addChild(msg);
        msg.tl.fadeOut(30).then(function () {
          game.rootScene.removeChild(msg);
        });
        SPEED += 0.5;
        console.log("SPEED = " + SPEED);
      }
      if (this.y == 10) {
        var me = this;
        this.moveSpeed = 0;
        this.tl.delay(60).fadeOut(30).then(function () {
          me.remove();
        });
      }
    });
  },
  remove: function () {
    game.rootScene.removeChild(this);
  }
});

var SpeedDownItem = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    this.image = game.assets['icon0.png'];
    this.frame = 66;
    this.moveSpeed = 1;

    this.addEventListener('enterframe', function () {
      if(player.within(this, 6)) {
        this.remove();
        msg = new Label("SPEED DOWN!");
        msg.color = "white";
        msg.x = 130;
        msg.y = 140;
        game.rootScene.addChild(msg);
        msg.tl.fadeOut(30).then(function () {
          game.rootScene.removeChild(msg);
        });
        if (SPEED > 0.5) {
          SPEED -= 0.5;
          console.log(SPEED);
        } else {
          console.log(SPEED);
        }
        console.log("SPEED = " + SPEED);
      }
      if (this.y == 10) {
        var me = this;
        this.moveSpeed = 0;
        this.tl.delay(60).fadeOut(30).then(function () {
          me.remove();
        });
      }
    });
  },
  remove: function () {
    game.rootScene.removeChild(this);
  }
});

var ShootMaxUpItem = enchant.Class.create(Shoot, {
  initialize: function (x, y) {
    Shoot.call(this, x, y, (Math.PI/2)*3);
    this.image = game.assets['icon0.png'];
    this.frame = 12;
    this.moveSpeed = 1;

    this.addEventListener('enterframe', function () {
      if(player.within(this, 6)) {
        this.remove();
        msg = new Label("SHOOT MAX UP!");
        msg.color = "white";
        msg.x = 130;
        msg.y = 140;
        game.rootScene.addChild(msg);
        msg.tl.fadeOut(30).then(function () {
          game.rootScene.removeChild(msg);
        });
        if (SHOOT_MAX < 10) {
          SHOOT_MAX += 1;
        }
      }
      if (this.y == 10) {
        var me = this;
        this.moveSpeed = 0;
        this.tl.delay(60).fadeOut(30).then(function () {
          me.remove();
        });
      }
    });
  },
  remove: function () {
    game.rootScene.removeChild(this);
  }
});

var Burst = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, remove) {
    enchant.Sprite.call(this, 16, 16);
    this.x = x;
    this.y = y;
    this.image = game.assets['effect0.gif'];
    this.frame = 0;
    game.rootScene.addChild(this);
  },
  animation: function() {
    this.tl.cue({
      0:function(){this.frame++;},
      5:function(){this.frame++;},
      10:function(){this.frame++;},
      15:function(){this.frame++;},
      18: function(){game.rootScene.removeChild(this)}
    });
  },
  end: function() {
    this.tl.cue({
      0:function(){this.frame++;},
      5:function(){this.frame++;},
      10:function(){this.frame++;},
      15:function(){this.frame++;},
      25:function(){
        scoreLabel.y = 250;
        game.end(game.score, "SCORE: " + game.score);
      }
    });
  }
});