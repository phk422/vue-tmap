import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  Ref,
  watch,
} from 'vue';

export default defineComponent({
  name: 'tmap-heatmap',
  props: {
    /**
     * 最大辐射半径，默认为50。
     */
    radius: {
      type: Number,
      default: 50,
    },
    /**
     * 峰值高度，默认为100。
     */
    height: {
      type: Number,
      default: 100,
    },
    gradientColor: {
      type: Object,
    },
    /**
     * 热力最弱阈值，小于该值的不显示，默认为0。
     */
    min: {
      type: Number,
      default: 0,
    },
    /**
     * 热力最强阈值，大于该值的显示为最强色，默认为数据中的最大值。
     */
    max: {
      type: Number,
      default: 2,
    },
    /**
     * 全局透明度，取值范围[0，1]，默认为0.8。
     */
    opacity: {
      type: Number,
      default: 0.8,
    },
    /**
     * 是否启用自动聚合预处理，适用于万级数据量，启用后可优化运行时性能，但对数据分布略有影响。默认为false。
     */
    enableAggregation: {
      type: Boolean,
      default: false,
    },
    /**
     * 热力图是否呈现光照效果，默认为false。
     */
    enableLighting: {
      type: Boolean,
      default: false,
    },
    /**
     * 图层绘制顺序。
     */
    zIndex: {
      type: Number,
    },
    /**
     * 图层最小缩放层级，当地图缩放层级小于该值时该图层不显示，默认为3。
     */
    minZoom: {
      type: Number,
      default: 3,
    },
    /**
     * 图层最大缩放层级，当地图缩放层级大于该值时该图层不显示，默认为20。
     */
    maxZoom: {
      type: Number,
      default: 20,
    },
    /**
     * 图层底部离地高度，默认为0。
     */
    offset: {
      type: Number,
      default: 0,
    },
    /**
     * radius(半径)、height(峰值高度)、offset(离地高度)三个参数的单位，支持’pixel’ 像素、‘meter’ 米，默认为’pixel’。
     */
    distanceUnit: {
      type: String as PropType<'pixel' | 'meter'>,
      default: 'pixel',
    },
    points: {
      type: Array as PropType<
        Array<{ lat: number; lng: number; count: number }>
      >,
      default: () => [],
    },
  },
  setup(props) {
    const map = inject<Ref<TMap.Map>>('map');
    const heat = new (TMap as any).visualization.Heat({
      radius: props.radius,
      height: props.height,
      min: props.min,
      max: props.max,
      minZoom: props.minZoom,
      maxZoom: props.maxZoom,
      opacity: props.opacity,
      offset: props.offset,
      distanceUnit: props.distanceUnit,
      gradientColor: props.gradientColor,
    }).addTo(map?.value);

    onMounted(() => {
      if (props.points) {
        heat.setData(props.points);
      }
    });

    onUnmounted(() => {
      heat.destroy();
    });

    watch(
      () => props.points,
      (val) => {
        if (val.length) {
          heat.setData(val);
        }
      },
    );
  },
  render() {
    return null;
  },
});
