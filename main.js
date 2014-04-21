var ticTacRef;
var IDs;
var tony;
var rhodey;
var token;


var X = "http://i.imgur.com/LJecj6h.png?1";
var O = "http://i.imgur.com/iI26mSz.png?1";
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

	$scope.iAmTony = function()
	{
		var sound = new Audio('iron_man_repulsor 2.mp3');
					sound.play();
		tony = X;
	

	$scope.iAmRhodey = function()
	{
		var sound = new Audio('iron_man_repulsor 2.mp3');
					sound.play();
		var sound = new Audio('bgMusic.mp3');
					sound.play();
		rhodey = O;
	


		if(tony == X && rhodey == O)
		{
			console.log("ran")
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
							playerOne: 5,
							playerTwo: 5
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
					var sound = new Audio('iron_man_repulsor 2.mp3');
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

					if (xTaken() || oTaken() && 
						$scope.obj.playerTwo != 0 &&
						$scope.obj.playerOne != 0 &&
						$scope.obj.board[cell] == "" && 
						$scope.obj.gameOver == false 
						)
						{
						$scope.obj.board[cell] = $scope.obj.xTurn ? X : O;
						$scope.obj.xTurn = !$scope.obj.xTurn;
						// console.log(cell);	

						if ($scope.obj.board[cell] ==X) {
							console.log("O's turn");
							$scope.obj.trackingBoard[cell] = X;
							// console.log($scope.obj.trackingBoard);
							var sound = new Audio('hit1.mp3');
							sound.play();
						}

						else if ($scope.obj.board[cell] ==O) {
							console.log("X's turn");
							$scope.obj.trackingBoard[cell] = O;
							var sound = new Audio('hit2.mp3');
							sound.play();
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
							setTimeout(function() { alert("Tony wins!") }, 100);
							$scope.obj.playerTwo = $scope.obj.playerTwo - 1;
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
							setTimeout(function() { alert("Rhodey wins!") }, 100);
							$scope.obj.playerOne = $scope.obj.playerOne - 1;				
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




