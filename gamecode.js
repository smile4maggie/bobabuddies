var person[]=new var [4];
var skyline;
var ground;
var trashcan;
var trashcan2;
var randomTrashX=random(500,width+500); //random trashcan position

var [] keys=new boolean[4]; //for the key pressing for boba buddies

var score;
var counter; //counts the number of times draw loop has ran (for changing frames)- increments in draw loop
var gameSpeed=3; //speeds up the game

var state; //game state

//loading game images
PImage bobagirl1;
PImage bobaboy1;
PImage bobaboy2;
PImage bobagirl2;
PImage bobagirl1_2;
PImage bobaboy1_2;
PImage bobagirl2_2;
PImage bobaboy2_2;
PImage bobagirl1_jump;
PImage bobagirl2_jump;
PImage bobaboy1_jump;
PImage bobaboy2_jump;
PImage street1;
PImage street2;
PImage city1;
PImage city2;
PImage trashcan;
PImage trashcan2;
PImage mute;
PImage unmute;

//loading button images
PImage back1;
PImage back2;
PImage credits1;
PImage credits2;
PImage howtoplay1;
PImage howtoplay2;
PImage mainmenu1;
PImage mainmenu2;
PImage pause1;
PImage pause2;
PImage resume1;
PImage resume2;
PImage start1;
PImage start2;
PImage tryagain1;
PImage tryagain2;

PFont gameFont;

//declares all of the sounds
var buttonSound = new buzz.sound ("buttonClickSound.mp3");
var buttonSound2 = new buzz.sound ("buttonClickSound2.mp3");
var backgroundSound = new buzz.sound("backgroundSoundFinal.mp3");
var homeMusic= new buzz.sound ("homepageSound.mp3");
var jumpSound = new buzz.sound("jumpSound.wav");

//allows playing with buzz API
void playWithLoop(soundToPlay) {
	soundToPlay.play();
	soundToPlay.loop();
}

void setup(){
	size(650,450, P2D);
	imageMode(CENTER);
	strokeWeight(4);

	state=new GameState(0); //set to homepage

	score=0;

	buttonSound.setVolume(45);
	buttonSound2.setVolume(45);
	backgroundSound.setVolume(15);
	homeMusic.setVolume(20);
	jumpSound.setVolume(20);

	//boba buddies' images
	bobagirl1=loadImage("characters/bobagirl1-1.png");
	bobagirl2=loadImage("characters/bobagirl2-1.png");
	bobaboy1=loadImage("characters/bobaboy1-1.png");
	bobaboy2=loadImage("characters/bobaboy2-1.png");
	bobagirl1_2=loadImage("characters/bobagirl1-2.png");
	bobaboy1_2=loadImage("characters/bobaboy1-2.png");
	bobagirl2_2=loadImage("characters/bobagirl2-2.png");
	bobaboy2_2=loadImage("characters/bobaboy2-2.png");
	bobagirl1_jump=loadImage("characters/bobagirl1-jumping.png");
	bobagirl2_jump=loadImage("characters/bobagirl2-jumping.png");
	bobaboy1_jump=loadImage("characters/bobaboy1-jumping.png");
	bobaboy2_jump=loadImage("characters/bobaboy2-jumping.png");

	//street images
	street1=loadImage("otherimages/sidewalk.png");
	street2=loadImage("otherimages/sidewalk2.png");

	//two trashcans' images
	trashcan=loadImage("otherimages/trashcan3.png");
	trashcan2=loadImage("otherimages/trashcan4.png");

	//city background images
	city1=loadImage("otherimages/skyline.png");
	city2=loadImage("otherimages/skyline2.png");

	//button images
	back1=loadImage("buttons/backButton.png");
	back2=loadImage("buttons/backButton2.png");
	credits1=loadImage("buttons/creditsButton.png");
	credits2=loadImage("buttons/creditsButton2.png");
	howtoplay1=loadImage("buttons/howtoplayButton.png");
	howtoplay2=loadImage("buttons/howtoplayButton2.png");
	mainmenu1=loadImage("buttons/mainmenuButton.png");
	mainmenu2=loadImage("buttons//mainmenuButton2.png");
	pause1=loadImage("buttons/pauseButton.png");
	pause2=loadImage("buttons/pauseButton2.png");
	resume1=loadImage("buttons/resumeButton.png");
	resume2=loadImage("buttons/resumeButton2.png");
	start1=loadImage("buttons/startButton.png");
	start2=loadImage("buttons/startButton2.png");
	tryagain1=loadImage("buttons/tryagainButton.png");
	tryagain2=loadImage("buttons/tryagainButton2.png");

	//speaker icons
	unmute=loadImage("otherimages/unmute.png");
	mute=loadImage("otherimages/mute.png");

	gameFont=createFont("Impact");

	//initializing objects
	person[0]=new Person(240, bobagirl1, bobagirl1_2, bobagirl1_jump);
	person[1]=new Person(180, bobaboy1, bobaboy1_2, bobaboy1_jump);
	person[2]=new Person(120, bobagirl2, bobagirl2_2, bobagirl2_jump);
	person[3]=new Person(60, bobaboy2, bobaboy2_2, bobaboy2_jump);
	ground=new Scroller(street1, street2,1731,370,170, 0);
	trashcan=new Obstacle(trashcan, randomTrashX, 265);
	trashcan2=new Obstacle(trashcan2, randomTrashX+random(350,700), 265);
	skyline=new Scroller(city1,city2,1661,130,height-80, -1);

	//keys for controling boba buddies
	keys[0]=false;
	keys[1]=false;
	keys[2]=false;
	keys[3]=false;
}

