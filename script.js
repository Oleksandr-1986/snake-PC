const restart = document.querySelector('#restart');

restart.addEventListener('click', () =>{

	restart.style.display = "none";
	game();
})

function game(){

	const canvas = document.querySelector('#snake');

	if(canvas.getContext){

		const ctx = canvas.getContext('2d');
		const scale = 20;
		const rows = canvas.height / scale;
		const columns = canvas.height / scale;



		let snake = new Snake();
		let smile = new Smile();
		let score = 0;
		let point = new Point();
		let fruit = new Fruit();
		let color;
		let count = 0;
		

		function update(){

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if(fruit.y <= scale){
				fruit.changeLocation();
			}
			smile.drawHappy();
			point.draw();
			snake.changeDirection();
			if(count == true){
				smile.drawUnhappy();
				clearInterval(int); 
	         restart.style.display = 'block';
			}
			
			fruit.draw();
			snake.move();
			snake.draw();
			snake.eatTail();

			if(snake.eatFruit(fruit)){
	        
	        fruit.changeLocation();
	        fruit.changeColor();
	        
	      }

		}

		document.addEventListener('keydown', direction);

	   let dir;

	   function direction(e) {

	      if (e.keyCode == 37 && dir != 'right') {
	         dir = 'left';
	      } else if (e.keyCode == 38 && dir != 'down') {
	         dir = 'up';
	      } else if (e.keyCode == 39 && dir != 'left') {
	         dir = 'right';
	      } else if (e.keyCode == 40 && dir != 'up') {
	         dir = 'down';
	      }   	
	   };

		let int = window.setInterval(update, 100);

		function Snake(){

			this.x = (rows / 2) * scale;
			this.y = (columns / 2) * scale;
			this.speedX = 0;
			this.speedY = 0;
			this.tail =[]; 

			this.draw = () => {


	        for( let i = 0; i < this.tail.length; i++){
	          
	          if(i != 0){
	            
		          ctx.fillStyle ='#046d0d';
		          ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
		          ctx.fillStyle = 'black';
		          ctx.fillRect(this.tail[i].x + scale / 4, this.tail[i].y + scale / 4, scale / 2, scale / 2);
	            
	          }
	          else{
	            
	            ctx.fillStyle ='#f70909';
	            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
	            
	          }

	        }

				ctx.beginPath();
				if (dir === 'left') {
					ctx.moveTo(this.x + scale, this.y);
					ctx.quadraticCurveTo( this.x,this.y + scale/2, this.x + scale, this.y + scale);
				}
				else if (dir === 'up') {
					ctx.moveTo(this.x, this.y + scale);
					ctx.quadraticCurveTo( this.x + scale/2, this.y, this.x + scale, this.y + scale);
				}
				else if (dir === 'down') {
					ctx.moveTo(this.x, this.y);
					ctx.quadraticCurveTo( this.x + scale/2, this.y + scale, this.x + scale, this.y);
				}
				else {
					ctx.moveTo(this.x, this.y);
					ctx.quadraticCurveTo( this.x + scale,this.y+scale/2, this.x, this.y + scale);
				}
				ctx.closePath();
				ctx.fillStyle = "black";
				ctx.fill();
			}

			this.move = () => {

			  for( let i = 0; i < this.tail.length - 1; i++){
	          this.tail[i] = this.tail[i + 1];
	        }
	        
	        this.tail[score-1] = {x:this.x, y:this.y};

				this.x += this.speedX;
				this.y += this.speedY;

				if(this.x > canvas.width){
					this.x = 0;
				}
				if(this.y > canvas.height){
					this.y = 0;
				}
				if(this.x < 0 - scale){
					this.x = canvas.width ;
				}
				if(this.y < - scale){
					this.y = canvas.height;
				}

			}

			this.changeDirection = () =>{

				if(dir == 'right' && this.y >= 0 && this.y < canvas.height){

					this.speedX = scale;
					this.speedY = 0;
				}
				if(dir == 'left' && this.y >= 0 && this.y < canvas.height){

					this.speedX = -scale;
					this.speedY = 0;
				}
				if(dir == 'up' && this.x >= 0 && this.x < canvas.width){

					this.speedX = 0;
					this.speedY = -scale ;
				}
				if(dir == 'down' && this.x >= 0 && this.x < canvas.width){

					this.speedX = 0;
					this.speedY = scale;
				}

			}

			this.eatFruit = function(fruit){
	        
	        if(this.x === fruit.x && this.y === fruit.y){
	          
	          score++;   
	          return true;
	          
	        }else{
	          
	          return false;
	          
	        }
	      }

	       this.eatTail = function(){
	      
	        for( let i = 0; i < this.tail.length; i++){
	          
	          if(this.x === this.tail[i].x && this.y === this.tail[i].y){

	           count++;

	          }     
	          
	        } 
	        
	      }

		}

		function Fruit(){

			this.x =scale
	      this.y=scale

			this.changeLocation = () =>{

				this.x =(Math.floor(Math.random() * columns - 1) + 1) * scale;
	         this.y =(Math.floor(Math.random() * rows - 1) + 1) * scale;

	      }

	       this.changeColor = () =>{
	        
	        color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
	        return  color;
	        
	      } 

	      this.draw = () =>{

	      	ctx.beginPath();
	      	ctx.moveTo(this.x + scale/2 , this.y + scale *0.8);
			   ctx.quadraticCurveTo( this.x + scale*0.45,this.y + scale, this.x + scale*0.3, this.y + scale);   
			   ctx.quadraticCurveTo( this.x + scale*0.15,this.y + scale, this.x, this.y + scale/2);
			   ctx.quadraticCurveTo( this.x ,this.y, this.x + scale*0.35, this.y); 
			   ctx.quadraticCurveTo( this.x + scale * 0.45 ,this.y, this.x + scale * 0.5, this.y + scale * 0.1);
			   ctx.quadraticCurveTo( this.x + scale * 0.55 ,this.y, this.x + scale * 0.65, this.y);
			   ctx.quadraticCurveTo( this.x + scale ,this.y, this.x + scale, this.y + scale * 0.5);
			   ctx.quadraticCurveTo( this.x + scale*0.85 ,this.y + scale, this.x + scale*0.75, this.y +scale); 
			   ctx.quadraticCurveTo( this.x + scale*0.55,this.y + scale,this.x + scale/2 , this.y + scale *0.8);         
			   ctx.lineWidth = 1;
				ctx.fillStyle = `${color}`;
				ctx.fill();

				ctx.beginPath()

				ctx.moveTo(this.x + scale/2 , this.y + scale *0.1);
				ctx.quadraticCurveTo( this.x + scale*0.5,this.y - scale*0.45, this.x + scale,this.y - scale*0.3);
				ctx.quadraticCurveTo( this.x + scale*0.75,this.y - scale*0.05, this.x + scale/2 , this.y - scale *0.1);
				ctx.fillStyle = "green";
				ctx.fill();

	      }

		}

		function Smile(){

			this.drawHappy = () =>{

				ctx.beginPath();
				ctx.arc(300, 300, 200, 0, Math.PI * 2, true);
				ctx.fillStyle = "yellow";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(300, 300, 140, 0, Math.PI, false);
				ctx.lineWidth = 10;
				ctx.lineCap = "round";
				ctx.strokeStyle = "#000";
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(240, 260, 20, 0, Math.PI * 2, true);
				ctx.fillStyle = "#000";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(360, 260, 20, 0, Math.PI * 2, true);
				ctx.fillStyle = "#000";
				ctx.fill();
			}

			this.drawUnhappy = () =>{

				ctx.beginPath();
				ctx.arc(300, 300, 200, 0, Math.PI * 2, true);
				ctx.fillStyle = "yellow";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(300, 480, 140, Math.PI/180 *-30, Math.PI/180 * -150, true);
				ctx.lineWidth = 10;
				ctx.lineCap = "round";
				ctx.strokeStyle = "#000";
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(240, 260, 20, 0, Math.PI * 2, true);
				ctx.fillStyle = "#000";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(360, 260, 20, 0, Math.PI * 2, true);
				ctx.fillStyle = "#000";
				ctx.fill();
				
			}	
		}
		function Point(){

			this.draw = () => {
				ctx.fillStyle = 'white';
	      	ctx.font = '30px  Arial';
				ctx.fillText("score: " + score, scale * 21, scale * 2);

			}
		}

	}
	
}
game();