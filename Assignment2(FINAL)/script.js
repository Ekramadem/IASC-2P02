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

// Resizing 
window.addEventListener("resize", ()=>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update camera
    camera.updateProjectionMatrix()

    // Update rednerer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 20, 40)

 // Renderer 
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
 })
renderer.setSize(sizes.width, sizes.height)

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*********** 
** LIGHTS **
************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/************
 ** MESHES **
 ************/
// Cube Geometry
const cubeGeometry =  new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, params) =>
{
    let geometry

    // Choose geometry based on term
    if(params.term === "miles"){
        geometry = new THREE.SphereGeometry(0.5, 16, 16)
    }
    else if(params.term === "gwen"){
        geometry = new THREE.ConeGeometry(0.5, 1, 16)
    }
    else if(params.term === "spider"){
        geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32)
    }
    else{
        geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    }

    // CREATE MATERIAL
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color || "#ffffff")
    })

    // CREATE MESH 
    const mesh = new THREE.Mesh(geometry, material)

    // POSITION 
    mesh.position.x = (Math.random() - 0.5) * params.diameter * 2.5
    mesh.position.z = (Math.random() - 0.5) * params.diameter * 2.5
    mesh.position.y = height

    // SCALE
    const scale = 0.5 + height * 0.1
    mesh.scale.set(scale, scale, scale)

    // ANIMATION SPEED
    mesh.userData.speed = 0.01 + height * 0.01

    // RANDOM ROTATION
    if(params.randomized){
        mesh.rotation.x = Math.random() * Math.PI
        mesh.rotation.y = Math.random() * Math.PI
        mesh.rotation.z = Math.random() * Math.PI
    }

    // ADD TO SCENE
    params.group.add(mesh)
}


//drawCube(0, "purple")
//drawCube(1, "red")
//drawCube(2, "orange")
//drawCube(3, "blue")

/**********
 ** UI **
 *********/
// UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
	sourceText: '',
    saveSourceText() {
      saveSourceText()
    },
    term1: {
        term: 'miles', 
        color: '#ff0055',
        group: group1,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },

    term2: {
        term: 'gwen', 
        color: '#00aaff',
        group: group2,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },

    term3: {
        term: 'spider', 
        color: '#111111',
        group: group3,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },

    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

// UI Functions
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    cameraFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
}

const saveTerms = () =>
{
   // UI 
   preset = ui.save
   visualizeFolder.hide()
   cameraFolder.show()

   // Testing
   //console.log(uiObj.term1)
   //console.log(uiObj.color1)
   //console.log(uiObj.term2)
   //console.log(uiObj.color2)
   //console.log(uiObj.term3)
   //console.log(uiObj.color3)

   // Text Analysis
   findSearchTermInTokenizedText(uiObj.term1)
   findSearchTermInTokenizedText(uiObj.term2)
   findSearchTermInTokenizedText(uiObj.term3)

}

// Text Folder
const textFolder = ui.addFolder ('Source Text')

textFolder
    .add(uiObj, 'sourceText')
    .name('Source Text')

textFolder 
    .add(uiObj, 'saveSourceText')
    .name('Save')

// Terms  Visualize and Camera Foldetrs
const termsFolder = ui.addFolder('Search Terms')
const visualizeFolder = ui.addFolder('Visualize')
const cameraFolder = ui.addFolder('Camera')


termsFolder 
    .add(uiObj.term1, 'term')
    .name('Term 1')

termsFolder
    .add(group1, 'visible')
    .name('Term 1 visibility')

termsFolder
    .addColor(uiObj.term1, 'color')
    .name('Term 1 Color')

    termsFolder 
    .add(uiObj.term2, 'term')
    .name('Term 2')

    termsFolder
    .add(group2, 'visible')
    .name('Term 2 visibility')

    termsFolder
    .addColor(uiObj.term2, 'color')
    .name('Term 2 Color')

    termsFolder 
    .add(uiObj.term3, 'term')
    .name('Term 3')

    termsFolder
    .add(group3, 'visible')
    .name('Term 3 visibility')

    termsFolder
    .addColor(uiObj.term3, 'color')
    .name('Term 3 Color')

visualizeFolder 
    .add(uiObj, 'saveTerms')
    .name('Visualize')

cameraFolder 
.add(uiObj, 'rotateCamera')
.name('Turtable')

// Terms, Visualize, and Camera folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/******************* 
** TEXT ANALYSIS **
********************/
// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) => 
{
    // Strip periods and sowncase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    
    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
}

// Find searchTerm in toeknizedTect
const findSearchTermInTokenizedText = (params) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our search term, then we draw a cube
        if(tokenizedText[i].includes(params.term)){
            console.log('FOUND:', params.term)
            // convert i into height, which is a value between 0 and 20
            const height = i * 0.05
           //console.log(term, xi)

           // call drawCube function nCubes times using converted hieght value
           for(let a = 0; a < params.nCubes; a++)
           {
           drawCube(height, params)
           }
        }
    }
}

//findSearchTermInTokenizedText("cat", "black")
//findSearchTermInTokenizedText("garden", "white")
//findSearchTermInTokenizedText("cozy", "pink")

 /******************
  ** ANIMATION LOOP**
******************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Rotate camera
   if(uiObj.rotateCamera)
   {
    camera.position.x = Math.sin(elapsedTime * 0.1) * 20
    camera.position.z = Math.cos(elapsedTime * 0.1) * 20
    camera.position.y = 5
    camera.lookAt(0, 0, 0)
   }

// Animate all groups (movement based on "height")
[group1, group2, group3].forEach(group => {
    group.children.forEach(mesh => {
        mesh.rotation.y += mesh.userData.speed || 0.01
        mesh.position.y += Math.sin(clock.getElapsedTime() * 2 + mesh.position.x) * 0.002
    })
})
    // Renderer
    renderer.render(scene, camera)

    //Request next frame 
    window.requestAnimationFrame(animation)
}

animation()