void draw(){
	counter++; //counter incrementing for frame change
	gameEnd();
	state.show();
}
void mouseClicked(){
	//changing states
	if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415 && state.page==0){ //if 'start' is pressed
		buttonSound2.play();
		homeMusic.stop();
		state.page=2; //go to game
	}
	else if (homeMusic.isMuted()==false && mouseX>5 && mouseX<50 && mouseY>5 && mouseY<35 && state.page==0){ //if speaker for music button is pressed and speaker is unmuted
		buttonSound2.play();
		homeMusic.mute();
		backgroundSound.mute();
	}
	else if (homeMusic.isMuted()==true && mouseX>5 && mouseX<50 && mouseY>5 && mouseY<35 && state.page==0){ //if speaker for music button is pressed and speaker is muted
		buttonSound2.play();
		homeMusic.unmute();
		backgroundSound.unmute();
	}
	else if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25 && state.page==0){ //if 'how to play' is pressed
		buttonSound2.play();
		state.page=1; //go to instructions
	}
	else if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50 && state.page==1){ //if 'back' button pressed in how to play
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25 && state.page==0) {//if 'credits' is pressed
		buttonSound2.play();
		state.page=5;
	}
	else if(mouseX>width/2-40 && mouseX<width/2+40 && mouseY>400-20 && mouseY<400+20 && state.page==5){ //if 'back' is pressed in the credits
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>290 && mouseY<340 && state.page==3){ //if 'main menu' button pressed
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>360 && mouseY<410 && state.page==3){ //if 'try again' button pressed
		buttonSound2.play();
		score=0;
		gameSpeed=3;
		state.page=2;
	}
	else if(mouseX>(width/2)-70 && mouseX<width && mouseY>0 && mouseY<50 && state.page==2){ //if 'pause' button pressed
		buttonSound2.play();
		state.page=4;
	}
	else if(mouseX>(width/2-90) && mouseX<(width/2-90+150) && mouseY>250-30 && mouseY<250+20 && state.page==4){
		buttonSound2.play();
		backgroundSound.play();
		state.page=2;//go back to game
	}

	//mobile buttons in game
	if(mouseX>10 && mouseX<90+70 && mouseY>300 && mouseY<440){keys[0]=true;}
	if(mouseX>220-60 && mouseX<220+70 && mouseY>300 && mouseY<440){keys[1]=true;}
	if(mouseX>430-70 && mouseX<430+70 && mouseY>300 && mouseY<440){keys[2]=true;}
	if(mouseX>560-70 && mouseX<560+70 && mouseY>300 && mouseY<440){keys[3]=true;}

}

