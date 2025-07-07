'use client';

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorData react component.
//          It is used to plot the data coming from the ros environment.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useTranslations } from 'next-intl';
import {useEffect, useState, useRef, useCallback} from 'react';
import * as d3 from 'd3';
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
import PanelLabel from './PanelLabel';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT

export default function MonitorData(props) {
  
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const { cmdVelMsg, robotOrientationRef, jointStatesRef, whichMsg } = useLaboratory()
    // Destructure the translations.
    const t = useTranslations('LabPanel')
    // Define the component's usestate variables.
    const [data, setData] = useState([])
    const [yKeys, setYKeys] = useState([])
    const [paused, setPaused] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
    // Define the reference variables.
    const containerRef = useRef(null)
    const svgRef = useRef(null)
    const latestMsgRef = useRef(null)
    const lastMouseXRef = useRef(null)
    const isMouseOverRef = useRef(false)
    const zoomTransformRef = useRef(d3.zoomIdentity)
    const initialYDomainRef = useRef(null)
    // Define the component's constant variables.
    const margin = { top: 20, right: 20, bottom: 50, left: 50 }
    // Define the component's helpers functions.
    // Flatten the data contained in the ros2 message structure.
    function flattenData(obj, prefix = '') {
      let result = {}
      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          Object.assign(result, flattenData(value, newKey))
        } else if (typeof value === 'number') {
          result[newKey] = value
        }
      }
      return result
    }
    // Reset the zoom level of the graph the default value.
    function resetZoom() {
      zoomTransformRef.current = d3.zoomIdentity
      initialYDomainRef.current = null
      setData(prev => [...prev])
    }
    // Define the useEffect hook triggering on useState update.
    // Update the latest data message.
    useEffect(() => {
      if (cmdVelMsg && whichMsg === "cmd_vel") latestMsgRef.current = cmdVelMsg
      else if (jointStatesRef.current && whichMsg === "joints") latestMsgRef.current = jointStatesRef.current
      else if (robotOrientationRef.current && whichMsg === "imu") latestMsgRef.current = robotOrientationRef.current
      else console.log("Invalid chosen data.")
    }, [cmdVelMsg, jointStatesRef.current, robotOrientationRef.current, whichMsg])
    // Clear all existing paths and axes from the SVG when a new message type is selected.
    useEffect(() => {
      const svg = d3.select(svgRef.current)
      svg.selectAll('g.plot-area').remove()
      svg.selectAll('g.tooltip-group').remove()
    }, [whichMsg])
    // Update the content of the graph at each render of the window when the pause button is hit.
    useEffect(() => {
      // Initialize variable.
      let frameId
      // Define the loop.
      const update = () => {
        // If the graph is not paused AND at least one message has been registered.
        if (!paused && latestMsgRef.current) {
          // We retrieve the time.
          const now = Date.now()
          // Format the data.
          const flattened = flattenData(latestMsgRef.current)
          // Retrieve all data field.
          const keys = Object.keys(flattened).filter(k => typeof flattened[k] === 'number')
          // Set the data.
          setData(prev => {
            const newData = [...prev.filter(d => now - d.timestamp <= 5000), { timestamp: now, ...flattened }]
            return newData.slice(-5000)
          })
          // Set the key of each data... (ie: linear.x for cmd_vel...).
          setYKeys(prevKeys => {
            return JSON.stringify(prevKeys) === JSON.stringify(keys) ? prevKeys : keys
          })
        } else {
          // Even if paused, force a redraw so zoom still works
          setData(prev => [...prev])
        }
        frameId = requestAnimationFrame(update)
      }
      // Start the loop.
      frameId = requestAnimationFrame(update)
      // Cancel the loop on unmounting of the component.
      return () => cancelAnimationFrame(frameId)
    }, [paused, whichMsg])
    // Update the content of the graph when new data comes in or when we interact with it.
    useEffect(() => {
      if (!data.length || !yKeys.length) return
      const { width, height } = dimensions
      const plotWidth = width - margin.left - margin.right
      const plotHeight = height - margin.top - margin.bottom
      const xExtent = d3.extent(data, d => d.timestamp)
      const xScale = d3.scaleTime().domain(xExtent).range([0, plotWidth])
      const svg = d3.select(svgRef.current)
      svg.attr('width', width).attr('height', height)
      // Only remove and recreate plot area if it doesn't exist
      let g = svg.select('g.plot-area')
      if (g.empty()) {
        // Don't redundantly remove all plot areas if it was already empty
        g = svg.append('g')
          .attr('class', 'plot-area')
          .attr('transform', `translate(${margin.left},${margin.top})`)
        svg.select('g.tooltip-group').raise()
      }      
      const yValues = data.flatMap(d => yKeys.map(k => d[k])).filter(v => typeof v === 'number' && !isNaN(v))
      let yDomain
      if (zoomTransformRef.current.manualYZoom && initialYDomainRef.current) {
        yDomain = initialYDomainRef.current
      } else {
        yDomain = d3.extent(yValues)
        if (!isFinite(yDomain[0]) || !isFinite(yDomain[1])) return
        initialYDomainRef.current = yDomain
      }
      const yScale = d3.scaleLinear().domain(yDomain).nice().range([plotHeight, 0])
      const transform = zoomTransformRef.current
      const zx = transform.rescaleX(xScale)
      const zy = transform.rescaleY(yScale)

      // Update axes instead of recreating them
      let axisX = g.select('.axis-x')
      if (axisX.empty()) {
        axisX = g.append('g')
          .attr('class', 'axis-x')
          .attr('transform', `translate(0,${plotHeight})`)
      }
      axisX.call(d3.axisBottom(zx).ticks(5))
      let axisY = g.select('.axis-y')
      if (axisY.empty()) {
        axisY = g.append('g')
          .attr('class', 'axis-y')
      }
      axisY.call(d3.axisLeft(zy))

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

      // Update paths instead of recreating them
      yKeys.forEach(key => {
        const line = d3.line()
          .defined(d => typeof d[key] === 'number' && !isNaN(d[key]))
          .x(d => zx(d.timestamp))
          .y(d => zy(d[key]))
          .curve(d3.curveMonotoneX)

        let path = g.select(`path.${key.replace('.', '-')}`)
        if (path.empty()) {
          path = g.append('path')
            .attr('class', key.replace('.', '-'))
            .attr('fill', 'none')
            .attr('stroke', colorScale(key))
            .attr('stroke-width', 2)
        }
        path.datum(data).attr('d', line)
      })
      let tooltipGroup = svg.select('g.tooltip-group')
      if (tooltipGroup.empty()) {
        tooltipGroup = svg.append('g').attr('class', 'tooltip-group').style('display', 'none')
        tooltipGroup.append('line')
          .attr('class', 'focus-line')
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
          .attr('pointer-events', 'none')
        const focusPoints = tooltipGroup.selectAll('g.point')
        .data(yKeys, d => d)
        .join(
          enter => {
            const g = enter.append('g')
              .attr('class', 'point')
              .attr('pointer-events', 'none')
            g.append('circle')
              .attr('r', 4)
              .attr('fill', key => colorScale(key))
            g.append('text')
              .attr('x', 8)
              .attr('dy', '0.35em')
              .style('font-size', '12px')
            return g
          },
          update => update,
          exit => exit.remove()
        )
        focusPoints.append('circle')
          .attr('r', 4)
          .attr('fill', key => colorScale(key))
        focusPoints.append('text')
          .attr('x', 8)
          .attr('dy', '0.35em')
          .style('font-size', '12px')
        tooltipGroup.append('text')
          .attr('class', 'timestamp')
          .attr('y', height - margin.bottom + 20)
          .attr('text-anchor', 'middle')
          .style('font-size', '12px')
          .style('font-weight', 'bold')
      } else {
        const focusPoints = tooltipGroup.selectAll('g.point').data(yKeys)
        focusPoints.exit().remove()
        const focusPointsEnter = focusPoints.enter()
          .append('g')
          .attr('class', 'point')
          .attr('pointer-events', 'none')
        focusPointsEnter.append('circle')
          .attr('r', 4)
          .attr('fill', key => colorScale(key))
        focusPointsEnter.append('text')
          .attr('x', 8)
          .attr('dy', '0.35em')
          .style('font-size', '12px')
      }
      const focusLine = tooltipGroup.select('line.focus-line')
      const focusPoints = tooltipGroup.selectAll('g.point')
      const timestampText = tooltipGroup.select('text.timestamp')
      let interactionRect = g.select('rect.interaction-rect')
      if (interactionRect.empty()) {
        interactionRect = g.append('rect')
          .attr('class', 'interaction-rect')
          .attr('width', plotWidth)
          .attr('height', plotHeight)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
      }
      interactionRect
        .on('mouseover', () => {
          tooltipGroup.style('display', null)
          isMouseOverRef.current = true
        })
        .on('mouseout', () => {
          tooltipGroup.style('display', 'none')
          isMouseOverRef.current = false
          lastMouseXRef.current = null
        })
        .on('mousemove', function (event) {
          const [mx] = d3.pointer(event)
          lastMouseXRef.current = mx
          updateTooltip(mx)
        })
      function updateTooltip(mouseX) {
        const transform = zoomTransformRef.current
        const xScale = d3.scaleTime()
          .domain(d3.extent(data, d => d.timestamp))
          .range([0, plotWidth])
        const zx = transform.rescaleX(xScale)
        const x0 = zx.invert(mouseX)
        const bisect = d3.bisector(d => d.timestamp).left
        const i = bisect(data, x0, 1)
        const d0 = data[i - 1]
        const d1 = data[i]
        let dClosest = d0
        if (d1 && (x0 - d0.timestamp > d1.timestamp - x0)) {
          dClosest = d1
        }
        if (!dClosest) return
        const xPos = zx(dClosest.timestamp) + margin.left
        focusLine.attr('x1', xPos).attr('x2', xPos)
        focusPoints.each(function (key) {
          const yVal = dClosest[key]
          const pointGroup = d3.select(this)
          if (yVal != null && yVal !== 0 && !isNaN(yVal)) {
            pointGroup
              .style('display', null)
              .attr('transform', `translate(${xPos},${zy(yVal) + margin.top})`)
            pointGroup.select('text').text(`${key}: ${yVal.toFixed(3)}`)
          } else {
            pointGroup.style('display', 'none')
          }
        })
        timestampText
          .attr('x', xPos)
          .attr('y', height - margin.bottom + 30)
          .text(new Date(dClosest.timestamp).toLocaleTimeString())
      }
      const zoom = d3.zoom()
      .scaleExtent([0.1, 100])
      .on('zoom', event => {
        if (!event.sourceEvent) {
          // Programmatic zoom (like reset)
          zoomTransformRef.current = event.transform
          svgRef.current.dispatchEvent(new CustomEvent('redraw'))
          return
        }
        const currentTransform = zoomTransformRef.current
        const isCtrl = event.sourceEvent.ctrlKey
        const isWheel = event.sourceEvent.type === 'wheel'
        const isDrag = !isWheel
        if (isDrag) {
          // Regular pan - update both x and y
          zoomTransformRef.current = event.transform
          svgRef.current.dispatchEvent(new CustomEvent('redraw'))
          return
        }
        if (isWheel) {
          const { width, height } = dimensions
          const plotWidth = width - margin.left - margin.right
          const plotHeight = height - margin.top - margin.bottom
          const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.timestamp))
            .range([0, plotWidth])
          const yScale = d3.scaleLinear()
            .domain(initialYDomainRef.current)
            .range([plotHeight, 0])
          const [x, y] = d3.pointer(event.sourceEvent, svgRef.current)
          const deltaY = event.sourceEvent.deltaY
          const scaleFactor = deltaY > 0 ? 0.99 : 1.01
          if (isCtrl) {
            // Vertical zoom only
            const yPos = yScale.invert(y - margin.top)
            const newYDomain = [
              yPos + (initialYDomainRef.current[0] - yPos) * scaleFactor,
              yPos + (initialYDomainRef.current[1] - yPos) * scaleFactor
            ]
            initialYDomainRef.current = newYDomain
          } else {
            // Horizontal zoom only
            const xPos = xScale.invert(x - margin.left)
            const newTransform = currentTransform.scale(scaleFactor)
            const newX = x - (x - currentTransform.x) * scaleFactor
            zoomTransformRef.current = d3.zoomIdentity
              .translate(newX, currentTransform.y)
              .scale(newTransform.k)
          }
          svgRef.current.dispatchEvent(new CustomEvent('redraw'))
        }
      })
    // Prevent default wheel behavior when Ctrl is pressed
    svg.on('wheel', (event) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    })
    svg.call(zoom).call(zoom.transform, zoomTransformRef.current)
      const redraw = () => {
        // Instead of removing everything, we'll just trigger a state update
        // that will cause the paths and axes to be updated
        setData(prev => [...prev])
      }
      svgRef.current?.removeEventListener('redraw', redraw)
      svgRef.current?.addEventListener('redraw', redraw)      
      if (isMouseOverRef.current && lastMouseXRef.current != null) {
        updateTooltip(lastMouseXRef.current)
      }
      return () => {
        // Cleanup when component unmounts or data changes
        svgRef.current?.removeEventListener('redraw', redraw)
        const svg = d3.select(svgRef.current)
        svg.selectAll('g.plot-area').remove()
        svg.selectAll('g.tooltip-group').remove()
      }
    }, [data, dimensions, yKeys])
    // Trigger this hook upon mounting the component.
    useEffect(() => {
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      })
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    }, [])
    // Return the html.
    return (
      // The container of the whole component.
      <div ref={containerRef} className="relative w-full h-full">
        {/* The button to start and stop the plotting. */}
        <PanelLabel labels={[(paused ? t("start") :  t("pause"))]} pose="right-4" clicked={paused} onClick={() => setPaused(p => !p)}/>
        {/* The button to reset the view of the graph. */}
        <PanelLabel labels={[t("reset")]} pose="right-24" onClick={resetZoom}/>
        {/* The container of the graph itself. */}
        <svg ref={svgRef} className="w-full h-full select-none cursor-crosshair bg-gray-400"></svg>
      </div>
    )
}