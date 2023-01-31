/**
 * 声明 - Svga Props
 * @param {string} className 类名
 * @param {string} url 资源地址
 * @param {number} time 播放次数
 * @param {function} onStart 开始回调
 * @param {function} onProcess 进行回调
 * @param {function} onEnd 结束回调
 */
declare interface IWidgetSvgaProps {
  className?: string;
  url: string;
  time?: number;
  onStart?: (ele: HTMLCanvasElement) => void;
  onProcess?: () => void;
  onEnd?: () => void;
}
