/*
code this disgraceful should not produce such elegance
*/

#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float what(vec2 position) {
	float real_time = time / 100.0;
	
	float dist  = distance(position, vec2(0.5-(sin(real_time)/100.0)+tan(2.0*position.y),0.5-(cos(real_time)/135.0)));
	float dist2 = distance(position, vec2(0.0+(sin(real_time)/100.0),1.0+(cos(real_time)/135.0))-tan(2.0*1.0-position.y));
	float dist3 = distance(position, vec2(1.0-(sin(real_time)/100.0)+tan(2.0*(1.0-position.y)),0.0+(cos(real_time)/135.0)));
	float wtf = (sin(3.14159*(dist+real_time/50.0)*10.0)+cos(3.14159*(dist2+real_time/50.0)*10.0)+sin(3.14159*(dist3+real_time/50.0)*10.0))/3.0;
	wtf = 1.0-abs(wtf);
	
	wtf = pow(wtf, 500.0);
	
	//wtf = ceil(wtf);
	
	//	wtf += 0.5;
	return wtf;
}

void main( void ) {
	vec2 position = ( gl_FragCoord.xy / resolution.xy );
	position.y *= 0.5;
	position.y += 0.25;
	/*

	position -= 0.5;
	position *= 2.0;
	position += 1.0;

	float real_time = time / 10.0;
	
	float dist  = distance(position, vec2(0.5-(sin(real_time)/100.0)+tan(2.0*position.y),0.5-(cos(real_time)/135.0)));
	float dist2 = distance(position, vec2(0.0+(sin(real_time)/100.0),1.0+(cos(real_time)/135.0))-tan(2.0*1.0-position.y));
	float dist3 = distance(position, vec2(1.0-(sin(real_time)/100.0)+tan(2.0*(1.0-position.y)),0.0+(cos(real_time)/135.0)));
	float wtf = (sin(3.14159*(dist+real_time/50.0)*10.0)+cos(3.14159*(dist2+real_time/50.0)*10.0)+sin(3.14159*(dist3+real_time/50.0)*10.0))/3.0;
	wtf = 1.0-abs(wtf);
	
	wtf = pow(wtf, 100.0);
	*/
	
	//wtf = ceil(wtf);
	
	//	wtf += 0.5;
	
	vec2 pos2 = position;
	pos2.x += 0.001;
	pos2.y += 0.001;
	
	vec2 pos3 = position;
	pos3.x -= 0.001;
	pos3.y += 0.001;
	
	vec2 pos4 = position;
	pos4.x -= 0.001;
	pos4.y -= 0.001;
	
	float wtf = what(position);
	float wtf2 = what(pos2);
	float wtf3 = what(pos3);
	float wtf4 = what(pos4);
	
	
	vec3 col = vec3(
		wtf-wtf4*wtf,
		wtf-wtf2*wtf,
		wtf-wtf3*wtf
		//wtf/10.0
	);	

	gl_FragColor = vec4( col, 1.0 );

}