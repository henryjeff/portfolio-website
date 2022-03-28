import GUI from 'lil-gui';
import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Time from '../Utils/Time';
//@ts-ignore
import MicrowaverScreenVert from '../Shaders/microwaver-screen.vert';
//@ts-ignore
import MicrowaverScreenFrag from '../Shaders/microwaver-screen.frag';

export default class Monitor {
    application: Application;
    _opacity: number;
    _screen: THREE.ShaderMaterial;
    __REFLECTION: THREE.Vector2;
    __OFFSET: THREE.Vector2;
    __OPACITY: THREE.IUniform<any>;
    __VFADE: THREE.IUniform<any>;

    constructor() {
        this.application = new Application();

        this._screen = new THREE.ShaderMaterial({
            vertexShader: MicrowaverScreenVert,
            fragmentShader: MicrowaverScreenFrag,

            uniforms: {
                _input: { value: {} },
                _time: { value: 0.0 },
                _offset: { value: (this.__OFFSET = new THREE.Vector2()) },
                _reflection: {
                    value: (this.__REFLECTION = new THREE.Vector2()),
                },
                _vFade: { value: 0.7 },
                _opacity: { value: (this._opacity = 0.0) },
            },
            transparent: true,
        });

        this.__OPACITY = this._screen.uniforms._opacity;
        this.__VFADE = this._screen.uniforms._vFade;

        const model = new THREE.Mesh(
            new THREE.PlaneGeometry(1.815, 1.175),
            this._screen
        );

        this.application.scene.add(model);
    }

    setModel() {}
}
