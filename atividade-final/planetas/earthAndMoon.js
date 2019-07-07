createEarth	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: THREE.ImageUtils.loadTexture('planetas/images/earthmap1k.jpg'),
		bumpMap		: THREE.ImageUtils.loadTexture('planetas/images/earthbump1k.jpg'),
		bumpScale	: 0.05,
		specularMap	: THREE.ImageUtils.loadTexture('planetas/images/earthspec1k.jpg'),
		specular	: new THREE.Color('grey'),
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

createEarthCloud	= function(){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 512
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= 'planetas/images/earthcloudmaptrans.jpg';
	}, false);
	imageMap.src	= 'planetas/images/earthcloudmap.jpg';

	var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


createMoon	= function(){
	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('planetas/images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('planetas/images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}


earthAndMoon = function(atmosphereMaterial){
	var containerEarth	= new THREE.Object3D()
	
	var moonMesh	= createMoon()
	moonMesh.position.set(0.5,0.5,0.5)
	moonMesh.scale.multiplyScalar(1/5)
	moonMesh.receiveShadow	= true
	moonMesh.castShadow	= true

	moonMesh.angle += moonMesh.angleSpeed;

	containerEarth.add(moonMesh)
	onRenderFcts.push(function(delta, now){
		var angle	= now * Math.PI * 2 * 0.2
		var position	= moonMesh.position
		
		moonMesh.rotation.y	= -angle
		
		position.x	= Math.cos(angle) * 0.7
		position.y	= 0
		position.z	= Math.sin(angle) * 0.7
	})

	var earthMesh	= createEarth()
	earthMesh.receiveShadow	= true
	earthMesh.castShadow	= true
	containerEarth.add(earthMesh)
	onRenderFcts.push(function(delta, now){
		earthMesh.rotation.y += 1/32 * delta;		
	})

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.01);
	containerEarth.add( mesh );

	var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
	var material	= atmosphereMaterial
	material.side	= THREE.BackSide
	material.uniforms.glowColor.value.set(0x00b3ff)
	material.uniforms.coeficient.value	= 0.5
	material.uniforms.power.value		= 4.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.15);
	containerEarth.add( mesh );

	var earthCloud	= createEarthCloud()
	earthCloud.receiveShadow	= true
	earthCloud.castShadow	= true
	containerEarth.add(earthCloud)
	onRenderFcts.push(function(delta, now){
		earthCloud.rotation.y += 1/8 * delta;		
	})

	onRenderFcts.push(function(delta, now){
		var position	= containerEarth.position
		// handle planet revolution
		var angle	= 0.05 * now * Math.PI * 2;
		position.x	= 17.8 * Math.cos(angle);
		position.y	= 18.0 * Math.cos(angle+Math.PI/2);
		position.z	= 16.0 * Math.sin(angle);
	})

	return containerEarth
}