class GameState{
	var page;
	PImage homepage1;
	PImage homepage2;
	PImage instructionsp1;
	PImage instructionsp2;
	PImage instructionsp3;
	PImage instructionsp4;
	PImage instructionsp5;
	PImage credits;
	PImage gameover;
	PImage pause;
	PImage jumpButton1;
	PImage jumpButton2;
	PImage jumpButton3;
	PImage jumpButton4;
	PImage jumpButton1p;
	PImage jumpButton2p;
	PImage jumpButton3p;
	PImage jumpButton4p;
	GameState(p){
		page=p;
		homepage1=loadImage("backgrounds/home1.png");
		homepage2=loadImage("backgrounds/home2.png");
		instructionsp1=loadImage("backgrounds/instructionsPage0000.png");
		instructionsp2=loadImage("backgrounds/instructionsPage0001.png");
		instructionsp3=loadImage("backgrounds/instructionsPage0002.png");
		instructionsp4=loadImage("backgrounds/instructionsPage0003.png");
		instructionsp5=loadImage("backgrounds/instructionsPage0004.png");
		credits=loadImage("backgrounds/credits.png");
		gameover=loadImage("backgrounds/gameOver.png");
		pause=loadImage("backgrounds/pause.png");
		jumpButton1=loadImage("otherimages/jumpButton-1.png");
		jumpButton2=loadImage("otherimages/jumpButton-2.png");
		jumpButton3=loadImage("otherimages/jumpButton-3.png");
		jumpButton4=loadImage("otherimages/jumpButton-4.png");
		jumpButton1p=loadImage("otherimages/jumpButton-1-2.png");
		jumpButton2p=loadImage("otherimages/jumpButton-2-2.png");
		jumpButton3p=loadImage("otherimages/jumpButton-3-2.png");
		jumpButton4p=loadImage("otherimages/jumpButton-4-2.png");
	}

	void show(){
		if(page==0){
			homePage();
		}
		else if (page==1){
			instructions();
		}
		else if (page==2){
			startGame();
		}
		else if (page==3){
			gameOver();
		}
		else if(page==4){
			pausePage();
		}
		else if (page==5){
			creditsPage();
		}
	}

