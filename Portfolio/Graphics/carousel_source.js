////////////////////////////////////////////////////////////////////
//	Mitchell Timson
//	0598608
//	COSC3307 - R&D project
//	A Normal Merry-Go-Round
//	Carousel build function
////////////////////////////////////////////////////////////////////

//To be used as constants in main file
var NUM_CAR_V;
var NUM_DOME_V;
var NUM_BAR_V;
var C_VERTICES;
var D_VERTICES;
var BAR_VERTICES;
var C_NORMALS;
var D_NORMALS;
var BAR_NORMALS;
var CAR_HEIGHT;

function buildCarousel(){
	var cyl_div = 32;
	var vertices = [];
	var norms = [];
	var t, s;
	var pi2 = 2*Math.PI;
	var baseR = 1;
	var baseH = 0.2;
	var centerR = 0.2;
	var centerH = 0.7;
	var topH = 0.1;
	var barR = 0.02;
	
	//Ground
	//v1
	vertices.push(-50.0);
	vertices.push(0.0);
	vertices.push(-50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//v2
	vertices.push(-50.0);
	vertices.push(0.0);
	vertices.push(50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//v3
	vertices.push(50.0);
	vertices.push(0.0);
	vertices.push(50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//v3
	vertices.push(50.0);
	vertices.push(0.0);
	vertices.push(50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//v1
	vertices.push(-50.0);
	vertices.push(0.0);
	vertices.push(-50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//v4
	vertices.push(50.0);
	vertices.push(0.0);
	vertices.push(-50.0);
	vertices.push(0.25);
	vertices.push(0.65);
	vertices.push(0.3);
	norms.push(0.0);
	norms.push(1.0);
	norms.push(0.0);
	//Bottom of carousel: all normals straight down
	for (s = 2; s < cyl_div; s *= 2){
		for (t = 0; t < pi2; t += pi2/s) {
			//First vertex of triangle
			vertices.push(baseR*Math.sin(t));	//x coord
			vertices.push(0.0);					//y coord
			vertices.push(baseR*Math.cos(t));	//z coord
			vertices.push(0.3);
			vertices.push(0.3);
			vertices.push(0.3);
			//Its normal
			norms.push(0.0);	//x normal component
			norms.push(-1.0);	//y normal component
			norms.push(0.0);	//z normal component
			//Second vertex of triangle
			vertices.push(baseR*Math.sin(t + Math.PI/s));	//x coord
			vertices.push(0.0);								//y coord
			vertices.push(baseR*Math.cos(t + Math.PI/s));	//z coord
			vertices.push(0.3);
			vertices.push(0.3);
			vertices.push(0.3);
			//Its normal
			norms.push(0.0);	//x normal component
			norms.push(-1.0);	//y normal component
			norms.push(0.0);	//z normal component
			//Third vertex of triangle
			vertices.push(baseR*Math.sin(t + pi2/s));	//x coord
			vertices.push(0.0);							//y coord
			vertices.push(baseR*Math.cos(t + pi2/s));	//z coord
			vertices.push(0.3);
			vertices.push(0.3);
			vertices.push(0.3);
			//Its normal
			norms.push(0.0);	//x normal component
			norms.push(-1.0);	//y normal component
			norms.push(0.0);	//z normal component
		}
	}
	//Side of base cylinder for carousel: normals will be straight out, parallel to xz-plane. Colour alternates red/yellow
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//bottom left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(0.0);					//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(0.0);								//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
		//top left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		
		//Second triangle
		//top left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(0.0);								//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
		//top right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);							//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
	}
	//Top of base: normals straight up
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//Outer edge vertices
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
		//second outer-edge
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);							//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
		//Inner edge vertex
		vertices.push(centerR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(centerR*Math.cos(t));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
		
		//Second triangle
		//Inner edge vertex
		vertices.push(centerR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(centerR*Math.cos(t));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
		//Outer-edge vertex
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);							//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
		//second inner edge vertex
		vertices.push(centerR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);								//y coord
		vertices.push(centerR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(1.0);	//y component
		norms.push(0.0);	//z component
	}
	//Side of center cylinder for carousel: normals will be straight out, parallel to xz-plane
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//bottom left corner of triangle-pair
		vertices.push(centerR*Math.sin(t));	//x coord
		vertices.push(baseH);				//y coord
		vertices.push(centerR*Math.cos(t));	//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t));	//x component
		norms.push(0.0);					//y component
		norms.push(centerR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(centerR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);								//y coord
		vertices.push(centerR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);								//y component
		norms.push(centerR*Math.cos(t+ pi2/cyl_div));	//z component
		//top left corner of triangle-pair
		vertices.push(centerR*Math.sin(t));		//x coord
		vertices.push(centerH+baseH);			//y coord
		vertices.push(centerR*Math.cos(t));		//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t));	//x component
		norms.push(0.0);					//y component
		norms.push(centerR*Math.cos(t));	//z component
		
		//Second triangle
		//top left corner of triangle-pair
		vertices.push(centerR*Math.sin(t));		//x coord
		vertices.push(centerH+baseH);			//y coord
		vertices.push(centerR*Math.cos(t));		//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t));	//x component
		norms.push(0.0);					//y component
		norms.push(centerR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(centerR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH);								//y coord
		vertices.push(centerR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);								//y component
		norms.push(centerR*Math.cos(t+ pi2/cyl_div));	//z component
		//top right corner of triangle-pair
		vertices.push(centerR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(centerH+baseH);						//y coord
		vertices.push(centerR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.75);
		vertices.push(0.75);
		vertices.push(0.75);
		//Its normal
		norms.push(centerR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);								//y component
		norms.push(centerR*Math.cos(t+ pi2/cyl_div));	//z component
	}
	//bottom of ceiling: normals straight down
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//Outer edge vertices
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(baseH + centerH);		//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
		//second outer-edge
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH + centerH);					//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
		//Inner edge vertex
		vertices.push(centerR*Math.sin(t));		//x coord
		vertices.push(baseH + centerH);			//y coord
		vertices.push(centerR*Math.cos(t));		//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
		
		//Second triangle
		//Inner edge vertex
		vertices.push(centerR*Math.sin(t));		//x coord
		vertices.push(baseH + centerH);			//y coord
		vertices.push(centerR*Math.cos(t));		//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
		//Outer-edge vertex
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH + centerH);					//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
		//second inner edge vertex
		vertices.push(centerR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH + centerH);						//y coord
		vertices.push(centerR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(0.5);
		vertices.push(0.5);
		vertices.push(0.0);
		//Its normal
		norms.push(0.0);	//x component
		norms.push(-1.0);	//y component
		norms.push(0.0);	//z component
	}
	//Side of top cylinder for carousel: normals will be straight out, parallel to xz-plane
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//bottom left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));	//x coord
		vertices.push(baseH + centerH);		//y coord
		vertices.push(baseR*Math.cos(t));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH + centerH);					//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
		//top left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));		//x coord
		vertices.push(baseH+centerH+topH);		//y coord
		vertices.push(baseR*Math.cos(t));		//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		
		//Second triangle
		//top left corner of triangle-pair
		vertices.push(baseR*Math.sin(t));		//x coord
		vertices.push(baseH+centerH+topH);		//y coord
		vertices.push(baseR*Math.cos(t));		//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t));	//x component
		norms.push(0.0);				//y component
		norms.push(baseR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH + centerH);					//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
		//top right corner of triangle-pair
		vertices.push(baseR*Math.sin(t+ pi2/cyl_div));	//x coord
		vertices.push(baseH+centerH+topH);				//y coord
		vertices.push(baseR*Math.cos(t+ pi2/cyl_div));	//z coord
		vertices.push(1.0);
		vertices.push((t * cyl_div/pi2) % 2);
		vertices.push(0.0);
		//Its normal
		norms.push(baseR*Math.sin(t+ pi2/cyl_div));	//x component
		norms.push(0.0);							//y component
		norms.push(baseR*Math.cos(t+ pi2/cyl_div));	//z component
	}
	var domeV = [];
	var domeN = [];
	var dome_div = 9;
	//half sphere: components of normals are equal to the position components
	for (s = 0; s < Math.PI / 2; s += (Math.PI / 2)/dome_div){
		for (t = 0; t < pi2; t += pi2/cyl_div){
			//First triangle of triangle pair
			//first vertex
			domeV.push(baseR*Math.sin(s)*Math.sin(t));	//x coord
			domeV.push(baseR*Math.cos(s));				//y coord
			domeV.push(baseR*Math.sin(s)*Math.cos(t));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s)*Math.sin(t));	//x component
			domeN.push(baseR*Math.cos(s));				//y component
			domeN.push(baseR*Math.sin(s)*Math.cos(t));	//z component
			//Second vertex
			domeV.push(baseR*Math.sin(s)*Math.sin(t + pi2/cyl_div));	//x coord
			domeV.push(baseR*Math.cos(s));								//y coord
			domeV.push(baseR*Math.sin(s)*Math.cos(t + pi2/cyl_div));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s)*Math.sin(t + pi2/cyl_div));	//x component
			domeN.push(baseR*Math.cos(s));								//y component
			domeN.push(baseR*Math.sin(s)*Math.cos(t + pi2/cyl_div));	//z component
			//third vertex
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t));	//x coord
			domeV.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));				//y coord
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t));	//x component
			domeN.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));				//y component
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t));	//z component
			
			//Second triangle
			//repeat third vertex
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t));	//x coord
			domeV.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));				//y coord
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t));	//x component
			domeN.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));				//y component
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t));	//z component
			//repeat second vertex
			domeV.push(baseR*Math.sin(s)*Math.sin(t + pi2/cyl_div));	//x coord
			domeV.push(baseR*Math.cos(s));								//y coord
			domeV.push(baseR*Math.sin(s)*Math.cos(t + pi2/cyl_div));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s)*Math.sin(t + pi2/cyl_div));	//x component
			domeN.push(baseR*Math.cos(s));								//y component
			domeN.push(baseR*Math.sin(s)*Math.cos(t + pi2/cyl_div));	//z component
			//fourth vertex
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t + pi2/cyl_div));	//x coord
			domeV.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));							//y coord
			domeV.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t + pi2/cyl_div));	//z coord
			domeV.push(1.0);
			domeV.push((t * cyl_div/pi2) % 2);
			domeV.push(0.0);
			//normal
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.sin(t + pi2/cyl_div));	//x component
			domeN.push(baseR*Math.cos(s + Math.PI/(2*dome_div)));							//y component
			domeN.push(baseR*Math.sin(s + Math.PI/(2*dome_div))*Math.cos(t + pi2/cyl_div));	//z component
		}
	}
	var barV = [];
	var barN = [];
	//Side of bar cylinders for carousel: normals will be straight out, parallel to xz-plane
	for (t = 0; t < pi2; t += pi2/cyl_div){
		//First triangle of triangle pair
		//bottom left corner of triangle-pair
		barV.push(barR*Math.sin(t));	//x coord
		barV.push(baseH);				//y coord
		barV.push(barR*Math.cos(t));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t));	//x component
		barN.push(0.0);					//y component
		barN.push(barR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		barV.push(barR*Math.sin(t+ pi2/cyl_div));	//x coord
		barV.push(baseH);							//y coord
		barV.push(barR*Math.cos(t+ pi2/cyl_div));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t+ pi2/cyl_div));	//x component
		barN.push(0.0);								//y component
		barN.push(barR*Math.cos(t+ pi2/cyl_div));	//z component
		//top left corner of triangle-pair
		barV.push(barR*Math.sin(t));	//x coord
		barV.push(centerH+baseH);		//y coord
		barV.push(barR*Math.cos(t));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t));	//x component
		barN.push(0.0);					//y component
		barN.push(barR*Math.cos(t));	//z component
		
		//Second triangle
		//top left corner of triangle-pair
		barV.push(barR*Math.sin(t));	//x coord
		barV.push(centerH+baseH);		//y coord
		barV.push(barR*Math.cos(t));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t));	//x component
		barN.push(0.0);					//y component
		barN.push(barR*Math.cos(t));	//z component
		//bottom right corner of triangle-pair
		barV.push(barR*Math.sin(t+ pi2/cyl_div));	//x coord
		barV.push(baseH);							//y coord
		barV.push(barR*Math.cos(t+ pi2/cyl_div));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t+ pi2/cyl_div));	//x component
		barN.push(0.0);								//y component
		barN.push(barR*Math.cos(t+ pi2/cyl_div));	//z component
		//top right corner of triangle-pair
		barV.push(barR*Math.sin(t+ pi2/cyl_div));	//x coord
		barV.push(centerH+baseH);					//y coord
		barV.push(barR*Math.cos(t+ pi2/cyl_div));	//z coord
		barV.push(0.25);
		barV.push(0.25);
		barV.push(0.25);
		//Its normal
		barN.push(barR*Math.sin(t+ pi2/cyl_div));	//x component
		barN.push(0.0);								//y component
		barN.push(barR*Math.cos(t+ pi2/cyl_div));	//z component
	}
	
	NUM_CAR_V = vertices.length/6;
	NUM_DOME_V = domeV.length/6;
	NUM_BAR_V = barV.length/6;
	C_VERTICES = vertices;
	D_VERTICES = domeV;
	BAR_VERTICES = barV;
	C_NORMALS = norms;
	D_NORMALS = domeN;
	BAR_NORMALS = barN;
	CAR_HEIGHT = baseH + centerH + topH;
}