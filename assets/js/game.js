var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue,
    textStyle_Key, textStyle_Value;


var Game = {

  preload: function(){
    game.load.image('snake',"./assets/images/snake.png");
    game.load.image('apple',"./assets/images/apple.png");
  },

  create: function(){
    snake = [];
    apple = {};
    squareSize = 15;
    updateDelay = 0;
    direction = 'right';
    new_direction = null;

    cursors = game.input.keyboard.createCursorKeys();

    game.stage.backgroundColor = '#061f27';

    this.generateApple();

    for (var i = 0; i < 10; i++)
    {
      snake[i] = this.add.sprite((i*squareSize)+150,150,'snake');
    }

  },

  update: function(){

    updateDelay++;

    if(updateDelay >= 10)
    {
      updateDelay = 0;
      var firstCell = snake[snake.length - 1];
      var lastCell = snake.shift();
      var oldX = lastCell.x;
      var oldY = lastCell.Y;

      if(direction == 'right')
      {
        lastCell.x = firstCell.x +15;
        lastCell.y = firstCell.y;
      }
      else if(direction == 'left')
      {
        lastCell.x = firstCell.x - 15;
        lastCell.y = firstCell.y;
      }
      else if(direction == 'up')
      {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y -15;
      }
      else if(direction == 'down')
      {
        lastCell.x = firstCell.x;
        lastCell.y = firstCell.y + 15;
      }

      if(lastCell.x <= 0 || lastCell.x >= 600 || lastCell.y <= 0 || lastCell.y >= 450)
      {
        game.state.start('Game_over');
      }

      for (var i = 1; i < snake.length; i++) {
          if(snake[i].x === lastCell.x && snake[i].y === lastCell.y)
          {
            game.state.start('Game_over');
          }
      }

      if(lastCell.x == apple.x && lastCell.y === apple.y){
        apple.destroy();
        snake.unshift(game.add.sprite(oldX,oldY,'snake'));

        this.generateApple();
      }

      snake.push(lastCell);
    }



    if (cursors.up.isDown) {
      if(direction !== 'down'){
        direction = 'up';
      }
    }
    else if (cursors.down.isDown) {
      if(direction !== 'up'){
        direction = 'down';
      }
    }
    else if (cursors.left.isDown) {
      if(direction !== 'right'){
        direction = 'left';
      }
    }
    else if (cursors.right.isDown) {
      if(direction !== 'left'){
        direction = 'right';
      }
    }

    game.debug.text( direction, 100, 380 );
  },

  generateApple: function(){
    var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        // Add a new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
  },


  render: function(){

  }
};
