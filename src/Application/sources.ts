const sources: Resource[] = [
    // {
    //   name: "environmentMapTexture",
    //   type: "cubeTexture",
    //   path: [
    //     "textures/environmentMap/px.jpg",
    //     "textures/environmentMap/nx.jpg",
    //     "textures/environmentMap/py.jpg",
    //     "textures/environmentMap/ny.jpg",
    //     "textures/environmentMap/pz.jpg",
    //     "textures/environmentMap/nz.jpg",
    //   ],
    // },
    {
        name: 'monitorModel',
        type: 'gltfModel',
        path: 'models/Monitor/monitor.glb',
    },
    {
        name: 'monitorTexture',
        type: 'texture',
        path: 'models/Monitor/monitor_baked_altered.jpg',
    },
    {
        name: 'monitorSmudgeTexture',
        type: 'texture',
        path: 'textures/monitor/layers/compressed/smudges.jpg',
    },
    {
        name: 'monitorShadowTexture',
        type: 'texture',
        path: 'textures/monitor/layers/compressed/shadow-compressed.png',
    },
    {
        name: 'monitorReflectionTexture',
        type: 'texture',
        path: 'textures/monitor/layers/compressed/reflection-compressed.png',
    },
];

export default sources;