	void homePage(){
		score=0;
		gameSpeed=3;
		textFont(gameFont,35);
		playWithLoop(homeMusic);
		if(counter%20<=10){
			image(homepage1,width/2,height/2); //background for the page
				//mouse hovers start button
			if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415){
				image(start2, width/2-130, 340, 250,150);
			}
			else{
				image(start1, width/2-130, 340, 250, 150);
			}
				//mouse hovers how to play button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25){
				image(howtoplay2, width/2+150, 300);
			}
			else{
				image(howtoplay1, width/2+150, 300);
			}
				//mouse hovers credits button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25){
				image(credits2,width/2+150, 380);
			}
			else{
				image(credits1,width/2+150, 380);
			}
				//speaker icon for muting music
			if(homeMusic.isMuted()){
				image(mute,30,20,50,36);

			}
			else{
				image(unmute,30,20,50,36);
			}
		}
		else{
			image(homepage2,width/2,height/2);
				//mouse hovers start button
			if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415){
				image(start2, width/2-130, 340, 250,150);
			}
			else{
				image(start1, width/2-130, 340, 250, 150);
			}
				//mouse hovers how to play button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25){
				image(howtoplay2, width/2+150, 300);
			}
			else{
				image(howtoplay1, width/2+150, 300);
			}
				//mouse hovers credits button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25){
				image(credits2,width/2+150, 380);
			}
			else{
				image(credits1,width/2+150, 380);
			}
				//speaker icon for muting music
			if(homeMusic.isMuted()){
				image(mute,30,20,50,36);
			}
			else{
				image(unmute,30,20,50,36);
			}
		}
	}

	void instructions(){
		textFont(gameFont,30);
		if(counter%60>=50){
			image(instructionsp5,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=40){
			image(instructionsp4,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=30){
			image(instructionsp3,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=20){
			image(instructionsp2,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=10){
			image(instructionsp1,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
	}

	void startGame(){
		playWithLoop(backgroundSound);
		background(145, 181, 255);
		skyline.show();
		skyline.move();
		ground.show();
		ground.move();

		trashcan.show();
		trashcan.move();
		trashcan2.show();
		trashcan2.move();

		//speeding up the game
		if(counter%500==0){ //counter increases every 500th time the draw loop runs
			gameSpeed++;
		}
		if(gameSpeed>=14){ //after speed gets to 10, it slows all the way day
			gameSpeed=14;
		}

		//score display
		textAlign(CENTER);
		fill(0);
		textFont(gameFont,45);
		text(score, width/2, 80);

		//score increasing
		fill(255,0,0);
		if(trashcan.getX()<person[3].getX() && trashcan.getX()>=person[3].getX()-gameSpeed){
			console.log("1st add 10");
			jumpSound.setTime(.03);
			jumpSound.play();
			score=score+10;
		}
		if(trashcan2.getX()<person[3].getX() && trashcan2.getX()>=person[3].getX()-gameSpeed){
			console.log("2nd add 10");
			jumpSound.setTime(.03);
			jumpSound.play();
			score=score+10;
		}

		//key pressing for boba buddies
		if(keys[3]==true){
			person[0].showJump();
			person[0].jump(3);
			image(jumpButton4p,560, 375,100,100);
		}
		else{
			person[0].show();
			image(jumpButton4,560, 375,100,100);
		}
		if(keys[2]==true){
			person[1].showJump();
			person[1].jump(2);
			image(jumpButton3p,430, 375,100,100);
		}
		else{
			person[1].show();
			image(jumpButton3,430, 375,100,100);
		}
		if(keys[1]==true){
			person[2].showJump();
			person[2].jump(1);
			image(jumpButton2p,220, 375,100,100);
		}
		else{
			person[2].show();
			image(jumpButton2,220, 375,100,100);
		}
		if(keys[0]==true){
			person[3].showJump();
			person[3].jump(0);
			image(jumpButton1p,90, 375,100,100);
		}
		else{
			person[3].show();
			image(jumpButton1,90, 375,100,100);
		}

		//clicking the 'pause' button
		if(mouseX>(width/2)-50 && mouseX<width && mouseY>0 && mouseY<50){
			image(pause2,width-50,25);
		}
		else{
			image(pause1,width-50,25);
		}
	}

	void gameOver(){
		fill(0);
		backgroundSound.stop();
		textFont(gameFont,40);
		image(gameover,width/2,height/2);
		text(score,width/2-5,260);
			//'main menu' button
		if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>290 && mouseY<340){
			image(mainmenu2, width/2,315);
		}
		else{
			image(mainmenu1, width/2,315);;
		}
			//'try again' button
		if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>360 && mouseY<410){
			image(tryagain2, width/2,385);
		}
		else{
			image(tryagain1, width/2,385);
		}
	}

	void pausePage(){
		backgroundSound.pause(); //pauses background music
		backgroundSound.pause();
		image(pause,width/2,height/2);
		if(mouseX>(width/2-90) && mouseX<(width/2-90+150) && mouseY>250-30 && mouseY<250+20){
				image(resume2, width/2,260);
			}
		else{
			image(resume1, width/2,260);
		}
	}

	void creditsPage(){
		image(credits,width/2,height/2);
		//back button
		if(mouseX>width/2-40 && mouseX<width/2+40 && mouseY>400-20 && mouseY<400+20){
				image(back2, width/2,400);
			}
		else{
			image(back1, width/2,400);
		}
	}
}

class Scroller{
	var pic1;
	var pic2;
	var x1;
	var x2;
	var y;
	var picWidth;
	var size;
	var scrollSpeed;
	Scroller(picture1,picture2, pictureWidth, yPosition, imageSizeY, speed){
		picWidth=pictureWidth;
		y=yPosition;
		x1=-(picWidth/2)-50;
		x2=x1+picWidth;
		pic1=picture1;
		pic2=picture2;
		size=imageSizeY;
		scrollSpeed=gameSpeed+speed;
	}

	void show(){
		image(pic1, x1, y,picWidth,size);
		image(pic2, x2, y,picWidth,size);
	}

	void move(){
		x1=x1-scrollSpeed;
		x2=x2-scrollSpeed;
		//city scroller
		if(x1+(picWidth)<=0){
			x1=x2+(picWidth)-50;
		}
		if(x2+(picWidth)<=0){
			x2=x1+(picWidth)-50;
		}
	}
}

class Obstacle{
	var x;
	var y;
	var sizeX;
	var sizeY;
	var pic;
	Obstacle(picture, xPosition, yPosition){
		x=xPosition;
		y=yPosition;
		sizeX=15;
		sizeY=30;
		pic=picture;
	}

	void show(){
		image(pic,x,y, 50,50);
	}

	void move(){
		x=x-gameSpeed;
		if(x<random(-150,-50)){
			x=random(width+100, width+400);
		}
	}

	public var getX(){ //used to make other functions have access to obstacle's x position
		return x;
	}

	public var getY(){ //used to make other functions have access to obstacle's y position
		return y;
	}

	public var setX(newX){ //used to give trashcans new x positions when game is restarted
		x=newX;
	}
}

class Person{
	var x;
	var y;
	var isjumping;
	var yinc;
	var pic1;
	var pic2;
	var pic3;
	Person(xPosition, picture1, picture2, picture3){
		x=xPosition;
		//y=347; //previous y position
		y=260;
		isjumping=false;
		pic1=picture1;
		pic2=picture2;
		pic3=picture3; //jumping picture
	}

	void show(){
		if(counter%20<=10){
			image(pic1, x, y, 80,80);
		}
		else{
			image(pic2, x,y,80,80);
		}
	}

	void showJump(){
		image(pic3,x,y,80,80);
	}

	void jump(number){
		if(isjumping==false && keys[number]==true)
		{
			jumpSound.setTime(0.1);
			jumpSound.play();
		    isjumping=true;
		    yinc=15;
		}
		if(isjumping==true) //if character is jumping
		{
		    y=y-yinc; //add thrust to current y position
		    yinc=yinc-1;
		}
		if(y>=260) //if character's y reaches the ground
		{
		    isjumping=false;
		    keys[number]=false;
		}
	}

	public var getX(){
		return x;
	}

	public var getY(){
		return y;
	}

	public void setY(newY){
		y=newY;
	}
}

void keyPressed(){
	if (key=='1') {keys[0]=true;}
  	if (key=='2') {keys[1]=true;}
  	if (key=='3') {keys[2]=true;}
  	if (key=='4') {keys[3]=true;}
}

void gameEnd(){
	//if any of the buddies touching the 1st trashcan
	if(person[0].getX()>=trashcan.getX()-25 && person[0].getX()<=trashcan.getX()+30 && person[0].getY()>=trashcan.getY()-15 && person[0].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[1].getX()>=trashcan.getX()-25 && person[1].getX()<=trashcan.getX()+30 && person[1].getY()>=trashcan.getY()-15 && person[1].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[2].getX()>=trashcan.getX()-25 && person[2].getX()<=trashcan.getX()+30 && person[2].getY()>=trashcan.getY()-15 && person[2].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[3].getX()>=trashcan.getX()-25 && person[3].getX()<=trashcan.getX()+30 && person[3].getY()>=trashcan.getY()-15 && person[3].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}

	//if any of the buddies touching the 2nd trashcan
	if(person[0].getX()>=trashcan2.getX()-25 && person[0].getX()<=trashcan2.getX()+30 && person[0].getY()>=trashcan2.getY()-15 && person[0].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[1].getX()>=trashcan2.getX()-25 && person[1].getX()<=trashcan2.getX()+30 && person[1].getY()>=trashcan2.getY()-15 && person[1].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[2].getX()>=trashcan2.getX()-25 && person[2].getX()<=trashcan2.getX()+30 && person[2].getY()>=trashcan2.getY()-15 && person[2].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[3].getX()>=trashcan2.getX()-25 && person[3].getX()<=trashcan2.getX()+30 && person[3].getY()>=trashcan2.getY()-15 && person[3].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
}
