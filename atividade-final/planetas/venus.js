createVenus	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('planetas/images/venusmap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('planetas/images/venusbump.jpg'),
		bumpScale: 0.005,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

venus = function(atmosphereMaterial){
	var containerVenus	= new THREE.Object3D()

	var venusMesh	= createVenus()
	venusMesh.receiveShadow	= true
	venusMesh.castShadow	= true
	venusMesh.scale.multiplyScalar(1/1.2)
	containerVenus.add(venusMesh)
	onRenderFcts.push(function(delta, now){
		venusMesh.rotation.y += 1/32 * delta;		
	})

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.uniforms.glowColor.value.set(0x9b7f6b)
	material.uniforms.coeficient.value	= 0.89
	material.uniforms.power.value		= 10.4
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(0.8);
	containerVenus.add( mesh );
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xe3c47a)
	material.uniforms.coeficient.value	= 0.24
	material.uniforms.power.value		= 4.9
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1);
	containerVenus.add( mesh );

	return containerVenus
}