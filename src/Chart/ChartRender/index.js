// Copyright 2017 Kensho Technologies, LLC.

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { basicRender } from "../../CanvasRender/basicRender";
import { CanvasRender } from "../../CanvasRender";
import { DEFAULT_THEME } from "../../defaultTheme";

/*
Used inside <Chart/>
*/
export const ChartRender = props => (
  <div>
    {_.map(props.renderLayers, (renderLayer, i) => (
      <CanvasRender // basicRender
        clip={true}
        height={props.rootProps.height}
        key={i}
        layerProps={renderLayer.layerProps}
        plotRect={props.rootProps.plotRect}
        render={basicRender}
        renderData={renderLayer.renderData}
        theme={props.theme}
        width={props.rootProps.width}
      />
    ))}
  </div>
);

ChartRender.propTypes = {
  renderLayers: PropTypes.array,
  rootProps: PropTypes.object,
  theme: PropTypes.object
};
ChartRender.defaultProps = {
  theme: DEFAULT_THEME
};
