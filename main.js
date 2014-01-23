angular.module("TicTacToe", ["firebase"])
// function gameBoardCtrl($scope, $firebase){


.controller("gameBoardCtrl", function($scope, $firebase){
	$scope.gameBoard = ['','','','','','','','',''];
	
	var trackingBoard = ['','','','','','','','',''];
	var ref = new Firebase("https://tictactoematt.firebaseio.com/");
	// $scope.messages = $firebase(ref);
	var myBoard = ref.child("Game 1");
	myBoard.set({board: $scope.gameBoard, xTurn: true});
	var winCombo = [[0,1,2],[3,4,5],[6,7,8],
					[0,3,6],[1,4,7],[2,5,8],
					[0,4,8],[2,4,6]
				   ];




	var xTurn = true;
	var gameOver = false;
	$scope.playerOne = 0;
	$scope.playerTwo = 0;

	$scope.reset = function(){
		// alert("hello");
		// console.log("Hello");
		$scope.gameBoard = ['','','','','','','','',''];
		trackingBoard = ['','','','','','','','',''];
		gameOver = false;
		xTurn = true;
	};



	$scope.attackCell = function(cell){
		if ($scope.gameBoard[cell] == "" && gameOver == false) {
			$scope.gameBoard[cell] = xTurn ? "X" : "O";
			xTurn = !xTurn;
			// console.log(cell);	

			if ($scope.gameBoard[cell] =="X") {
				// playerOne.push("X")
				// console.log("Player One: " + playerOne);
				// console.log(playerOne[0], playerOne[1], playerOne[2]);	
				trackingBoard[cell] = "X";
				console.log(trackingBoard);
			}

			else if ($scope.gameBoard[cell] =="O") {
				trackingBoard[cell] = "O";
				// playerTwo.push("O")
				// console.log("Player Two: " + playerTwo);	
			}
		


			if (trackingBoard[0]=="X" && trackingBoard[1]=="X" && trackingBoard[2]=="X" ||
				trackingBoard[3]=="X" && trackingBoard[4]=="X" && trackingBoard[5]=="X" ||
				trackingBoard[6]=="X" && trackingBoard[7]=="X" && trackingBoard[8]=="X" ||
				trackingBoard[0]=="X" && trackingBoard[3]=="X" && trackingBoard[6]=="X" ||
				trackingBoard[1]=="X" && trackingBoard[4]=="X" && trackingBoard[7]=="X" ||
				trackingBoard[2]=="X" && trackingBoard[5]=="X" && trackingBoard[8]=="X" ||
				trackingBoard[0]=="X" && trackingBoard[4]=="X" && trackingBoard[8]=="X" ||
				trackingBoard[2]=="X" && trackingBoard[4]=="X" && trackingBoard[6]=="X" 
				// gameOver == false
				) 
			{
				gameOver = true;
				// console.log("X wins");
				setTimeout(function() { alert("X wins!") }, 100);
				$scope.playerOne = $scope.playerOne + 1;
				console.log($scope.playerOne);
			}

			if (
			trackingBoard[0]=="O" && trackingBoard[1]=="O" && trackingBoard[2]=="O" ||
			trackingBoard[3]=="O" && trackingBoard[4]=="O" && trackingBoard[5]=="O" ||
			trackingBoard[6]=="O" && trackingBoard[7]=="O" && trackingBoard[8]=="O" ||
			trackingBoard[0]=="O" && trackingBoard[3]=="O" && trackingBoard[6]=="O" ||
			trackingBoard[1]=="O" && trackingBoard[4]=="O" && trackingBoard[7]=="O" ||
			trackingBoard[2]=="O" && trackingBoard[5]=="O" && trackingBoard[8]=="O" ||
			trackingBoard[0]=="O" && trackingBoard[4]=="O" && trackingBoard[8]=="O" ||
			trackingBoard[2]=="O" && trackingBoard[4]=="O" && trackingBoard[6]=="O" 
			// gameOver == false
			) 
			{
					
				gameOver = true;	
				// console.log("O wins")
				setTimeout(function() { alert("O wins!") }, 100);	
				$scope.playerTwo = $scope.playerTwo + 1;
				console.log($scope.playerTwo);
			}
		}
 	}
});




