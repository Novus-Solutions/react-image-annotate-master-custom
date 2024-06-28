// @flow

import React from "react"
import classnames from "classnames"
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()
const useStyles = makeStyles((theme) => ({
  "@keyframes borderDance": {
    from: { strokeDashoffset: 0 },
    to: { strokeDashoffset: 100 },
  },
  highlightLight: {
    zIndex: 2,
    transition: "opacity 500ms",
    "&.highlighted": {
      zIndex: 2,
      filter:
        "invert(40%) sepia(50%) saturate(1928%) hue-rotate(350deg) brightness(94%) contrast(89%)", //customize
    },
    "&:not(.highlighted)": {
      opacity: 0,
    },
    // "&:not(.highlighted):hover": {
    //   opacity: 0.6,
    // },
    "& path": {
      vectorEffect: "non-scaling-stroke",
      strokeWidth: 2,
      stroke: "#FFF",
      fill: "none",
      strokeDasharray: "none",
      animationName: "$borderDance",
      animationDuration: "4s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationPlayState: "running",
    },
  },
}))

export const HighlightBox = ({
  mouseEvents,
  dragWithPrimary,
  zoomWithPrimary,
  createWithPrimary,
  onBeginMovePoint,
  onSelectRegion,
  region: r,
  pbox,
}: {
  mouseEvents: any,
  dragWithPrimary: boolean,
  zoomWithPrimary: boolean,
  createWithPrimary: boolean,
  onBeginMovePoint: Function,
  onSelectRegion: Function,
  region: any,
  pbox: { x: number, y: number, w: number, h: number },
}) => {
  const classes = useStyles()
  if (!pbox.w || pbox.w === Infinity) return null
  if (!pbox.h || pbox.h === Infinity) return null
  if (r.unfinished) return null

  const styleCoords =
    r.type === "point"
      ? {
          left: pbox.x + pbox.w / 2 - 30,
          top: pbox.y + pbox.h / 2 - 30,
          width: 60,
          height: 60,
        }
      : {
          left: pbox.x - 5,
          top: pbox.y - 5,
          width: pbox.w + 10,
          height: pbox.h + 10,
        }

  const pathD =
    r.type === "point"
      ? `M5,5 L${styleCoords.width - 5} 5L${styleCoords.width - 5} ${
          styleCoords.height - 5
        }L5 ${styleCoords.height - 5}Z`
      : `M5,5 L${pbox.w + 5},5 L${pbox.w + 5},${pbox.h + 5} L5,${pbox.h + 5} Z`

  const styleCoordsHorizontal =
    r.type === "point"
      ? {
          top: pbox.y + pbox.h / 2,
          width: 60000,
          height: 3,
        }
      : {
          left: pbox.x - 5,
          top: pbox.y - 5,
          width: pbox.w + 10,
          height: pbox.h + 10,
        }

  const styleCoordsVertical =
    r.type === "point"
      ? {
          left: pbox.x + pbox.w / 2,
          width: 2,
          height: 60000,
        }
      : {
          left: pbox.x - 5,
          top: pbox.y - 5,
          width: pbox.w + 10,
          height: pbox.h + 10,
        }

  const pathDHorizontal =
    r.type === "point"
      ? `M1,2 H${styleCoordsHorizontal.width} Z`
      : `M5,5 L${pbox.w + 5},5 L${pbox.w + 5},${pbox.h + 5} L5,${pbox.h + 5} Z`

  const pathDVertical =
    r.type === "point"
      ? `M1,1 V${styleCoordsVertical.height} Z`
      : `M5,5 L${pbox.w + 5},5 L${pbox.w + 5},${pbox.h + 5} L5,${pbox.h + 5} Z`

  return (
    <ThemeProvider theme={theme}>
      {/*  Horizontal line */}
      <svg
        key={`${r.id}-horizontal`}
        id={`${r.id}-horizontal`}
        className={classnames(classes.highlightLight, {
          highlighted: r.highlighted,
        })}
        {...mouseEvents}
        {...(!zoomWithPrimary && !dragWithPrimary
          ? {
              onMouseDown: (e) => {
                // if (
                //   !r.locked &&
                //   r.type === "point" &&
                //   r.highlighted &&
                //   e.button === 0
                // ) {
                //   return onBeginMovePoint(r)
                // }
                if (e.button === 0 && !createWithPrimary) {
                  return onSelectRegion(r)
                }
                onSelectRegion(r)

                mouseEvents.onMouseDown(e)
              },
            }
          : {})}
        style={{
          ...(r.highlighted && {
            pointerEvents: r.type !== "point" ? "none" : undefined,
          }),
          position: "absolute",
          ...styleCoordsHorizontal,
        }}
      >
        <path d={pathDHorizontal} />
      </svg>
      {/* Vertical line */}
      <svg
        key={`${r.id}-vertical`}
        id={`${r.id}-vertical`}
        className={classnames(classes.highlightLight, {
          highlighted: r.highlighted,
        })}
        {...mouseEvents}
        {...(!zoomWithPrimary && !dragWithPrimary
          ? {
              onMouseDown: (e) => {
                // if (
                //   !r.locked &&
                //   r.type === "point" &&
                //   r.highlighted &&
                //   e.button === 0
                // ) {
                //   return onBeginMovePoint(r)
                // }
                if (e.button === 0 && !createWithPrimary) {
                  return onSelectRegion(r)
                }
                onSelectRegion(r)

                mouseEvents.onMouseDown(e)
              },
            }
          : {})}
        style={{
          ...(r.highlighted && {
            pointerEvents: r.type !== "point" ? "none" : undefined,
          }),
          position: "absolute",
          ...styleCoordsVertical,
        }}
      >
        <path d={pathDVertical} />
      </svg>

      {/* Box */}
      <svg
        key={`${r.id}-box`}
        id={`${r.id}-box`}
        className={classnames(classes.highlightLight, {
          highlighted: r.highlighted,
        })}
        {...mouseEvents}
        {...(!zoomWithPrimary && !dragWithPrimary
          ? {
              onMouseDown: (e) => {
                if (
                  !r.locked &&
                  r.type === "point" &&
                  r.highlighted &&
                  e.button === 0
                ) {
                  return onBeginMovePoint(r)
                }
                if (e.button === 0 && !createWithPrimary) {
                  return onSelectRegion(r)
                }
                onSelectRegion(r)

                mouseEvents.onMouseDown(e)
              },
            }
          : {})}
        style={{
          ...(r.highlighted
            ? {
                pointerEvents: r.type !== "point" ? "none" : undefined,
                cursor: !r.locked && "grab",
              }
            : {
                cursor: !(
                  zoomWithPrimary ||
                  dragWithPrimary ||
                  createWithPrimary
                )
                  ? "pointer"
                  : undefined,
                pointerEvents:
                  zoomWithPrimary ||
                  dragWithPrimary ||
                  (createWithPrimary && !r.highlighted)
                    ? "none"
                    : undefined,
              }),
          position: "absolute",
          ...styleCoords,
        }}
      >
        <path d={pathD} style={{ strokeDasharray: 5 }} />
      </svg>
    </ThemeProvider>
  )
}

export default HighlightBox
