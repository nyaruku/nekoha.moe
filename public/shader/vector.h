#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backbuffer;


//反復回数(constで書く方も多い)
         #define ITE_MAX      100

#define DIST_COEFF   .66
 //打ち切り係数
         #define DIST_MIN     0.01

         //t最大
         #define DIST_MAX     10000.0


  #define inf 100000
	#define PI 3.14159276

	#define UnitWindow_Size 50.0

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 22.1414))) * 43758.5453);
}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
	
float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}


mat3 rotM(vec3 axis,float angle){

  axis = normalize(axis);
	float s = sin(angle);
	float c = cos(angle);
	float oc = 1.0 - c;

	return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s,
	oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s,
	oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c);}
vec3 GenRay(vec3 dir,vec3 up,float angle){

	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 u = normalize(cross(up, dir));
	vec3 v = normalize(cross(dir, u));

	float fov = angle * PI * 0.5 / 180.;

	return  normalize(sin(fov) * u * p.x + sin(fov) * v * p.y + cos(fov) * dir);}

float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}


float sdCross( in vec3 p )
{
  float da = sdBox(p,vec3(100.,1.,1.));
  float db = sdBox(p,vec3(1.,100.,1.));
  float dc = sdBox(p,vec3(1.,1.,100.));
  return min(da,min(db,dc));
}

float Cs( in vec3 p )
{
	
	float d;
        vec3 c = vec3(4.);
	p -= 0.5*c;
	p = mod(p,c) - 0.5*c;
	d = sdCross(p);
	return d;
   
}

float men(vec3 p,float d){
	float s = 1./3.;
	float ratio = 1./(3.+2.);
	for(int i = 0;i<3;i++){
		
		vec3 r = p/s;
		r -= vec3(0.);
		d = max(d,-Cs(r)*s);
		s *= ratio;
	}
	return d;
}
float sdCylinder( vec3 p, vec3 c )
{
  return length(p.xz-c.xy)-c.z;
}

float tunnel(vec3 p){
	float d = 999.;
	d = sdCylinder(p,vec3(0.,0.,4.));
	d = max(d,-sdCylinder(p,vec3(0.,0.,3.9)));
	return d;
}

float collapted(vec3 p){
float d = 9999.;
//p = mod(p,12.) - vec3(6);
d = length(p) - 2.4;
float R = 13.;
//d = sdBox(p,vec3(3.+2.*sin(time*0.3)));
//d = min(d,length(p-vec3(R*cos(time*0.2),0.,R*sin(time)))-3.4+2.*sin(time*3.));
//d = men(p,d);
d = min(tunnel(p-vec3(0.,0.,sin(p.y*0.2))),d);
//d = max(sdBox(p,vec3(5.,100.,5.)),d);
d = max(d,-Cs(p*rotM(vec3(0.,1.,0.),p.y*.4)));
	//d = hivemap(p);
return d;
}

float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
{
    vec3 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
 return length( pa - ba*h ) - r;
}

float glow = 99990.;
float map(vec3 p){
	float d =0.;
	d = sdBox(p,vec3(1.,1.,1.));
	//d = min(d,p.z+3.);
	
	
	
	
	
	
	vec3 q = p;
	vec3 c = vec3(5.,5.,3.);
	vec2 index = floor((p.xy)/c.xy);
	
	q.xy = mod(q.xy,c.xy)-0.5*c.xy;
	d = min(d,length(q)-.1);
	
	float h = noise(index);
	vec2 up = vec2(index.x,index.y+1.);
	vec2 down = vec2(index.x,index.y-1.);
	vec2 right = vec2(index.x +1.,index.y);
	vec2 left = vec2(index.x -1.,index.y);
	
	float dc = sin(time*rand(index)*4.-rand(index)*0.4);
	float dup = sin(time*rand(up)*4.-rand(up)*0.4);
	float ddown = sin(time*rand(down)*4.-rand(down)*0.4);
	float dright = sin(time*rand(right)*4.-rand(right)*0.4);
	float dleft = sin(time*rand(left)*4.-rand(left)*0.4);
	d = min(d,sdCapsule(q,vec3(0.,0.,h+dc),vec3(c.x,0.,noise(right)+dright),0.01));
	d = min(d,sdCapsule(q,vec3(0.,0.,h+dc),vec3(-c.x,0.,noise(left)+dleft),0.01));
	d = min(d,sdCapsule(q,vec3(0.,0.,h+dc),vec3(.0,c.y,noise(up)+dup),0.01));
	d = min(d,sdCapsule(q,vec3(0.,0.,h+dc),vec3(.0,-c.y,noise(down)+ddown),0.01));
	
	glow = min(glow,d);
	
	
return d;

}
vec3 getnormal(vec3 p){

float d = 0.01;
return normalize(vec3(
map(p + vec3(d, 0.0, 0.0)) - map(p + vec3(-d, 0.0, 0.0)),
map(p + vec3(0.0, d, 0.0)) - map(p + vec3(0.0, -d, 0.0)),
map(p + vec3(0.0, 0.0, d)) - map(p + vec3(0.0, 0.0, -d))
));
}
void main( void) { 
vec3 l = normalize(vec3(.2, -.99, .99));
//eye座標
vec3 pos = vec3(3.*cos(time),3.*sin(time),4.);
vec3 target;
target = vec3(0.,0.,0.);
vec3 center_dir = (target - pos);
vec3 dir;
vec3 up = vec3(.0, 0., 1.);
dir = GenRay(normalize(center_dir), up, 120.);


float t = 0.0;
         	
		 float dist = 0.;
         	//SphereTracing。ここintersectって名前で別に作る人も多いです
	        int ite = 0;
         	for(int i = 0 ; i < ITE_MAX; i++) {

         		//形状表現した陰関数を反復しながら解く
         		//0(DIST_MIN)に近くなったら解に近いので打ち切り
         		dist = map((t * dir + pos));
         		if(dist < DIST_MIN) {
				break;
			}
         		
         		//tを更新。DIST_COEFFは複雑な形状を描画する際に小さく為につけています。
         		//ちょっとずつレイを進める事ができます。
         		t += dist * DIST_COEFF;
			
			if(t > DIST_MAX){
				break;
			}
			ite++;
         	}

//option形状の近くの位置を出しておく
vec3 ip = pos + dir * t;
//色を作ります。ここでは進めたtの位置(深度)をただ出力するだけ
vec3 point = vec3(0.,time + 1.,0.);
vec3 color = vec3(0.);
 vec3 n = getnormal(ip);
if(dist < DIST_MIN){
	float diff = dot(l,n);
	//color = vec3(0.9,0.9,0.9) * clamp(diff,0.1,1.);
	color = vec3(1.);		
}else {
 	color +=  .04/glow;

}
	//color += clamp((1.-14./t),0.,1.)*vec3(.8,.9,.9);
        	
gl_FragColor = vec4(color, 1.0);
gl_FragColor = mix(gl_FragColor, (texture2D(backbuffer, gl_FragCoord.xy / resolution.xy) + texture2D(backbuffer, gl_FragCoord.xy / resolution.xy + vec2(0.001, 0.001)) +texture2D(backbuffer, gl_FragCoord.xy / resolution.xy + vec2(-0.001, -0.001))) / 3.0, 0.5);
}