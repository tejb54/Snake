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
    score = 0;

    scoreTextValue = game.add.text(10,10, "Score: " + score,{font: "24px Arial",
      fill: "#00c4ff",
      align: "center"
    });


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

    if (cursors.up.isDown) {
      if(direction !== 'down'){
        new_direction = 'up';
      }
    }
    else if (cursors.down.isDown) {
      if(direction !== 'up'){
        new_direction = 'down';
      }
    }
    else if (cursors.left.isDown) {
      if(direction !== 'right'){
        new_direction = 'left';
      }
    }
    else if (cursors.right.isDown) {
      if(direction !== 'left'){
        new_direction = 'right';
      }
    }

    if(updateDelay >= 10)
    {
      updateDelay = 0;

      if(new_direction)
      {
        direction = new_direction;
        new_direction = null;
      }


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


      firstCell = lastCell
      snake.push(firstCell);



      //collision stuff
      if(firstCell.x < 0 || firstCell.x > 600 || firstCell.y < 0 || firstCell.y > 450)
      {
        game.state.start('Game_over');
      }

      for (var i = 0; i < snake.length-1; i++) {
          if(snake[i].x === firstCell.x && snake[i].y === firstCell.y)
          {
            game.state.start('Game_over');
          }
      }

      if(firstCell.x === apple.x && firstCell.y === apple.y){
        addNew = true;
        score++;
        scoreTextValue.setText("Score: " + score);

        apple.destroy();
        this.generateApple();
      }
    }
    if(addNew)
    {
      snake.unshift(game.add.sprite(oldX,oldY,'snake'));
      addNew = false;
    }
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
