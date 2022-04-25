package com.life.game;

class Cell {
	private int x;
	private int y;
	private boolean active;

	public Cell(int x, int y, Boolean active){
		this.x = x;
		this.y = y;
		this.active = active;
	}

	public int getX(){ return this.x;}
	public int getY(){ return this.y;}
	public boolean isActive(){ return this.active;}
	public void setActive(boolean b){ this.active = b;}
}