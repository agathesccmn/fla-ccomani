document.addEventListener('DOMContentLoaded', () => {
   
   const bird = document.querySelector('.bird')
   const gameContainer = document.querySelector('.game-container')
   const ground = document.querySelector('.ground')
  
   let birdLeft = 220
   let birdBottom = 100
   let gravity = 2
   let isGameOver = false
   let gap = 430

   function startGame() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + 'px'
      bird.style.left = birdLeft + 'px'
      bird.style.transform = "rotate(0deg)" 
      
   }
   let gameTimerId = setInterval(startGame, 20)

   function control(e) {
      if (e.keyCode === 32) { 
         jump()
      }
   }

   function jump() {
      if (birdBottom < 450) {
         birdBottom += 50
         bird.style.bottom = birdBottom + 'px'
      }
   }
   document.addEventListener('keyup', control)

 
   function generateObstacle() {
      let obstacleLeft = 500
      let randomHeight = Math.random() * 100 
      let obstacleBottom = randomHeight
      const obstacle = document.createElement('div')
      const topObstacle = document.createElement('div')
      if (!isGameOver) {
         obstacle.classList.add('obstacle')
         topObstacle.classList.add('topObstacle')
      }
      gameContainer.appendChild(obstacle)
      gameContainer.appendChild(topObstacle)
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      obstacle.style.bottom = obstacleBottom + 'px'
      topObstacle.style.bottom = obstacleBottom + gap + 'px'

      function moveObstacle() {
         obstacleLeft -=2
         obstacle.style.left = obstacleLeft + 'px'
         topObstacle.style.left = obstacleLeft + 'px'

         if (obstacleLeft === -60) {
            clearInterval(timerId) //en gros si obstacle va tout à gauche l'interval s'arrête + il disparait 
            gameContainer.removeChild(obstacle)
            gameContainer.removeChild(topObstacle)
         }

         if (
            obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&  
            (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) ||
            birdBottom === 0
           
            ) {
            gameOver()
            clearInterval(timerId) //stop l'obstacle quand collision avec bird 
         }

      }

      let timerId = setInterval(moveObstacle, 20)
      if (!isGameOver) setTimeout(generateObstacle, 3000)
   }
   generateObstacle()


   function gameOver() {
      clearInterval(gameTimerId)
      console.log('game over')  
      isGameOver = true
      document.removeEventListener('keyup', control)

   }



})


