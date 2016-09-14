////////////////////////////////////////////////////////////////////
//	Mitchell Timson
//	0598608
//	COSC3307 - R&D project
//	A Normal Merry-Go-Round
////////////////////////////////////////////////////////////////////

//Shader program sources, similar to code from quiz3 example
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'attribute vec4 a_Color;\n' +
	'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  //vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\n' + // Surface color (white)
	'  vec4 color = vec4(1.0, 0.8431, 0.0, 1.0);\n' + // Surface color (gold)
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = a_Color;\n' + 
	'}\n';

var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
     // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
     // The dot product of the light direction and the normal
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
  '}\n';

//Globals, each used in many functions, including some in tree file
var gl;		//gl context
//Matrix4 objects for computing transformations
var g_modelMatrix = new Matrix4();
var g_viewProjMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();  // Coordinate transformation matrix for normals
//Uniform variables from shader programs
var u_MvpMatrix;
var u_ModelMatrix;
var u_NormalMatrix;
var u_LightColor;
var u_LightPosition;
var u_AmbientLight;

var params;	//Contains all parameters

var enableAnimate = false;	//true enables animation
var enableFlyBy = false;	//True during fly by
var flyStart;				//Start time of fly by
var g_lastFrame				//Time of previous animation frame

var RAD_FACTOR = Math.PI / 180;	//Factor to convert degrees to radians

function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');
	
	// Get the rendering context for WebGL
	gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to intialize shaders.');
		return;
	}
	//Initialize the Array buffers 
	if (initVertexBuffers() < 0) {
		console.log('Failed to set the vertex information');
		return;
	}
	// Set the clear color and enable the depth test
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);	
	
	// Get the storage locations of uniform variables
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
	u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
	u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
	if (!u_ModelMatrix || !u_MvpMatrix || !u_NormalMatrix || !u_LightColor || !u_LightPosition || !u_AmbientLight) { 
		console.log('Failed to get the storage location');
		return;
	}
	
	//Get the parameters form and create parameter objects
	var form = document.getElementById('formSliders');
	params = new Object(); 
	var paramsDefault = new Object();
	
	//Get initial parameters
	var field;
	for (var i = 0; i < form.elements.length; i++) {
		field = form.elements[i];
		params[field.name] = parseFloat(field.value);
		paramsDefault[field.name] = parseFloat(field.value);
	}
	//Update matrices based on current parameters
	update(canvas);
	
	//Clear canvas and draw initial scene
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	draw(carousel);
	
	//Initiallize all event handlers
	initEventHandlers(form, canvas, paramsDefault);
	
	//tick draws the frame
	var tick = function() {
		//Find time elapsed since last frame
		var now = Date.now();
		var elapsed = now - g_lastFrame;
		g_lastFrame = now;
		
		animate(elapsed);	//Update component positions
		if(enableFlyBy) {	//Update eye position based on fly by if enabled
			flyBy();
		}
		
		update(canvas);		//Update matrices based on current parameters
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		draw(carousel);		//Draw all objects
		requestAnimationFrame(tick, canvas);
	};
	tick();
}

