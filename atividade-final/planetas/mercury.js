createMercury	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('planetas/images/mercurymap.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('planetas/images/mercurybump.jpg'),
		bumpScale: 0.005,
	})
	var mesh = new THREE.Mesh(geometry, material)
	return mesh	
}

mercury = function(atmosphereMaterial){
	var containerMercury= new THREE.Object3D()

	var mercuryMesh	= createMercury()
	mercuryMesh.receiveShadow	= true
	mercuryMesh.castShadow	= true
	mercuryMesh.scale.multiplyScalar(1/4)
	containerMercury.add(mercuryMesh)
	onRenderFcts.push(function(delta, now){
		mercuryMesh.rotation.y += 1/32 * delta;		
	})

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.uniforms.glowColor.value.set(0x9b7f6b)
	material.uniforms.coeficient.value	= 0.89
	material.uniforms.power.value		= 10.4
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(0.45);
	containerMercury.add( mesh );

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xe3c47a)
	material.uniforms.coeficient.value	= 0.24
	material.uniforms.power.value		= 4.9
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(0.6);
	containerMercury.add( mesh );

	return containerMercury
}