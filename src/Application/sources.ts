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
        path: 'models/Monitor/monitor_baked_altered.png',
    },
    {
        name: 'monitorSmudgeTexture',
        type: 'texture',
        path: 'textures/monitor/smudges.png',
    },
    {
        name: 'monitorDustTexture',
        type: 'texture',
        path: 'textures/monitor/dust.png',
    },
    {
        name: 'monitorShadowTexture',
        type: 'texture',
        path: 'textures/monitor/shadow.png',
    },
    {
        name: 'monitorReflectionTexture',
        type: 'texture',
        path: 'textures/monitor/reflection.png',
    },
];

export default sources;
