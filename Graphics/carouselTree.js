////////////////////////////////////////////////////////////////////
//	Mitchell Timson
//	0598608
//	COSC3307 - R&D project
//	A Normal Merry-Go-Round
//	Tree structure and draw functions
////////////////////////////////////////////////////////////////////

//Node constsuctor
function  node(child, sibling, drawNode) {
	this.child = child;
	this.sibling = sibling;
	this.position = 0;	//For nodes that have the same object in a different position
	this.drawNode = drawNode;
}

//Initialize nodes
var carousel = new(node);
var dome = new(node);
var bar0 = new(node);
var bar1 = new(node);
var bar2 = new(node);
var bar3 = new(node);
var horse0 = new(node);
var horse1 = new(node);
var horse2 = new(node);
var horse3 = new(node);
var head0 = new(node);
var head1 = new(node);
var head2 = new(node);
var head3 = new(node);

//Root of tree is the carousel
carousel.child = dome;
carousel.sibling = null;
carousel.drawNode = drawCar;

//////////////////////////////////////////////////////////////////////
//	Level 2
////////////////////////////////////////////////////////////////////

//The dome has no child, depends only on carousel rotation
dome.child = null;
dome.sibling = bar0;
dome.drawNode = drawDome;

//Bars
//Each bar has child that is the horse in the corresponding position
bar0.child = horse0;
bar0.sibling = bar1;
bar0.position = 0;
bar0.drawNode = drawBar;

bar1.child = horse1;
bar1.sibling = bar2;
bar1.position = 1;
bar1.drawNode = drawBar;

bar2.child = horse2;
bar2.sibling = bar3;
bar2.position = 2;
bar2.drawNode = drawBar;

bar3.child = horse3;
bar3.sibling = null;
bar3.position = 3;
bar3.drawNode = drawBar;

//////////////////////////////////////////////////////////////////////
//	Level 3
////////////////////////////////////////////////////////////////////
//Each horse has child that is the head in the corresponding position

horse0.child = head0;
horse0.sibling = null;
horse0.position = 0;
horse0.drawNode = drawHorse;

horse1.child = head1;
horse1.sibling = null;
horse1.position = 1;
horse1.drawNode = drawHorse;

horse2.child = head2;
horse2.sibling = null;
horse2.position = 2;
horse2.drawNode = drawHorse;

horse3.child = head3;
horse3.sibling = null;
horse3.position = 3;
horse3.drawNode = drawHorse;

//////////////////////////////////////////////////////////////////////
//	Level 4 - leaves
////////////////////////////////////////////////////////////////////
head0.child = null;
head0.sibling = null;
head0.position = 0;
head0.drawNode = drawHead;

head1.child = null;
head1.sibling = null;
head1.position = 1;
head1.drawNode = drawHead;

head2.child = null;
head2.sibling = null;
head2.position = 2;
head2.drawNode = drawHead;

head3.child = null;
head3.sibling = null;
head3.position = 3;
head3.drawNode = drawHead;

//////////////////////////////////////////////////////////////////////
//	Draw functions
////////////////////////////////////////////////////////////////////

//Carousel is translated to be centered in frame, and rotated based on parameter
function drawCar() {
	g_modelMatrix.setRotate(params.carRot, 0, 1, 0);
	g_modelMatrix.translate(0,-0.5, 0);
	drawObj(0, NUM_CAR_V);
}
//Dome is a half sphere so is scaled in the y direction and translated to the top of carousel
function drawDome() {
	g_modelMatrix.translate(0, CAR_HEIGHT, 0);
	g_modelMatrix.scale(1, 0.45, 1);
	drawObj(NUM_CAR_V, NUM_DOME_V);
}

var barDist = 0.8;	//bar distance from center

//Bars are translated away from center, and then rotated by a multiple of 90 degrees about the Y axis
function drawBar() {
	g_modelMatrix.rotate(this.position * 90, 0, 1, 0);
	g_modelMatrix.translate(-barDist, 0, 0);
	drawObj(NUM_CAR_V + NUM_DOME_V, NUM_BAR_V);
}
//Each horse is scaled to a size that is appropriate with size of carousel, and translated up to 
//line up with the bar. The even numbered horses are translated in the direction of the horseY parameter
//and the odd numbered are translated in the opposite direction.
function drawHorse() {
	g_modelMatrix.translate(0, 0.5 + Math.pow((-1),this.position)*params.horseY, -0.1);
	g_modelMatrix.scale(0.1, 0.1, 0.1);
	drawObj(NUM_CAR_V + NUM_DOME_V + NUM_BAR_V, NUM_BODY_V);
}
//Each head is translated to sit on the body, and rotated about the x axis by the headR parameter
function drawHead() {
	g_modelMatrix.translate(0, 1.20675, 2.34673);
	g_modelMatrix.rotate(params.headRot, 1, 0, 0);
	drawObj(NUM_CAR_V + NUM_DOME_V + NUM_BAR_V + NUM_BODY_V, NUM_HEAD_V);
}