function gameBoardCtrl($scope){

	var playerOne = [];
	var playerTwo = []; 

	var winCombo = [[0,1,2],[3,4,5],[6,7,8],
					[0,3,6],[1,4,7],[2,5,8],
					[0,4,8],[2,4,6]
				   ];



	$scope.gameBoard = ['','','','','','','','',''];

	var xTurn = true;

	$scope.attackCell = function(cell){
		if ($scope.gameBoard[cell] == "") {
			$scope.gameBoard[cell] = xTurn ? "X" : "O";
			xTurn = !xTurn;

			console.log(cell);
		};
	};
}



	




// Winning combination 
// 1. winning combination
// 2. Store clicked cell value in the array 
// 3. 

