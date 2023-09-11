import * as THREE from 'three';
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap";
//scene
const scene = new THREE.Scene();

//create your sphere
// const geometry = new THREE.SphereGeometry(3,64,64);
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff83',
// })
// const mesh =new THREE.Mesh(geometry,material)
// scene.add(mesh)

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshStandardMaterial( { 
    color: 0x7FFFD4,
    roughness: 0.5 ,
} ); 
const torus = new THREE.Mesh( geometry, material ); scene.add( torus );

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Light
const light1 = new THREE.PointLight(0xffffff,100,100)
light1.position.set(0,10,10)
scene.add(light1)
/*For sphere*/
const light2 = new THREE.PointLight(0xffffff,100,100)
light2.position.set(0,-10,10)
scene.add(light2)
const light3 = new THREE.PointLight(0xffffff,100,100)
light3.position.set(0,0,-10)
scene.add(light3)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height , 0.1, 100)
camera.position.z = 50
scene.add(camera)
//Renderer
const canvas =  document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2);
renderer.render(scene, camera)

//Resize
window.addEventListener('resize',()=>{
    //Update Sizes
    console.log(window.innerWidth)
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update Camera
    camera.aspect = sizes.width /sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height);
})

//Controls
const controls= new OrbitControls(camera,canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
const loop = () => {
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

const tl =gsap.timeline({defaults : {duration: 1}})
tl.fromTo(torus.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo('nav',{y: '-100%'},{y: "0%"})
tl.fromTo(".title",{opacity:0},{opacity:1})


//Mouse Animation Color
let mouseDown =false;
let rgb = [12,23,55];
window.addEventListener("mouseDown",() => (mouseDown = true))
window.addEventListener("mouseUp",() => (mouseDown = true))

window.addEventListener("mousemove",(e) => {
    if(!mouseDown){
        console.log("Helllo");
        rgb= [
            Math.round((e.pageX / sizes.width) *255),
            Math.round((e.pageY / sizes.height) *255),
            150,
        ]
        //Lets Animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(torus.material.color,{
            r: newColor.r,
            g:newColor.g,
            b:newColor.b
        })
    }
})