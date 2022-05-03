export type AnimationEasing =
    | 'sSoft'
    | 'sMedium'
    | 'sHard'
    | 'expIn'
    | 'expOut'
    | 'expInOut';

export const Easing: { [key in AnimationEasing]: number[] } = {
    sHard: [0.95, 0, 0.5, 1],
    sMedium: [0.8, 0, 0.2, 1],
    sSoft: [0.6, 0, 0.4, 1],
    expIn: [0.9, 0.05, 1, 0.3],
    expOut: [0.05, 0.7, 0.1, 1],
    expInOut: [0.9, 0.05, 0.1, 1],
};
