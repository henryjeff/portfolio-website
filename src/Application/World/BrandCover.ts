import * as THREE from 'three';
import Application from '../Application';

export default class BrandCover {
    application: Application;
    scene: THREE.Scene;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;

        this.setCover();
    }

    setCover() {
        // Base cover to hide "Heffernan"
        // Adjusting size and color to match the monitor's plastic better
        const geometry = new THREE.PlaneGeometry(180, 50); 
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xcdcdcd, 
            roughness: 0.8,
            metalness: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Precise positioning based on user feedback
        mesh.position.set(-620, 245, 625); 
        mesh.rotation.set(-2.5 * THREE.MathUtils.DEG2RAD, 0, 0);

        this.scene.add(mesh);

        // Professional Branding: A small "W" in a circle
        const circleGeo = new THREE.CircleGeometry(20, 32);
        const circleMat = new THREE.MeshStandardMaterial({ color: 0x1a73e8 }); // Modern blue
        const circle = new THREE.Mesh(circleGeo, circleMat);
        circle.position.set(-620, 245, 626);
        circle.rotation.set(-2.5 * THREE.MathUtils.DEG2RAD, 0, 0);
        
        this.scene.add(circle);
    }
}
