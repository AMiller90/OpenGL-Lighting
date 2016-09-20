// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;
out vec4 fragColor;

uniform vec3 Ka;
uniform vec3 Ia;
uniform vec3 Kd;
uniform vec3 Id;
uniform vec3 Ks;
uniform vec3 Is;

uniform vec3 lightDirection;
uniform vec3 cameraPosition;
uniform float specularPower;

void main()
{
	//N - Direction of Normal
	vec3 SurfaceNormal = normalize(vNormal.xyz);
	//V - Direction of Surface to camera
	vec3 SurfaceToEye = normalize(cameraPosition - vNormal.xyz);
	//Lm - Direction of Light from point on surface to the light
	vec3 SurfaceToLight = normalize(lightDirection);


	float lambertTerm = max(0.0,dot(SurfaceNormal,SurfaceToLight));

	//Ambient
	vec3 Ambient = Ka * Ia;

	//Diffuse - The 0.5f Tones down the diffuse
	vec3 Diffuse = Kd * Id * lambertTerm * 0.5f;

	//Specular
	//The reflection vector is the vector that will be the reflection of the SurfaceToLight vector
	vec3 ReflectionVector = 2 * dot(SurfaceNormal,SurfaceToLight) * SurfaceNormal - SurfaceToLight;
	//According to the Phong equation the vector must be normalized
	vec3 reflectNorm = normalize(ReflectionVector);
	//Raise the dot product to a given power
	float specularTerm = pow(max(0, dot(reflectNorm,SurfaceToEye)), specularPower);

	//Specular
	vec3 Specular = Ks * specularTerm * Is;

	fragColor = vec4(Ambient + Diffuse + Specular,1);





}