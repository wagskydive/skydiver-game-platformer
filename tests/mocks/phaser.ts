export default {
  Scene: class {
    sys: any;
    scene: any;
    constructor(config?: any) {
      this.sys = { settings: { key: config?.key } };
      this.scene = { start: () => {}, launch: () => {}, stop: () => {} };
    }
  },
  AUTO: 'AUTO',
  Types: { Core: { GameConfig: class {} } },
  Math: { Between: (min: number, _max: number) => min },
  Input: { Keyboard: { KeyCodes: { X: 88 }, JustDown: () => false } },
};
