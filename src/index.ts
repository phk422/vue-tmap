import { App, Plugin } from 'vue';
import TMap from './components/map';
import MultiMarker from './components/multi-marker';
import MarkerCluster from './components/marker-cluster';
import MultiPolyline from './components/multi-polyline';
import MultiPolygon from './components/multi-polygon';
import MultiLabel from './components/multi-label';
import MultiCircle from './components/multi-circle';
import InfoWindow from './components/info-window';
import PolygonEditor from './components/polygon-editor';
// import GeometryEditor from './components/geometry-editor';
import DOMOverlay from './components/dom-overlay';
import MeasureTool from './components/measure-tool';

const components = [
  TMap,
  MultiMarker,
  MarkerCluster,
  MultiPolygon,
  MultiPolyline,
  MultiLabel,
  MultiCircle,
  InfoWindow,
  PolygonEditor,
  // GeometryEditor,
  DOMOverlay,
  MeasureTool,
];

const install: Plugin = (Vue: App) => {
  components.forEach((Component) => {
    Vue.component(Component.name!, Component);
  });
};

export {
  TMap,
  MultiMarker,
  MarkerCluster,
  MultiPolygon,
  MultiPolyline,
  MultiLabel,
  MultiCircle,
  InfoWindow,
  PolygonEditor,
  // GeometryEditor,
  DOMOverlay,
  MeasureTool,
};
export default install;