//Initializes all event handlers for mouse, form, and button events
function initEventHandlers(form, canvas, defaults) {
	//Update params when the form is changed
	form.oninput = function(ev) {
		//Find udated element
		var evtemp = ev.srcElement;	
		var id = evtemp['id'];
		var field = document.getElementById(id);
		
		//Update changed element in params
		params[field.name] = parseFloat(field.value);
 	
		// Redraw
		update(canvas);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		draw(carousel);
	}
	//////////////////////////////////////////////////
	//	Button handlers
	//////////////////////////////////////////////////
	
	//Get button IDs
	var animateButton = document.getElementById('animateButton');
	var flyByButton = document.getElementById('flyButton');
	var resetButton = document.getElementById('resetButton');
	
	//Changes form back to defaults
	resetButton.onclick = function(ev) {
		enableAnimate = false;
		enableFlyBy = false;
		for (var i = 0; i < form.elements.length; i++) {
			field = form.elements[i];
			field.value = defaults[field.name];
			params[field.name] = defaults[field.name];
		}
		// Redraw
		update(canvas);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		draw(carousel);
	};
	
	//Toggle each animation
	animateButton.onclick = function(ev) {enableAnimate = !enableAnimate;};
	flyByButton.onclick = function(ev) {startFlyBy(form);};
	
	//////////////////////////////////////////////////
	//	Mouse handlers
	//////////////////////////////////////////////////
	//Scroll wheel zooms in and out by changing the eye distance
	canvas.onmousewheel = function(ev) {
		//Increase or decrease eye distance depending on mouse wheel input
		//with max at 15, min at 2
		params.eye = Math.max(Math.min(15, params.eye - ev.wheelDelta / 1200), 2);
		form.
		// Redraw.
		update(canvas);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		draw(carousel);
		return false;
	};
	
	//The following rotated eye position about x and y axes.
	
	var dragging = false;         // Dragging or not
	var lastX = -1, lastY = -1;   // Last position of the mouse

	canvas.onmousedown = function(ev) {   // Mouse is pressed
		var x = ev.clientX, y = ev.clientY;
		// Start dragging if a moue is in <canvas>
		var rect = ev.target.getBoundingClientRect();
		if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
			lastX = x; lastY = y;
			dragging = true;
		}
	};

	canvas.onmouseup = function(ev) { dragging = false;  }; // Mouse is released

	canvas.onmousemove = function(ev) { // Mouse is moved
		var x = ev.clientX, y = ev.clientY;
		if (dragging) {
			var factor = 100/canvas.height; // The rotation ratio
			var dx = factor * (x - lastX);
			var dy = factor * (y - lastY);
			// Limit phi to 1 to 90 degrees, so carousel is viewed from the side or above
			params.phi = Math.max(Math.min(params.phi - dy, 90.0), 1.0);
			params.theta = (params.theta - dx) % 360;
			
			update(canvas);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			draw(carousel);
		}
		lastX = x, lastY = y;
	};
}
//Update eye position during fly by
function flyBy(){
	if(g_lastFrame - flyStart > 10000){	//Fly bay lasts 10 seconds
		enableFlyBy = false;
		return;
	}
	//Parametric equation for eye path
	var t = (g_lastFrame - flyStart)/ 1000;
	params.theta = 0 + (90/10)*t;
	params.phi = 90 - (-(t*t) + 10*t);
	params.eye = 0.3*t*t - 3*t + 10;
}

