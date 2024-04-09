import {
  PropType,
  Ref,
  defineComponent,
  inject,
  onUnmounted,
  ref,
  toRaw,
  watch,
} from 'vue';

export default defineComponent({
  name: 'tmap-measure-tool',
  props: {
    enable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<'distance' | 'area' | ''>,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    end: (_val: Record<string, unknown>) => true,
  },
  setup(props, { emit }) {
    const map = inject<Ref<TMap.Map>>('map');
    console.log(map, 'map');
    const measureTool = ref();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    measureTool.value = new (TMap.tools as any).MeasureTool({
      map: toRaw(map?.value),
    });
    const measure = async () => {
      if (!props.enable) return;
      await measureTool.value.enable();
      let res;
      if (props.type === 'distance') {
        res = await measureTool.value.measureDistance();
      } else if (props.type === 'area') {
        res = await measureTool.value.measureArea();
      } else {
        measureTool.value.disable();
        return;
      }
      emit('end', res);
      await measure();
    };
    watch(
      () => [props.type, props.enable],
      () => {
        measure();
      },
      { immediate: true },
    );
    watch(
      () => props.enable,
      (val) => {
        if (val) {
          measureTool.value.enable();
        } else {
          measureTool.value.disable();
        }
      },
    );
    onUnmounted(() => {
      measureTool.value.disable();
    });
  },
  render() {
    return null;
  },
});
