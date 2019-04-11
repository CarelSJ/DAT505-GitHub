# SESSION 8
The file name with Example is the case study in class.
The file name with Homework is the relevant homework about this session.
The file name with Exercise is the exercise about this session.
In this session,we learned the method of Mouse Click Interaction (Random Color Transform).
And the Import of model.
And the Strengthen of Eyes Interaction ( Let the center of all eyes always follow the movement of the mouse.)
Let the eye coordinates in all spaces(3D) turn into Planar coordinate system (2D).

Code -- let the eyes follow the mouse to rotate.
for (var i = 0; i < eyesNum; i++) {

  eyes[0].rotation.y = map_range(mouseX, 0, window.innerWidth, -1.14, 1.14);
  eyes[0].rotation.x = map_range(mouseY, 0, window.innerHeight, -1.14, 1.14);

  if (mouseX<140) eyes[1].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
      else eyes[1].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
      if (mouseY<810) eyes[1].rotation.x = map_range(mouseY, 0, 810, -1.14, -0.25);
      else eyes[1].rotation.x = map_range(mouseY, 810, window.innerHeight, -0.25, 0);

      if (mouseX<140) eyes[3].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
      else eyes[3].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
      if (mouseY<35) eyes[3].rotation.x = map_range(mouseY, 0, 35, 0, 0.25);
      else eyes[3].rotation.x = map_range(mouseY, 35, window.innerHeight, 0.25, 1.14);

      if (mouseX<1650) eyes[2].rotation.y = map_range(mouseX, 0, 1650, -1.14, 0);
      else eyes[2].rotation.y = map_range(mouseX, 1650, window.innerWidth,0, 0.3 );
      if (mouseY<810) eyes[2].rotation.x = map_range(mouseY, 0, 810, -1.14, 0);
      else eyes[2].rotation.x = map_range(mouseY, 810, window.innerHeight, 0, 0.2);

      if (mouseX<1650) eyes[4].rotation.y = map_range(mouseX, 0, 1650, -1.14, 0);
      else eyes[4].rotation.y = map_range(mouseX, 1650, window.innerWidth, 0, 0.3);
      if (mouseY<35) eyes[4].rotation.x = map_range(mouseY, 0, 35, 0, -0.25);
      else eyes[4].rotation.x = map_range(mouseY, 35, window.innerHeight, 0.25, 1.14)
}

Code -- Mouse Click Control 
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
window.addEventListener( 'resize', onWindowResize, false );
