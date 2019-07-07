createSun	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture('planetas/images/sunmap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
	})
	var mesh = new THREE.Mesh(geometry, material)
	return mesh	
}

sun = function(AtmosphereMaterial){
	var containerSun	= new THREE.Object3D()

	var glowColor	= new THREE.Color('cyan')
	var glowColor	= new THREE.Color('yellow')
	var sunMesh	= createSun()
	sunMesh.receiveShadow	= true
	sunMesh.castShadow	= true
	sunMesh.scale.multiplyScalar(10)
	containerSun.add(sunMesh)
	onRenderFcts.push(function(delta, now){
		sunMesh.rotation.y += 1/32 * delta;		
	})

	var geometry = new THREE.SphereGeometry(0.5, 32, 32)
	geometry = sunMesh.geometry.clone()
	var material = AtmosphereMaterial
	material.uniforms.glowColor.value = glowColor
	var sunMesh	= new THREE.Mesh(geometry, material );
	sunMesh.scale.multiplyScalar(11);
	containerSun.add( sunMesh );

	var geometry = new THREE.SphereGeometry(0.5, 32, 32)
	geometry = sunMesh.geometry.clone()
	var material = AtmosphereMaterial
	material.side = THREE.BackSide
	material.uniforms.coeficient.value = 0.5
	material.uniforms.power.value = 3.0
	material.uniforms.glowColor.value = glowColor
	var sunMesh = new THREE.Mesh(geometry, material );
	sunMesh.scale.multiplyScalar(13);
	containerSun.add( sunMesh );

	return containerSun
}