//Begin the fly by or stop mid path
function startFlyBy(form) {
	enableFlyBy = !enableFlyBy;	//Toggle fly by: this allows
	if(enableFlyBy) {
		flyStart = Date.now();	//Start time of fly by
		g_lastFrame = flyStart;	
		//Beginning of path
		params.theta = 0;
		params.phi = 90;
		params.eye = 10;
	}
}
//Update carousel rotation, height of horses, and head rotation for given frame
function animate(elapsed) {
	//Max allowed values for animated parameter
	var horseMaxT = 0.12;
	var headMaxR = 18;
	//Do nothing if animation is not enabled
	if (!enableAnimate) {
		return;
	}
	//Update carousel rotation
	params.carRot = (params.carRot + params.carS * (elapsed/1000)) % 360;
	
	//set to max or min if parameter is passed
	if (Math.abs(params.horseY) > horseMaxT) {
		params.horseY = horseMaxT * (params.horseY / Math.abs(params.horseY));
		params.horseS = -params.horseS;	//reverse translation when max or min is reached
	}
	if (Math.abs(params.headRot) > headMaxR) {
		params.headRot = headMaxR * (params.headRot / Math.abs(params.headRot));
		params.headS = -params.headS;	//reverse rotation when max or min is reached
	}
	//Update parameters
	params.horseY = params.horseY + params.horseS * (elapsed/1000);
	params.headRot = params.headRot + params.headS * (elapsed/1000);
}
//Draw the tree
function draw(root) {
	//Nothing to do for null nodes
	if (root == null) {
		return;
	}
	//Store model matrix so alterations don't affect siblings
	pushMatrix(g_modelMatrix);
	root.drawNode();	//Call current node's draw function
	
	draw(root.child);	//Next level of tree
	
	g_modelMatrix = popMatrix();	//retrieve model matrix for current level
	draw(root.sibling);	//Next node in current level
}
//Update view-projection matrix
function update(canvas) {
	//Eye position cartesian coordinates
	var x_eye;
	var y_eye;
	var z_eye;
	//Convert polar coordinate eye position to cartesian
	var thetarad = RAD_FACTOR*(params.theta);
	var phirad = RAD_FACTOR*(params.phi);
	x_eye = params.eye * Math.sin(thetarad) * Math.sin(phirad);
	y_eye = params.eye * Math.cos(phirad);
	z_eye = params.eye * Math.cos(thetarad) * Math.sin(phirad);
  
	// Parameterized light position
	var thetaLight = RAD_FACTOR*(params.thetaLight);
	var phiLight = RAD_FACTOR*(params.phiLight);
	x_light = params.eyeLight * Math.sin(thetaLight) * Math.sin(phiLight);
	y_light = params.eyeLight * Math.cos(phiLight);
	z_light = params.eyeLight * Math.cos(thetaLight) * Math.sin(phiLight);
	gl.uniform3f(u_LightPosition, x_light, y_light, z_light);
	// Set the light color (white)
	gl.uniform3f(u_LightColor, params.intensity/255, params.intensity/255, params.intensity/255);

	// Set the ambient light
	gl.uniform3f(u_AmbientLight, params.ambientR/255, params.ambientG/255, params.ambientB/255);
	
	g_viewProjMatrix.setPerspective(params.fov, canvas.width/canvas.height, params.near, params.far);
	g_viewProjMatrix.lookAt(x_eye, y_eye, z_eye, 0, 0, 0, 0, 1, 0);
}
//Initialize Array buffer with data from source files
function initVertexBuffers() {
	buildCarousel();	//Build carousel vertex and normal arrays
	//Construct vertex array with vertex coordinates and 3 colour components for all parts to draw
	var vertexInfo = C_VERTICES;
	vertexInfo = vertexInfo.concat(D_VERTICES);
	vertexInfo = vertexInfo.concat(BAR_VERTICES);
	vertexInfo = vertexInfo.concat(B_VERTICES);
	vertexInfo = vertexInfo.concat(H_VERTICES);
	//Construct normal array with normal vectors for all components
	var normInfo = C_NORMALS;
	normInfo = normInfo.concat(D_NORMALS);
	normInfo = normInfo.concat(BAR_NORMALS);
	normInfo = normInfo.concat(B_NORMALS);
	normInfo = normInfo.concat(H_NORMALS); 
	
	//Convert to Float32Array objects
	var vertices = new Float32Array(vertexInfo);
	var normals = new Float32Array(normInfo);
	
	//Create Vertex buffer
	var vertexColorbuffer = gl.createBuffer();  
	if (!vertexColorbuffer) {
		console.log('Failed to create vertexColor buffer object....');
		return -1;
	}
	
	// Write the vertex coordinates and color to the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	// Assign the buffer object to a_Position and enable the assignment
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return -1;
	}
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6, 0);
	gl.enableVertexAttribArray(a_Position); 
	
	//Get location of attribute variable
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
		console.log('Failed to get the storage location of a_Color');
		return -1;
	}
	//Send data to attribute variable
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);
	
	var normalsbuffer = gl.createBuffer();  
	if (!normalsbuffer) {
		console.log('Failed to create normals buffer object....');
		return -1;
	}
	// Write the normal components to the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
	
	// Assign the buffer object to a_Position and enable the assignment
	var a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
	if(a_Normal < 0) {
		console.log('Failed to get the storage location of a_Normal');
		return -1;
	}
	gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Normal); 
	
	return 1;
}

//Matix stack operations	
var g_matrixStack = [];		//Array as stack
//push Matrix4 object to stack
function pushMatrix(m) {
	var m2 = new Matrix4(m);
	g_matrixStack.push(m2);
}
//Pop top Matrix4 object
function popMatrix() {
	return g_matrixStack.pop();
}

//Draw a node from the Array buffer from given offset and number of vertices
function drawObj(offset, n) {
	//Send model matrix to shader
	gl.uniformMatrix4fv(u_ModelMatrix, false, g_modelMatrix.elements);
	//Create MVP matrix and send to shader
	g_mvpMatrix.set(g_viewProjMatrix);
	g_mvpMatrix.multiply(g_modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
	//Compute inverse transpose matrix for modifying normals
	g_normalMatrix.setInverseOf(g_modelMatrix);
	g_normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
	
	gl.drawArrays(gl.TRIANGLES, offset, n);
}

