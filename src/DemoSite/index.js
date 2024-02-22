// @flow
import React, { useState } from "react"
import ReactDOM from "react-dom"
import Editor, { examples } from "./Editor"
import Annotator from "../Annotator"
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js"

export default () => {
  const [annotatorOpen, changeAnnotatorOpen] = useState(false)
  const [annotatorProps, changeAnnotatorProps] = useState(examples["Custom"]())
  const [lastOutput, changeLastOutput] = useState()

  return (
    <div>
      {annotatorOpen ? (
        <ErrorBoundaryDialog
          onClose={() => {
            changeAnnotatorOpen(false)
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              const element = document.getElementById("2050877559569606")
              if (element) {
                var clickEvent = document.createEvent("MouseEvents")
                clickEvent.initEvent("mousedown", true, true)
                element.dispatchEvent(clickEvent)
              }
            }}
          >
            click
          </button>
          <Annotator
            {...(annotatorProps: any)}
            onCreateAnno={(anno) => {
              console.log("Annotator created: ", JSON.stringify(anno))
            }}
            onClickAnno={(anno) => {
              console.log("Annotator click: ", anno)
            }}
            onExit={(output) => {
              let checkOutside = false
              output.images[0].regions.forEach((r) => {
                if (r.x <= 0 || r.x >= 1 || r.y <= 0 || r.y >= 1.0) {
                  checkOutside = true
                }
              })
              if (checkOutside) {
                alert("Create defect box inside image")
              } else {
                changeLastOutput(output.images[0].regions)
              }
              console.log(output.images[0].regions)
            }}
          />
        </ErrorBoundaryDialog>
      ) : (
        <Editor
          lastOutput={lastOutput}
          onOpenAnnotator={(props) => {
            changeAnnotatorProps(props)
            changeAnnotatorOpen(true)
          }}
        />
      )}
    </div>
  )
}
