var ticTacRef;
var IDs;
var tony;
var rhodey;
var token;


var X = "http://icons.iconseeker.com/png/fullsize/ironman/ironman-m-iii.png";
var O = "http://icons.iconseeker.com/png/fullsize/ironman/ironman-m-ii.png";
// var stylePath = 'main2.css';



angular.module("TicTacToe", ["firebase"])
.controller("gameBoardCtrl", function($scope, $firebase){

	var winCombo = [[0,1,2],[3,4,5],[6,7,8],
					[0,3,6],[1,4,7],[2,5,8],
					[0,4,8],[2,4,6]
				   ];

				// $scope.changeBg = function(){
			 //        if ($scope.stylePath == 'main.css') {
			 //            $scope.stylePath = 'main2.css';
			 //        }
			 //        else {
			 //            $scope.stylePath = 'main.css';
			 //        }
			 //    };

	$scope.iAmTony = function(){
		// tony = true;
		tony = X;
		var sound = new Audio('http://fsb3.zedge.net/dl/ringtone/dfe0f757771ee32bdf59de8a5a1a1221/iron_man_repulsor.mp3?ref=www&type=mc');
					sound.play();

	$scope.iAmRhodey = function(){
		// rhodey = true;
		rhodey = O;
		var sound = new Audio('http://fsb3.zedge.net/dl/ringtone/dfe0f757771ee32bdf59de8a5a1a1221/iron_man_repulsor.mp3?ref=www&type=mc');
					sound.play();

	

		if(tony == X && rhodey == O){
		// console.log(tony);

				ticTacRef = new Firebase("https://tictactoematt.firebaseio.com/"); //link to firebase
				$scope.fbRoot = $firebase(ticTacRef);

				$scope.fbRoot.$on("loaded", function() {
					IDs = $scope.fbRoot.$getIndex();
					if(IDs.length == 0)
					{
						$scope.fbRoot.$add({
							board: ['','','','','','','','',''],
							xTurn: true,
							gameOver: false,
							trackingBoard: ['','','','','','','','',''],
							playerOne: 2,
							playerTwo: 2
						})
						$scope.fbRoot.$on("change", function() {
							IDs = $scope.fbRoot.$getIndex();
							$scope.obj = $scope.fbRoot.$child(IDs[0])
						})
					}
					else
					{
						$scope.obj = $scope.fbRoot.$child(IDs[0]);
					}
				});
				// var myBoard = ticTacRef.child("Game 1");
				// myBoard.set({board: $scope.obj.board, xTurn: true});

				$scope.reset = function(){
					$scope.obj.board = ['','','','','','','','',''];
					$scope.obj.trackingBoard = ['','','','','','','','',''];
					$scope.obj.gameOver = false;
					$scope.obj.xTurn = true;
					$scope.obj.$save();
					var sound = new Audio('http://fsb3.zedge.net/dl/ringtone/dfe0f757771ee32bdf59de8a5a1a1221/iron_man_repulsor.mp3?ref=www&type=mc');
					sound.play();
					//ex 2
					// new Audio(soundURL).play();
				};
				

				function xTaken()
				{
					if ($scope.obj.board.indexOf(X)==-1)
							return true;
					else if(token != X && $scope.obj.xTurn)
						return true;
					else 
						return false;
					}
				}

				function oTaken()
				{
					if(token !=X && $scope.obj.xTurn == false)
						return true;
				} 


				$scope.attackCell = function(cell){

					if (xTaken() || oTaken() && $scope.obj.board[cell] == "" && $scope.obj.gameOver == false) {
						$scope.obj.board[cell] = $scope.obj.xTurn ? X : O;
						$scope.obj.xTurn = !$scope.obj.xTurn;
						// console.log(cell);	

						if ($scope.obj.board[cell] ==X) {
							console.log("O's turn");
							$scope.obj.trackingBoard[cell] = X;
							// console.log($scope.obj.trackingBoard);
						}

						else if ($scope.obj.board[cell] ==O) {
							console.log("X's turn");
							$scope.obj.trackingBoard[cell] = O;
						}
					
						if (
						$scope.obj.trackingBoard[0]==X && $scope.obj.trackingBoard[1]==X && $scope.obj.trackingBoard[2]==X ||
						$scope.obj.trackingBoard[3]==X && $scope.obj.trackingBoard[4]==X && $scope.obj.trackingBoard[5]==X ||
						$scope.obj.trackingBoard[6]==X && $scope.obj.trackingBoard[7]==X && $scope.obj.trackingBoard[8]==X ||
						$scope.obj.trackingBoard[0]==X && $scope.obj.trackingBoard[3]==X && $scope.obj.trackingBoard[6]==X ||
						$scope.obj.trackingBoard[1]==X && $scope.obj.trackingBoard[4]==X && $scope.obj.trackingBoard[7]==X ||
						$scope.obj.trackingBoard[2]==X && $scope.obj.trackingBoard[5]==X && $scope.obj.trackingBoard[8]==X ||
						$scope.obj.trackingBoard[0]==X && $scope.obj.trackingBoard[4]==X && $scope.obj.trackingBoard[8]==X ||
						$scope.obj.trackingBoard[2]==X && $scope.obj.trackingBoard[4]==X && $scope.obj.trackingBoard[6]==X 
						) 
						{
							$scope.obj.gameOver = true;
							// console.log("X wins");
							setTimeout(function() { alert("Tony wins!") }, 100);
							$scope.obj.playerTwo = $scope.obj.playerTwo - 1;
							console.log($scope.obj.playerOne);
						}

						if (
						$scope.obj.trackingBoard[0]==O && $scope.obj.trackingBoard[1]==O && $scope.obj.trackingBoard[2]==O ||
						$scope.obj.trackingBoard[3]==O && $scope.obj.trackingBoard[4]==O && $scope.obj.trackingBoard[5]==O ||
						$scope.obj.trackingBoard[6]==O && $scope.obj.trackingBoard[7]==O && $scope.obj.trackingBoard[8]==O ||
						$scope.obj.trackingBoard[0]==O && $scope.obj.trackingBoard[3]==O && $scope.obj.trackingBoard[6]==O ||
						$scope.obj.trackingBoard[1]==O && $scope.obj.trackingBoard[4]==O && $scope.obj.trackingBoard[7]==O ||
						$scope.obj.trackingBoard[2]==O && $scope.obj.trackingBoard[5]==O && $scope.obj.trackingBoard[8]==O ||
						$scope.obj.trackingBoard[0]==O && $scope.obj.trackingBoard[4]==O && $scope.obj.trackingBoard[8]==O ||
						$scope.obj.trackingBoard[2]==O && $scope.obj.trackingBoard[4]==O && $scope.obj.trackingBoard[6]==O 
						) 
						{	
							$scope.obj.gameOver = true;	
							// console.log("O wins")
							$scope.obj.playerOne = $scope.obj.playerOne - 1;				
							console.log($scope.obj.playerTwo);
						}

						if ($scope.obj.playerTwo == 1){
							return "red"
							var sound = new Audio('http://fsa3.zedge.net/dl/ringtone/77e411564591f0edbe5018da3bec754a/ironman_backup_power.mp3?ref=www&type=mc');
							sound.play();
						}
						$scope.obj.$save();
					}
				}	
			}
		} 
});




