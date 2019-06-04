function loadModel(model){
  let scene = new THREE.Scene();
  let loader  = new THREE.GLTFLoader();

  loader.load(`../model/${model}/scene.gltf`, (gltf) => {
    scene.add(gltf.scene);
  });

  return scene;
}
