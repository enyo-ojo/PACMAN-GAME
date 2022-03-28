const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0

// 28/28 =  784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

//create board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {

        //create square
        const square = document.createElement('div')
            //put square in grid
        grid.appendChild(square)
            //put square in an array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dots')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghostlair')

        } else if (layout[i] === 3) {
            squares[i].classList.add('powerpellet')
        }
    }
}
createBoard()

//start position of pacman
let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')


function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')

    switch (e.keyCode) {
        case 40:
            console.log('pressed down')
            if (
                //prevent pacman from going into a wall
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                //prevent pacman from going into a ghostlair
                !squares[pacmanCurrentIndex + width].classList.contains('ghostlair') &&
                pacmanCurrentIndex + width < width * width)
                pacmanCurrentIndex += width
            break
        case 38:
            console.log('pressed up')
            if ( //prevent pacman from going into a wall
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                //prevent pacman from going into a ghostlair
                !squares[pacmanCurrentIndex - width].classList.contains('ghostlair') &&
                pacmanCurrentIndex - width >= 0)
                pacmanCurrentIndex -= width
            break
        case 37:
            console.log('pressed left')
            if ( //prevent pacman from going into a wall
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                //prevent pacman from going into a ghostlair
                !squares[pacmanCurrentIndex - 1].classList.contains('ghostlair') &&
                pacmanCurrentIndex % width !== 0)
                pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
        case 39:
            console.log('pressed right')
            if ( //prevent pacman from going into a wall
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                //prevent pacman from going into a ghostlair
                !squares[pacmanCurrentIndex + 1].classList.contains('ghostlair') &&
                pacmanCurrentIndex % width < width - 1)
                pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacdotEaten()
    powerPelletEaten()
    checkForWin()
    gameOver()
}
document.addEventListener('keyup', control)

function pacdotEaten(params) {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dots')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dots')
        score++
        scoreDisplay.innerHTML = score

    }
}

function powerPelletEaten(params) {
    //check if pacman contain pellet
    if (squares[pacmanCurrentIndex].classList.contains('powerpellet')) {
        squares[pacmanCurrentIndex].classList.remove('powerpellet')
            //add a score of 10
        score += 10
            //change ghost to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
            // use timeout to unscare ghost after 10s
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts(params) {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//creating ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}


const ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]
    //showing ghosts on grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
});


//move ghosts

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    console.log('ghost moved')
    const directions = [+1, -1, +width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    console.log(direction)

    ghost.timerId = setInterval(function() {
        //prevent the ghost from running into walls
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            //remove ghost class
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scaredGhost')
                //add direction to current index
            ghost.currentIndex += direction
                //add class back
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scaredGhost')
        }

        //eating the scared ghosts
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {

            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scaredGhost')

            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex

            //add a score of 100
            score += 100

            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
            squares[ghost.currentIndex + direction].classList.add(ghost.className, 'ghost')

        }
        gameOver()

    }, ghost.speed)
}

function gameOver(params) {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scaredGhost')) {

        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
            //remove eventlistener from our control function
        document.removeEventListener('keyup', control)
            //tell user the game is over
        console.log('Game Over')
        scoreDisplay.innerHTML = ' GAME OVER '
    }
}

function checkForWin() {
    if (score === 1000) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
            //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
            //tell our user we have won
        console.log('YOU WIN')
        scoreDisplay.innerHTML = 'YOU WON!'
    }
}