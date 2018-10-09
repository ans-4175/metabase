/* @flow */

import React, { Component } from "react";
import styles from "./ImageCarousel.css";
import ImageGallery from 'react-image-gallery';

import {
  getDefaultColumns,
  getOptionFromColumn,
} from "metabase/visualizations/lib/settings";

import {
  ChartSettingsError,
} from "metabase/visualizations/lib/errors";

import type { VisualizationProps } from "metabase/meta/types/Visualization";

export default class ImageCarousel extends Component {
  props: VisualizationProps;

  static uiName = "Carousel";
  static identifier = "carousel";
  static iconName = "number";

  static noHeader = true;
  static supportsSeries = true;

  static minSize = { width: 5, height: 5 };

  _carousel: ?HTMLElement;

  static isSensible(cols, rows) {
    return rows.length === 1 && cols.length === 1;
  }

  static checkRenderable([{ data: { cols, rows } }]) {
    // NOTE: image carousel validation for rendering postponed due my incompetent understanding yet
  }

  static settings = {
    "graph.series":{
      title: `Image Columns`,
      widget: "fields",
      getDefault: (series, vizSettings) => getDefaultColumns(series).metrics,
      persistDefault: true,
      getProps: ([{ card, data }], vizSettings) => {
        const options = data.cols.map(getOptionFromColumn);
        return {
          options,
          addAnother: null
        };
      },
      dashboard: false,
      useRawSeries: true,
    }
  };

  render() {
    let {
      series: [{ data: { cols, rows } }],
      settings,
    } = this.props;

    let colContent = null;
    cols.forEach((el, idx) => {
      if (el.name === settings["graph.series"][0]) {
        colContent = idx;
      }
    });
    
    const colSelected = (!colContent) ? 0 : colContent;
    const images = rows.map(row => {
      return {
        original: row[colSelected],
        thumbnail: row[colSelected],
        sizes: "80vw"
      }
    });
  
    return (
        <ImageGallery
          items={images}
          lazyLoad={true}
          additionalClass="image-gallery"
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
        />
    );
  }
}
