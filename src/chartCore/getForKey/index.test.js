// Copyright 2017 Kensho Technologies, LLC.

import { it as test } from "mocha";
import assert from "assert";
import { DEFAULT_THEME as theme } from "../../defaultTheme";

import * as methods from "./";

test("visUtils.toType", () => {
  assert.deepEqual(methods.toType(), "undefined");
  assert.deepEqual(methods.toType([]), "array");
  assert.deepEqual(methods.toType({}), "object");
  assert.deepEqual(methods.toType(10), "number");
  assert.deepEqual(methods.toType("10"), "string");
  assert.deepEqual(methods.toType(new Date()), "date");
});
test("Chart/getMethods.getType", () => {
  const props = {
    xArray: [1, 2, "string", new Date()],
    yArray: ["a", "b", 1, new Date()],
    fillArray: [new Date(), new Date(), "a", 1]
  };
  assert.deepEqual(methods.getType(props, "x"), "linear");
  assert.deepEqual(methods.getType(props, "y"), "ordinal");
  assert.deepEqual(methods.getType(props, "fill"), "time");
  assert.deepEqual(methods.getType(props), undefined);
});
test("Chart/getMethods.getDomain", () => {
  const props = {
    xArray: [1, 2, 3, 4],
    yArray: ["a", "b", "c"],
    fillArray: [new Date(2015, 1), new Date(2015, 2), new Date(2015, 3)],
    xType: "linear",
    yType: "ordinal",
    fillType: "time"
  };
  assert.deepEqual(methods.getDomain(props, "x"), [1, 4]);
  assert.deepEqual(methods.getDomain(props, "y"), ["a", "b", "c"]);
  assert.deepEqual(methods.getDomain(props, "fill"), [
    new Date(2015, 1),
    new Date(2015, 3)
  ]);
});
test("Chart/getMethods.getDomain zeroBased", () => {
  const props = {
    xArray: [1, 2, 3, 4],
    xType: "linear",
    xZeroBased: true
  };
  assert.deepEqual(methods.getDomain(props, "x"), [0, 4]);
});
test("Chart/getMethods.getRange", () => {
  const props = {
    plotRect: { x: 0, y: 0, width: 500, height: 500 },
    xType: "linear",
    yType: "ordinal",
    fillType: "time",
    theme
  };
  assert.deepEqual(methods.getRange(props, "x"), [0, 500]);
  assert.deepEqual(methods.getRange(props, "y"), [500, 0]);
  assert.deepEqual(methods.getRange(props, "fill"), theme.plotLinearRangeFill);
});
test("Chart/getMethods.getTickCount", () => {
  const props = {
    xRange: [0, 500],
    yRange: [500, 0],
    yTickSpace: 10
  };
  assert.deepEqual(methods.getTickCount(props, "x"), 4);
  assert.deepEqual(methods.getTickCount(props, "y"), 50);
});
