#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D backbuffer;

void main() {
	
	vec2 pos=(gl_FragCoord.xy/resolution.y);
	
	if(pos.x <= 1.5/resolution.x && pos.y <= 1.5/resolution.y){
		gl_FragColor = vec4(0.,mouse.x,mouse.y,fract(time));
		return;
	}
	vec3 frame_delta = vec3(mouse.x,mouse.y,fract(time))-texture2D(backbuffer, vec2(0.5)/resolution).yzw;
	float d_mouse_y = frame_delta.y;
	
	float dampen_away_from_xmouse = (0.5/pow(.9+abs(gl_FragCoord.x/resolution.x-mouse.x), 8.));
	float amplitude = dampen_away_from_xmouse*8.*d_mouse_y;
	float octave = floor((mouse.x-.5)*8.);
	float center_frequency = 404.;
	float scan_width_radians = 100.;
	float frequency = (time*center_frequency+pos.x*scan_width_radians)*pow(2., octave);
	
	pos.y += amplitude*sin(frequency);
	pos.y = fract(pos.y);
	
	pos.x-=resolution.x/resolution.y/0.5;
	pos.y-=0.;
	
	float fx=0.5;
	float dist=abs(pos.y-fx)*1500.;
	gl_FragColor+=vec4(0.5/dist,1./dist,1.0/dist,1.);
	gl_FragColor=max(
		vec4(0.5/dist,1./dist,1.0/dist,1.)
		, vec4(0.9,0.96,0.98,1)*texture2D(backbuffer, fract((gl_FragCoord.xy+vec2(0,5))/resolution))
	);
	
}