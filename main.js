function gameBoardCtrl($scope){
	$scope.gameBoard = [['','',''],['','',''],['','','']];

	var xTurn = false;

	$scope.attackCell = function(row, cell){
		// $scope.gameBoard[row][cell] = xTurn ? 
		$scope.gameBoard[row][cell] = xTurn ? "X" : "O";
		xTurn = !xTurn;
	}




}

