import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
// Sizes 
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***************
 ** SCENE **
 **************/
 // Canvas 
 const canvas = document.querySelector(".webgl")

 // Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("black")

 //Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

 // Renderer 
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
 })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/

 // Cave 
 const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
 const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#E6D9F2"),
    side: THREE.DoubleSide
 })
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI *0.5
cave.receiveShadow = true
scene.add(cave)

// Object 1 (Box A)
const boxAGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const boxAMaterial = new THREE.MeshStandardMaterial({
   color: "purple"
})
const boxA = new THREE.Mesh(boxAGeometry, boxAMaterial)
boxA.position.set(15, 2, -0.5)
boxA.castShadow = true
scene.add(boxA)

// Object 2 (Box B)
const boxBGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const boxBMaterial = new THREE.MeshStandardMaterial({
   color: "blue"
})
const boxB = new THREE.Mesh(boxBGeometry, boxBMaterial)
boxB.position.set(15, 2, 0.5)
boxB.castShadow = true
scene.add(boxB)

 /***********
  ** LIGHTS **
  ***********/

// Directional Light
 const directionalLight = new THREE.DirectionalLight(
    new THREE.Color("white"),
    0.5
 )
scene.add(directionalLight)
directionalLight.intensity = 1
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/******************** 
** DOM INTERACTIONS**
*********************/
const domObject = {
   part:1,
   firstChange: false,
   secondChange: false,
   thirdChange: false,
   fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function () {
   domObject.part = 1
}

//part-two
document.querySelector('#part-two').onclick = function () {
   domObject.part = 2
}

// first-change
   document.querySelector('#first-change').onclick = function() {
      domObject.firstChange = true
   }

// second-change
   document.querySelector('#second-change').onclick = function() {
      domObject.secondChange = true
}

// third-change
   document.querySelector('#third-change').onclick = function() {
      domObject.thirdChange = true
}

// fourth-change
   document.querySelector('#fourth-change').onclick = function() {
      domObject.fourthChange = true
}

/**********
 ** UI **
 *********/

 /******************
  ** ANIMATION LOOP**
******************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

   //console.log(camera.position) use this to find camera positioning

   // part-one
   if(domObject.part === 1)
   {
         camera.position.set(6, 0, 0)
         camera.lookAt(0, 0, 0)
   }

   //part-two
if(domObject.part === 2)
   {
      camera.position.set(25, 1, 0)
      camera.lookAt(0, 0, 0)
   }

   // first-change (merge wider)
   if(domObject.firstChange)
   {
      boxB.position.z += (0 - boxB.position.z) *0.05
   }

   //second-change (stretch upwards)
if(domObject.secondChange)
   {
      boxB.position.y += (2.5 - boxB.position.y) *0.05
   }

   //third-change (seperate objects)
   if(domObject.thirdChange)
   {
      boxB.position.z += (3 - boxB.position.z) *0.05
      boxB.position.y += (2 - boxB.position.y) *0.05
      boxB.position.z += (3 - boxB.position.z) *0.05
   }

   //fourth-change (merge objects again)
   if(domObject.fourthChange)
   {
     boxA.position.z += (0 - boxA.position.z) *0.1
     boxB.position.z += (0 - boxB.position.z) *0.1
     boxA.position.y += (2 - boxA.position.y) *0.05
     boxB.position.y += (2 - boxB.position.y) *0.05
 }
   
    // Update OrbitControls
    controls.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    //Request next frame 
    window.requestAnimationFrame(animation)
}

animation()