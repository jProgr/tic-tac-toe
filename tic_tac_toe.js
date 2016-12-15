// This code is awful

var player_symbol = "x";
var computer_symbol = "o";
var empty_symbol = "-";
var grid_content = [empty_symbol, empty_symbol, empty_symbol, empty_symbol, empty_symbol, empty_symbol, empty_symbol, empty_symbol, empty_symbol];
var game_end = false;
var winner_symbol = empty_symbol;

var winner_message_container = document.getElementById("winner_message");

function set_player_symbol()
{
    player_symbol = this.id;
    computer_symbol = (this.id === "x") ? "o" : "x";
    set_game();
    if (computer_symbol === "x") { computer_turn(); }
}

function set_game()
{
    game_end = false;
    grid_space.forEach((space) => { space.innerHTML = empty_symbol; });
    grid_content = grid_content.map(() => { return empty_symbol; });
    
    // UI
    winner_message_container.innerHTML = "";
}

function player_turn()
{
    if (grid_content[(this.id).split("")[1] - 1] === empty_symbol)
    {
        grid_content[(this.id).split("")[1] - 1] = player_symbol;
        check_game_end();
        computer_turn();
    }
}

function computer_turn()
{
    while (!game_end)
    {
        var x = (Math.random() * 9) | 0;
        if (grid_content[x] === empty_symbol) { grid_content[x] = computer_symbol; break; }
    }
    check_game_end();
    paint();
}

function check_game_end()
{
    // Winning combinations
    // Check rows from top to bottom then colums from left to right and then diagonals
    for (var i=0; i<9; i+=3)
    {
        var elements_in_row = new Set(grid_content.slice(i, i+3));
        if (!elements_in_row.delete(empty_symbol)) 
        { if (elements_in_row.size === 1) { winner_symbol = grid_content[i]; game_end = true; break; } }
    }
    
    if (!game_end)
    {
        for (var i=0; i<3; i++)
        {
            var elements_in_column = new Set([grid_content[i], grid_content[i + 3], grid_content[i + 6]]);
            if (!elements_in_column.delete(empty_symbol)) 
            { if (elements_in_column.size === 1) { winner_symbol = grid_content[i]; game_end = true; break; } }
        }
    }
     
    if (!game_end)
    {
        var elements_in_diagonal_1 = new Set([grid_content[0], grid_content[4], grid_content[8]]);
        if (!elements_in_diagonal_1.delete(empty_symbol)) 
        { if (elements_in_diagonal_1.size === 1) { winner_symbol = grid_content[0]; game_end = true; } }
    }
    
    if (!game_end)
    {
        var elements_in_diagonal_2 = new Set([grid_content[2], grid_content[4], grid_content[6]]);
        if (!elements_in_diagonal_2.delete(empty_symbol)) 
        { if (elements_in_diagonal_2.size === 1) { winner_symbol = grid_content[2]; game_end = true; } }
    }
    
    // If the grid is full
    if (!game_end)
    {
        var n_symbols = 0;
        grid_content.forEach((symbol) => { n_symbols += (symbol !== empty_symbol) ? 1 : 0; });
        game_end = n_symbols === 9;
    }
    
    if (game_end) { print_winner(); }
}

// UI

function paint()
{ grid_content.forEach((symbol, index) => { grid_space[index].innerHTML = symbol; }); }

function print_winner()
{
    winner_message_container.innerHTML = (winner_symbol === empty_symbol) ? "Draw" : winner_symbol + " wins";
}

// Get option buttons
var chooser = [];
chooser.push(document.getElementById("x"));
chooser.push(document.getElementById("o"));
chooser.forEach((button) => { button.addEventListener("click", set_player_symbol, false); });

// Get buttons in grid
var grid_space = [];
for (var i=1; i<10; i++) { grid_space.push(document.getElementById("g" + i)); }
grid_space.forEach((space, i) => { space.addEventListener("click", player_turn, false); });
