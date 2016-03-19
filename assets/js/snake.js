function snakeObj(){

  this.snakeParts = [];
  this.direction = 'right';
  this.new_direction = null;
  this.cursors = game.input.keyboard.createCursorKeys();
  this.timer = 0;

  this.preload = function(){
    game.load.image('snakeObj',"./assets/images/snake.png");
  };

  this.create = function(x, y){
    for (var i = 0; i < 10; i++) {
      this.snakeParts[i] = game.add.sprite(x +(i*15),y,'snakeObj');
    }
  };

  this.update = function(){
    //check input
    this.checkInput();

    //timer used to slow the game down
    this.timer++;
    if(this.timer >= 10){
      this.timer = 0;

      //move the snake
      this.move();

      //check collision for this snake
      this.collision();
    }

  };

  this.checkInput = function(){


    if (this.cursors.up.isDown) {
      if(this.direction !== 'down'){
        this.new_direction = 'up';
      }
    }
    if (this.cursors.down.isDown) {
      if(this.direction !== 'up'){
        this.new_direction = 'down';
      }
    }
    if (this.cursors.left.isDown) {
      if(this.direction !== 'right'){
        this.new_direction = 'left';
      }
    }
    if (this.cursors.right.isDown) {
      if(this.direction !== 'left'){
        this.new_direction = 'right';
      }
    }
  };

  this.move = function(){

    if(this.new_direction){
      this.direction = this.new_direction;
      this.new_direction = null;
    }

    var firstCell = this.snakeParts[this.snakeParts.length -1];
    var lastCell = this.snakeParts.shift();

    if(this.direction == 'right')
    {
      lastCell.x = firstCell.x +15;
      lastCell.y = firstCell.y;
    }
    else if (this.direction == 'left') {
      lastCell.x = firstCell.x - 15;
      lastCell.y = firstCell.y;
    }
    else if (this.direction == 'up') {
      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y -15;
    }
    else if (this.direction == 'down') {
      lastCell.x = firstCell.x;
      lastCell.y = firstCell.y +15;
    }

    this.snakeParts.push(lastCell);

  };

  this.collision = function(){
    var head = this.snakeParts[this.snakeParts.length -1];

    //collision with itself
    for (var i = 0; i < this.snakeParts.length -1; i++) {
      if(head.x == this.snakeParts[i].x && head.y == this.snakeParts[i].y)
      {
        game.state.start('Game_over');
      }
    }

  };


};
