createMars	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('planetas/images/marsmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('planetas/images/marsbump1k.jpg'),
		bumpScale: 0.05,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

mars = function(atmosphereMaterial){
	var containerMars	= new THREE.Object3D()
	var marsMesh	= createMars()
	marsMesh.receiveShadow	= true
	marsMesh.castShadow	= true
	marsMesh.scale.multiplyScalar(1/1.5);
	containerMars.add(marsMesh)
	onRenderFcts.push(function(delta, now){
		marsMesh.rotation.y += 1/32 * delta;		
	})

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.uniforms.glowColor.value.set(0xff6800)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(0.7);
	containerMars.add( mesh );

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xffb400)
	material.uniforms.coeficient.value	= 0.17
	material.uniforms.power.value		= 4.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(0.95);
	containerMars.add( mesh );

	return containerMars	
}