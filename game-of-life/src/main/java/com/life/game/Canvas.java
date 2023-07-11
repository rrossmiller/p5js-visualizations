package com.life.game;

import processing.core.PApplet;

public class Canvas extends PApplet {
	private int numRows;
	private int numCols;
	private int scale = 8;
	private Cell[][] state;
	private boolean pause;

	@Override
	public void settings() {
		// Size of each cell in the grid, ratio of window size to video size
		// 80 * 8 = 640
		// 60 * 8 = 480
		int x = 640;
		int y = 640;//x * scale;
		size(x, y);

		this.numCols = x / scale;
		this.numRows = y / scale;
		this.state = new Cell[this.numCols][this.numRows];

		setState();
		
		this.pause = false;
	}
	private void setState(){
		int x,y;
		// loop for columns
		for (int i = 0; i < this.numCols; i++) {
			// loop for this.numRows
			for (int j = 0; j < this.numRows; j++) {
				// Scaling up to draw a rectangle at (x,y)
				x = i * scale;
				y = j * scale;
				this.state[i][j] = new Cell(x, y, (Math.random() < 0.1));
			}
		}
	}

	@Override
	public void draw() {
		background(0);
		this.drawGrid();
		if(!this.pause)
			this.updateState();
		delay(100);
	}

	@Override
	public void delay(int millis){
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}
	public void drawGrid(){
		Cell cell;
		// loop for columns
		for (int i = 0; i < this.numCols; i++) {
			// loop for rows
			for (int j = 0; j < this.numRows; j++) {
				cell = this.state[i][j];
				fill(255 * (float)(cell.isActive()? 1:0.3));
				stroke(0);
				rect(cell.getX(), cell.getY(), scale, scale);
			}
		}
	}

	public void updateState(){
		/*
			Any live cell with two or three live neighbours survives.
			Any dead cell with three live neighbours becomes a live cell.
			All other live cells die in the next generation. Similarly, all other dead cells stay dead.
		*/

		int cnt;
		int[][] neighbours = {{-1,-1}, {0, -1}, {1,-1},
						  	  {-1,0}          , {1,0},
							  {-1,1},  {0, 1},  {1,1}
							  };
		Cell[][] newState = new Cell[this.numCols][this.numRows];
		Cell cell;
		boolean active;
		for (int i = 0; i < this.numCols; i++) {
			for (int j = 0; j < this.numRows; j++) {
				cnt = 0;
				cell = this.state[i][j];
				for(int[] n: neighbours){
					try {
						cnt = cnt + (this.state[i + n[0]][j+n[1]].isActive()? 1:0);
					} catch(IndexOutOfBoundsException e){continue;}
				}

				if(cnt == 3)
					active = true;
				else if(cnt > 3 || cnt < 2)
					active = false;
				else
					active = cell.isActive();

				newState[i][j] = new Cell(cell.getX(), cell.getY(), active);
			}
		}
		this.state = newState;
	}

	@Override
	public void mousePressed(){
		this.pause = !this.pause;
	}

	public void keyPressed(){
		if(key == 'r') 
			setState();

	}
}


