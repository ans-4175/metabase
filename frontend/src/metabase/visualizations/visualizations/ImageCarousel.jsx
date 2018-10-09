/* @flow */

import React, { Component } from "react";
import styles from "./ImageCarousel.css";
import ImageGallery from 'react-image-gallery';

import { getOptionFromColumn } from "metabase/visualizations/lib/settings";

import { ChartSettingsError } from "metabase/visualizations/lib/errors";

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
    return rows.length && cols.length;
  }

  static settings = {
    "graph.series":{
      title: `Image Columns`,
      widget: "fields",
      getDefault: (series, vizSettings) => [null],
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

  static checkRenderable([{ data: { cols, rows } }], settings) {
    if (!settings["graph.series"][0]) {
      throw new ChartSettingsError(
        `Please select image column in the chart settings.`,
        "Data",
      );
    }
  }

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
