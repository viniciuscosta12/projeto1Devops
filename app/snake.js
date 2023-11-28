document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const board = document.getElementById('game-board');
    const gridSize = 20;
    const snakeSpeed = 150;
    const initialLives = 3;

    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = generateFood();
    let score = 0;
    let lives = initialLives;

    function generateFood() {
        const food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
        return food;
    }

    function draw() {
        // Limpa o tabuleiro
        board.innerHTML = '';

        // Desenha a cobra
        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = 'snake';
            snakeSegment.style.gridRowStart = segment.y + 1;
            snakeSegment.style.gridColumnStart = segment.x + 1;
            board.appendChild(snakeSegment);
        });

        // Desenha a comida
        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.gridRowStart = food.y + 1;
        foodElement.style.gridColumnStart = food.x + 1;
        board.appendChild(foodElement);

        // Atualiza a pontuação e vidas
        scoreElement.textContent = `Pontuação: ${score}`;
        livesElement.textContent = `Vidas: ${lives}`;
    }

    function update() {
        // Atualiza a posição da cobra
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Verifica se a cobra atingiu a parede ou a si mesma
        if (
            head.x < 0 || head.x >= gridSize ||
            head.y < 0 || head.y >= gridSize ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            handleGameOver();
            return;
        }

        // Verifica se a cobra comeu a comida
        if (head.x === food.x && head.y === food.y) {
            score++;
            snake.unshift(food);
            food = generateFood();
        } else {
            snake.unshift(head);
            snake.pop();
        }

        draw();
    }

    function handleGameOver() {
        lives--;

        if (lives === 0) {
            alert(`Game Over! Pontuação final: ${score}`);
            resetGame();
        } else {
            alert(`Você perdeu uma vida! Vidas restantes: ${lives}`);
            resetSnake();
        }
    }

    function resetSnake() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        draw();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        food = generateFood();
        score = 0;
        lives = initialLives;
        draw();
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    function gameLoop() {
        update();
        setTimeout(gameLoop, snakeSpeed);
    }

    resetGame();
    gameLoop();
});
