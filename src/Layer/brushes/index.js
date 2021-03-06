// Copyright 2017 Kensho Technologies, LLC.

import { map, flatten, isNumber } from "lodash";

import { BACKGROUND_OFFSET } from "../../chartCore/defaults";
import { bottomHorizontalLine } from "../../Layer/getBrushesRenderData";
import { bottomCenterLine } from "../../Layer/getBrushesRenderData";
import { centerArea } from "../../Layer/getBrushesRenderData";
import { verticalArea } from "../../Layer/getBrushesRenderData";
import { horizontalArea } from "../../Layer/getBrushesRenderData";
import { leftVerticalLine } from "../../Layer/getBrushesRenderData";
import { leftCenterLine } from "../../Layer/getBrushesRenderData";
import { rightVerticalLine } from "../../Layer/getBrushesRenderData";
import { rightCenterLine } from "../../Layer/getBrushesRenderData";
import { topHorizontalLine } from "../../Layer/getBrushesRenderData";
import { topCenterLine } from "../../Layer/getBrushesRenderData";
import { rightBottomLine } from "../../Layer/getBrushesRenderData";
import { leftBottomLine } from "../../Layer/getBrushesRenderData";
import { leftTopLine } from "../../Layer/getBrushesRenderData";
import { rightTopLine } from "../../Layer/getBrushesRenderData";
import { getPlotValues } from "../../Layer/getPlotValues";
import { getPath2D } from "../../utils/path2DUtils";

const brushesRender = (props, datum) => {
  const { backgroundOffset = BACKGROUND_OFFSET, plotRect } = props;
  const stroke = props.strokeValue;
  const fill = props.fillValue;
  const fillAlpha = props.fillAlphaValue || 0.4;
  const lineWidth = props.lineWidthValue || 3;
  const values = getPlotValues(props, datum);

  const renderArgs = {
    ...values,
    plotRect,
    backgroundOffset,
    stroke,
    fill,
    fillAlpha,
    lineWidth
  };

  if (
    isNumber(values.x1) &&
    isNumber(values.x2) &&
    isNumber(values.y1) &&
    isNumber(values.y2)
  ) {
    return [
      centerArea(renderArgs),
      leftCenterLine(renderArgs),
      rightCenterLine(renderArgs),
      topCenterLine(renderArgs),
      bottomCenterLine(renderArgs),
      leftTopLine(renderArgs),
      leftBottomLine(renderArgs),
      rightTopLine(renderArgs),
      rightBottomLine(renderArgs)
    ];
  } else if (isNumber(values.x1) && isNumber(values.x2)) {
    return [
      verticalArea(renderArgs),
      leftVerticalLine(renderArgs),
      rightVerticalLine(renderArgs)
    ];
  } else if (isNumber(values.y1) && isNumber(values.y2)) {
    return [
      horizontalArea(renderArgs),
      topHorizontalLine(renderArgs),
      bottomHorizontalLine(renderArgs)
    ];
  }
  return { showHover: false, type: "area", path2D: getPath2D() };
};

export const brushes = props => {
  if (!props.xScale && !props.yScale) return undefined;
  return flatten(
    map(flatten(props.data), datum => brushesRender(props, datum))
  );
};
