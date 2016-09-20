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
vec4 SurfaceToEye = normalize(vec4(cameraPosition,1) - vNormal);
vec4 SurfaceToLight = normalize(vec4(lightDirection,1) - vPosition);

vec4 Light = normalize(vec4(lightDirection,1));

//Ambient
vec4 Ambient = vec4(Ka,1) * vec4(Ia,1);

//Diffuse
vec4 Diffuse = vec4(Kd,1) * vec4(Id,1) * max(0.0,dot(SurfaceNormal,SurfaceToLight)) * 0.5f;

//Specular
vec4 ReflectionVector = 2 * dot(Light,SurfaceNormal) * SurfaceNormal - Light;
vec4 reflectNorm = normalize(ReflectionVector);
float specularTerm = pow(max(0, dot(reflectNorm,SurfaceToEye)), specularPower);

vec4 Specular = vec4(Ks,1) * specularTerm * vec4(Is,1);

fragColor = Ambient + Diffuse + Specular;

}