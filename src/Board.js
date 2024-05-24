import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
	// State to manage the board and win condition
	const [board, setBoard] = useState(createBoard());
	const [gameWon, setGameWon] = useState(false);

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		for (let y = 0; y < nrows; y++) {
			let row = [];
			for (let x = 0; x < ncols; x++) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(row);
		}
		return initialBoard;
	}

	function flipCellsAround(coord) {
		let [y, x] = coord.split("-").map(Number);
		let newBoard = [...board];

		function flipCell(y, x) {
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				newBoard[y][x] = !newBoard[y][x];
			}
		}

		flipCell(y, x);
		flipCell(y, x - 1);
		flipCell(y, x + 1);
		flipCell(y - 1, x);
		flipCell(y + 1, x);

		setBoard(newBoard);
		setGameWon(newBoard.every((row) => row.every((cell) => !cell)));
	}
	// eslint-disable-next-line
	function checkWin() {
		return gameWon;
	}

	// Render "You Won!" message if the game is won
	if (gameWon) {
		return <div>You Won!</div>;
	}

	// Create table board
	let tblBoard = [];
	for (let y = 0; y < nrows; y++) {
		let row = [];
		for (let x = 0; x < ncols; x++) {
			let coord = `${y}-${x}`;
			row.push(
				<Cell
					key={coord}
					isLit={board[y][x]}
					flipCellsAroundMe={() => flipCellsAround(coord)}
				/>
			);
		}
		tblBoard.push(<tr key={y}>{row}</tr>);
	}

	// Render the table board
	return (
		<table className="Board">
			<tbody>{tblBoard}</tbody>
		</table>
	);
}

export default Board;
