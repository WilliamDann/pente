const BLANK_GAME = "18/18/18/18/18/18/18/18/18/18/18/18/18/18/18/18/18/18/"
const CAPTURE_TABLE = [
    [{x:0, y:0, type:'a'}, {x:0, y:1, type:'b'},  {x:0, y:2, type:'b'},  {x:0, y:3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:0, y:-1, type:'b'}, {x:0, y:-2, type:'b'}, {x:0, y:-3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:1, y:0, type:'b'},  {x:2, y:0, type:'b'},  {x:3, y:0, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:-1, y:0, type:'b'}, {x:-2, y:0, type:'b'}, {x:-3, y:0, type:'a'}],

    [{x:0, y:0, type:'a'}, {x:1, y:1, type:'b'},  {x:2, y:2, type:'b'}, {x:3, y:3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:-1, y:1, type:'b'}, {x:-2, y:2, type:'b'}, {x:-3, y:3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:1, y:-1, type:'b'}, {x:2, y:-2, type:'b'}, {x:3, y:-3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:-1, y:-1, type:'b'}, {x:-2, y:-2, type:'b'}, {x:-3, y:-3, type:'a'}],
    [{x:0, y:0, type:'a'}, {x:1, y:1, type:'b'}, {x:2, y:2, type:'b'}, {x:3, y:3, type:'a'}],

]
const DIRECTION_TABLE = [
    {x:1, y:1},
    {x:1, y:0},
    {x:0, y:1},
    {x:-1, y:-1},
    {x:0, y:-1},
    {x:-1, y:0},
    {x:1, y:-1},
    {x:-1, y:1},
]

// Class to store board information
class Pente {
    constructor(fen=BLANK_GAME) {
        this.board = this.create(fen);
        this.a = true;
    }

    // Create the board from fen notation
    create(fen) {
        let board = []

        for (let i of fen.split('/')) {
            let row = []
            for (let char of i.split('-')) {
                if (char == "") continue;

                let num = parseInt(char);
                if (num) {
                    for (let i = 0; i < num; i++) {
                        row.push('0')
                    }
                } else { row.push(char); }
            }

            if (row.length != 0) board.push(row);
        }

        return board;
    }

    // Place a piece on the board
    place(x, y) {
        if (this.board[y][x] != '0') return;

        (this.a) ? this.board[y][x] = 'a' : this.board[y][x] = 'b'
        this.captureCheck(x, y);
        if (this.winCkeck(x, y)) {
            console.log('win');
        }

        this.a = !this.a;
    }

    // Check the board state
    captureCheck(x, y) {
        for (let pattern of CAPTURE_TABLE) {
            let capture = true;

            let expected = this.a;

            // check for captures
            for (let space of pattern) {
                expected = (this.a) ? ((space.type == 'a') ? 'a': 'b') : (space.type == 'a') ? 'b' : 'a';

                if (this.board[y+space.y][x+space.x] != expected) {
                    capture = false;
                    break;
                }
                else
                    capture = true;
            }

            // capture
            if (capture) {
                for (let space of pattern) {
                    this.board[y+space.y][x+space.x] = (this.a) ? ((space.type == 'a') ? 'a' : '0') : ((space.type == 'a' ? 'b' : '0'))
                }
            }
        }
    }

    // Check if a placment causes a win
    winCkeck(x, y, left=5, useDirection=null) {
        if (left == 0) return true;

        if (!useDirection) {
            for (let direction of DIRECTION_TABLE) {
                if (this.board[y+direction.y][x+direction.y] == ((this.a) ? 'a' : 'b')) {
                    return this.winCkeck(x+direction.x, y+direction.y, left-1, direction);
                }
            }
        } else {
            if (this.board[y+useDirection.y][x+useDirection.y] == ((this.a) ? 'a' : 'b')) {
                return this.winCkeck(x+useDirection.x, y+useDirection.y, left-1, useDirection);
            }
        }
            
        return false;
    }

    // get fen notation of board
    fen() {
        let str = ""
        for (let y in this.board) {
            let blanks = 0;
            for (let x in this.board) {
                if (this.board[x][y] == '0') blanks++;
                else {
                    str += blanks + '-' + this.board[x][y] + '-';
                    blanks = 0;
                }
            }
            if (blanks != 0) str += blanks;
            str += "/";
        }
        return str;
    }
}