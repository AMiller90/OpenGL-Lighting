// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

uniform vec3 lightDirection;

uniform vec3 Kd;
uniform vec3 Id;
uniform vec3 Ka;
uniform vec3 Ia;
uniform vec3 Ks;
uniform vec3 Is;

uniform vec3 cameraPosition;

uniform float specularPower;

out vec4 fragColor;

void main() 
{

vec4 SurfaceNormal = normalize(vNormal);
vec3 SurfaceToLight = normalize(lightDirection);

//Ambient
vec4 Ambient = vec4(Ka,1) * vec4(Ia,1);

//Diffuse
vec4 Diffuse = vec4(Kd,1) * vec4(Id,1) * dot(SurfaceNormal,vec4(SurfaceToLight,1)) * 0.5f;


fragColor = Ambient + Diffuse;
}