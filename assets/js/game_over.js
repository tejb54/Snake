var Game_over = {

  preload: function(){
    game.load.image('game_over',"./assets/images/gameover.png");
  },

  create: function(){
    this.add.button(0,0,'game_over',this.restartGame);
  },

  restartGame: function(){
    game.state.start('Game');
  }
};
