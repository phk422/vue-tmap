import {
  defineComponent,
  inject,
  Ref,
  watch,
  PropType,
  toRaw,
  onUnmounted,
} from 'vue';
import useMarkerClusterStyle from '../composables/use-marker-cluster-style';
import { buildGeometries } from './multi-marker';

export default defineComponent({
  name: 'tmap-marker-cluster',
  props: {
    id: {
      type: String,
      default: 'default',
    },
    enableDefaultStyle: {
      type: Boolean,
      default: true,
    },
    minimumClusterSize: {
      type: Number,
      default: 2,
    },
    geometries: {
      type: Array as PropType<TMap.PointGeometry[]>,
      required: true,
    },
    zoomOnClick: {
      type: Boolean,
      default: true,
    },
    gridSize: {
      type: Number,
      default: 60,
    },
    averageCenter: {
      type: Boolean,
      default: false,
    },
    maxZoom: {
      type: Number,
      default: 20,
    },
    markerStyle: {
      type: Object as PropType<TMap.MarkerStyle>,
    },
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    const map = inject<Ref<TMap.Map>>('map');
    if (!map) return {};
    const mapRaw = toRaw(map.value);

    const markerCluster = new TMap.MarkerCluster({
      id: props.id,
      map: mapRaw,
      enableDefaultStyle: props.enableDefaultStyle,
      minimumClusterSize: props.minimumClusterSize,
      geometries: buildGeometries(props.geometries),
      zoomOnClick: props.zoomOnClick,
      gridSize: props.gridSize,
      averageCenter: props.averageCenter,
      maxZoom: props.maxZoom,
    });
    watch(
      () => props.geometries,
      (geometries) => {
        markerCluster.setGeometries(buildGeometries(geometries));
      },
    );
    if (!props.enableDefaultStyle) {
      useMarkerClusterStyle(markerCluster, mapRaw, props, emit, slots);
    }

    onUnmounted(() => {
      markerCluster.setMap(null);
    });
    return {};
  },
  render() {
    return null;
  },
});
