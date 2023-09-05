import * as THREE from 'three';

// Shaders
// Vertex shader
const vertexShader = 
  "uniform float time;" +
  "varying vec2 vUv;" +
"void main() " +
"{" +
"   vUv = uv;" +
"   vec3 newPosition = position;" +
"   newPosition.z += sin(time + position.x * 3.0) * 0.2;" +
"   gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);" +
"}";

// Fragment shader
const fragmentShader = 
 " uniform sampler2D textureMat;" +
 " varying vec2 vUv;" +
" void main()" +
"{" +
  "  vec4 texColor = texture(textureMat, vUv);" +
   "gl_FragColor = texColor;" +
  "}"
;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane geometry
const planeGeometry = new THREE.PlaneGeometry(5, 3, 32, 32);

// Load a texture
const textureLoader = new THREE.TextureLoader();
const textureMat = textureLoader.load("texture/mat.jpg");

console.log(textureMat);

// Create a shader material
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { value: 0.0 }, // Uniform for time
        textureMat: { value: textureMat }, // Passed texture to the shader
    },
});

// Create a plane mesh with the shader material
const plane = new THREE.Mesh(planeGeometry, shaderMaterial);

// Add the plane to the scene
scene.add(plane);

// Game loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update the 'time' uniform to animate the sine wave
    shaderMaterial.uniforms.time.value += 0.01;

    // Rotate the plane(in radians)
    const angleInDegreesX = -70; // Change this to your desired rotation angle
    const angleInRadians = THREE.MathUtils.degToRad(angleInDegreesX);
    plane.rotation.set(angleInRadians ,0, angleInRadians);

    // Render the scene with the camera
    renderer.render(scene, camera);
};

animate();
