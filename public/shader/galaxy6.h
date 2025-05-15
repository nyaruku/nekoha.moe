#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;

float snow(vec2 uv,float scale)
{
	float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;
	//uv+=time/scale;
	//uv.y+=time*2./scale;
	uv.x+=(time*2.0)/scale;
	uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=1.,d;
	p=.10+.55*sin(111.*fract(sin((s+p+scale)*mat2(7,2,6,5))-1.))-f;d=length(p);k=min(d,k);
	k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
    	return k*w;
}

void main(void){
	vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y); 
	vec3 finalColor=vec3(0);
	float c=smoothstep(0.1,0.0,clamp(uv.y*.1+.9,0.,1.75));
	c+=snow(uv,30.)*.3;
	c+=snow(uv,20.)*.5;
	c+=snow(uv,15.)*.8;
	c+=snow(uv,5.);
	c+=snow(uv,5.);
	c+=snow(uv,7.);
	c+=snow(uv,2.);
	finalColor=(vec3(c*1.0, c*1.0, c*1.0));
	gl_FragColor = vec4(finalColor,1);
}
