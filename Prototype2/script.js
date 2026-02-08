import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***************
 ** SCENE **
 **************/
 // Canvas 
 const canvas = document.querySelector(".webgl")

 // Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("#E6D9F2")

 //Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(2, 2, -5)

 // Renderer 
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/

// Torus Shape 
const geometry = new THREE.TorusGeometry( 1.5, 0.5, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x6A0572 } );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("white"),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI *0.5

scene.add(plane)

/**********
 ** UI **
 *********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 0.1,
    rotationSpeed: 1

}

// plane UI
const planeFolder = ui.addFolder("Plane")

planeFolder
    .add(planeMaterial, "wireframe")
    .name("Toggle wireframe")

    // torus UI
const torusFolder = ui.addFolder( "Torus" )

torusFolder
   .add(uiObject, "speed")
   .min(0.1)
   .max(10)
   .step(0.1)
   .name ("Rotation Speed")

   torusFolder
   .add(uiObject, "distance")
   .min(0.1)
   .max(10)
   .step(0.1)
   .name("Distance")
    
 /******************
  ** ANIMATION LOOP**
******************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate torus
    torus.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
         torus.rotation.x += 0.01 * uiObject.speed
        torus.rotation.y += 0.015 * uiObject.speed

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    //Request next frame 
    window.requestAnimationFrame(animation)
}

animation()