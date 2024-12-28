/**
 * ## OnInit ##
 * Lifecycle hook that is called when the component is initialized
 */
export namespace OnInit {
  /**
   * InitCallback
   * Callback function that is called when the component is initialized
   */
  export type InitCallback = () => void;

  /**
   * ComponentInitMap
   * Map of component types to their initialization callbacks
   */
  export type ComponentInitMap = Map<Function, InitCallback[]>;
}
