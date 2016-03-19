var Game2 = {

  snake2: {},
  snake3: {},

  preload: function(){
    this.snake2 = new snakeObj();
    this.snake2.preload();
  },


  create: function(){
    game.stage.backgroundColor = '#061f27';
    this.snake2.create(150,150);
  },

  update: function(){
    this.snake2.update();

  }
}
