#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;

float snow(vec2 uv,float scale){
	uv.x+=(time*2.0)/scale;
	uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=1.,d;
	p=.10+.55*sin(16.*fract(sin((s+p+scale)*mat2(7,2,6,5))-1.))-f;d=length(p);k=min(d,k);
	k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
    	return k;
}

void main(void){
	vec2 uv=2.*(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y); 
	vec3 finalColor=vec3(0);
	float c;
	
	c+=snow(uv,3.);
	c+=snow(uv,2.);
	c+=snow(uv,1.);
	finalColor=(vec3(.0, .0, c*1.0));
	gl_FragColor = vec4(finalColor,1);
}
