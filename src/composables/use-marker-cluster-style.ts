import { Slots, onUnmounted, render } from 'vue';

type ClusterBubbleOptions = TMap.DOMOverlayOptions & {
  position: TMap.LatLng;
  content: string | number;
  extData?: any;
};

export default function(
  markerCluster: TMap.MarkerCluster,
  map: TMap.Map,
  props: { [x: string]: any },
  emit: Function,
  slots?: Slots,
) {
  class ClusterBubble extends TMap.DOMOverlay {
    public content: string | number = '';

    public position: TMap.LatLng | null = null;

    public extData: any = {};

    constructor(options: ClusterBubbleOptions) {
      super(options);
      this.content = options.content;
      this.position = options.position;
      this.extData = options.extData;
    }

    onInit(options: ClusterBubbleOptions): void {
      this.content = options.content;
      this.position = options.position;
      this.extData = options.extData;
    }

    onDestroy(this: any): void {
      this.dom.removeEventListener('click', this.onClick);
      this.removeAllListeners();
    }

    onClick(this: any) {
      this.emit('click');
    }

    createDOM() {
      const result = document.createElement('div');
      if (slots) {
        const { cluster } = slots;
        if (cluster) {
          render(
            cluster({
              content: this.content,
            })[0],
            result,
          );
        }
      }
      result.style.position = 'absolute';
      return result;
    }

    updateDOM(this: any) {
      if (!this.map) {
        return;
      }
      // 经纬度坐标转容器像素坐标
      const pixel = this.map.projectToContainer(this.position);

      // 使文本框中心点对齐经纬度坐标点
      const left = `${pixel.getX() - this.dom.children[0].clientWidth / 2}px`;
      const top = `${pixel.getY() - this.dom.children[0].clientHeight / 2}px`;
      this.dom.style.transform = `translate(${left}, ${top})`;

      this.emit('dom_updated');
    }
  }

  class MarkerOverlay extends ClusterBubble {
    createDOM() {
      const result = document.createElement('div');
      if (slots) {
        const { marker } = slots;
        if (marker) {
          render(
            marker({
              content: this.content,
              extData: this.extData,
            })[0],
            result,
          );
        }
      }
      result.style.position = 'absolute';
      return result;
    }
  }

  let clusterBubbleList: Array<ClusterBubble> = [];
  let markerGeometries: TMap.PointGeometry[] = [];
  let marker: TMap.MultiMarker | null = null;
  let markers: Array<MarkerOverlay> = [];

  markerCluster.on('cluster_changed', () => {
    if (clusterBubbleList.length) {
      clusterBubbleList.forEach((item) => {
        (item as any).destroy();
      });
      clusterBubbleList = [];
    }
    markerGeometries = [];
    const clusters = markerCluster.getClusters();
    clusters.forEach((item) => {
      if (item.geometries.length > 1) {
        const clusterBubble = new ClusterBubble({
          map,
          position: item.center,
          content: item.geometries.length,
        });
        clusterBubbleList.push(clusterBubble);
      } else {
        markerGeometries.push({
          ...item,
          position: item.center,
        } as never);
      }
    });

    if (slots?.marker) {
      markers.forEach((item) => (item as any).destroy());
      markers = [];
      markerGeometries.forEach((item) => {
        const markerOverlay = new MarkerOverlay({
          map,
          position: item.position,
          content: '',
          extData: { ...item, data: (item as any).geometries },
        });
        markers.push(markerOverlay);
      });
    } else if (marker) {
      marker.setGeometries(markerGeometries);
    } else {
      marker = new TMap.MultiMarker({
        map,
        styles: {
          default: new TMap.MarkerStyle(
            props.markerStyle || {
              width: 34,
              height: 42,
              anchor: {
                x: 17,
                y: 21,
              },
              src:
                'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker_blue.png',
            },
          ),
        },
        geometries: markerGeometries,
      } as never);
    }

    emit(
      'change',
      markerGeometries.map((item) => (item as any).geometries[0]),
    );
  });
  onUnmounted(() => {
    clusterBubbleList.forEach((item) => (item as any).destroy());
    markers.forEach((item) => (item as any).destroy());
  });
}
