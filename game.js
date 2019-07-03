const BOARD_SIZE = 32

// Class to draw a pente board
class Board {
    constructor(game, canvas) {
        this.canvas = canvas
        this.game = game;

        document.addEventListener('click', e => {
            if (!e.target.matches('#gameCanvas')) return;
            
            this.click(e.clientX, e.clientY); // TODO allow canvas to be offset
        });
    }
    
    // draw a pente board
    update() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        let x = 1, y = 1;
        for (let dataX of this.game.board) {
            for (let dataY of dataX) {
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.rect(x*BOARD_SIZE, y*BOARD_SIZE, BOARD_SIZE, BOARD_SIZE);
                ctx.stroke();
                
                if (dataY == 'a') {
                    ctx.beginPath();
                    ctx.strokeStyle = 'red';
                    ctx.fillStyle = 'red';
                    ctx.arc(x*BOARD_SIZE, y*BOARD_SIZE, 10, 0, 2*Math.PI);
                    ctx.fill();                    
                    ctx.stroke();                
                } else if (dataY == 'b') {
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.fillStyle = 'blue';                    
                    ctx.arc(x*BOARD_SIZE, y*BOARD_SIZE, 10, 0, 2*Math.PI);
                    ctx.fill();
                    ctx.stroke();
                }
                
                x++;
            }
            y++;
            x = 1;
        }

        ctx.strokeStyle = 'grey';
        ctx.moveTo(BOARD_SIZE * 10, BOARD_SIZE * 10);
        ctx.arc(BOARD_SIZE * 10, BOARD_SIZE * 10, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Handle a click at a point
    click(xPos, yPos) {
        this.game.place(Math.floor((xPos - (BOARD_SIZE / 2)) / BOARD_SIZE), Math.floor((yPos - (BOARD_SIZE / 2)) / BOARD_SIZE));

        this.update();
    }
}

let board = new Board(new Pente(), document.getElementById('gameCanvas'));
board.update();