createJupiter	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture('planetas/images/jupitermap.jpg')
	var material	= new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.02,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

jupiter = function(atmosphereMaterial){
	var containerJupiter	= new THREE.Object3D()

	var jupiterMesh	= createJupiter()
	jupiterMesh.receiveShadow	= true
	jupiterMesh.castShadow	= true
	jupiterMesh.scale.multiplyScalar(5.5);
	containerJupiter.add(jupiterMesh)
	onRenderFcts.push(function(delta, now){
		jupiterMesh.rotation.y += 1/32 * delta;		
	})

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.uniforms.glowColor.value.set(0xff6800)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(5.6);
	containerJupiter.add( mesh );

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0xffb400)
	material.uniforms.coeficient.value	= 0.17
	material.uniforms.power.value		= 4.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(5.7);
	containerJupiter.add( mesh );



	return containerJupiter
}