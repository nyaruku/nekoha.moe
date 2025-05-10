//--- hatsuyuki ---
// by Catzpaw 2016
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float snow(vec2 uv, float scale)
{
    float w = smoothstep(1.0, 0.0, -uv.y * (scale / 10.0));
    if (w < 0.1) return 0.0;
    uv += time / scale;
    uv.y += time * 2.0 / scale;
    uv.x += sin(uv.y + time * 0.5) / scale;
    uv *= scale;
    vec2 s = floor(uv), f = fract(uv), p;
    float k = 3.0, d;
    p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + p + scale) * mat2(7.0, 3.0, 6.0, 5.0)) * 5.0)) - f;
    d = length(p);
    k = min(d, k);
    k = smoothstep(0.0, k, sin(f.x + f.y) * 0.01);
    return k * w;
}

void main(void)
{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    vec3 bgColor = vec3(0.0); // Pure black background
    vec3 finalColor = bgColor;

    // Calculate snowflake intensity
    float snowflakes = 0.0;
    snowflakes += snow(uv, 30.0) * 0.3;
    snowflakes += snow(uv, 20.0) * 0.5;
    snowflakes += snow(uv, 15.0) * 0.8;
    snowflakes += snow(uv, 10.0);
    snowflakes += snow(uv, 8.0);
    snowflakes += snow(uv, 6.0);
    snowflakes += snow(uv, 5.0);

    // Snow color (unchanged)
    vec3 snowColor = vec3(1.0);
    finalColor = mix(bgColor, snowColor, snowflakes);

    // Glow effect calculation
    float glowIntensity = smoothstep(1.0,.9, 1.0 - snowflakes);
    vec3 glowColor = vec3(0.0, 0.0, 0.2); // Keep the same glow color
    finalColor += glowColor * glowIntensity;

    gl_FragColor = vec4(finalColor, 1.0);
}
