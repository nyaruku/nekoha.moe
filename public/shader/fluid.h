#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 sin2(vec2 p) {
	return abs(vec2(sin(p.x + sin(p.y)), sin(p.y + sin(p.x))));
}

float sineNoise2d(vec2 p)
{
	mat2 m2 = mat2(0.8701,  0.2223, -0.18421,  0.91270);
	float rz = 0.0;
	float z = 1.4;
	vec2 bp = p;
	for(float i = 0.0; i < 5.0; i++) {
		vec2 dg = sin2(bp*2.0) * 0.751;
        	p += (dg + time * 0.1);

        	bp *= 1.8;
		p *= 1.2;
		p *= m2;
        	float c = p.y + abs(fract(p.x) - 0.5);
		float s = abs(fract(c) - 0.5);
        	rz += s / z;
        	bp += 0.14;
	}
	rz = 1.0 / rz;
	rz *= 0.1;
	return rz;
}

void main( void ) {

	vec2 p = ( gl_FragCoord.xy / resolution.xy );
	p = 2.0 * p - 1.0;
	p.x *= resolution.x / resolution.y; // aspect ratio fix
	p *= 1.0;
	float noise = sineNoise2d(p);
	gl_FragColor = vec4(noise, noise, noise, 1.0);
	
}