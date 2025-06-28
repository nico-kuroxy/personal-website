'use client';

/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorData react component.
//          It is used to plot the data coming from the ros environment.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import {useEffect, useState, useRef, useCallback} from 'react';
import * as d3 from 'd3';
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
import PanelLabel from './PanelLabel';
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT

export default function MonitorData() {
    const { cmdVelMsg } = useLaboratory();
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const latestMsgRef = useRef(null);
    const [data, setData] = useState([]);
    const [paused, setPaused] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
    const lastMouseXRef = useRef(null);        // To track last mouse X position
    const isMouseOverRef = useRef(false);      // To track whether mouse is over plot
    const zoomTransformRef = useRef(d3.zoomIdentity);
    const initialYDomainRef = useRef(null);
  
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
    const COLORS = {
      'linear.x': 'steelblue',
      'linear.y': 'green',
      'linear.z': 'orange',
      'angular.x': 'red',
      'angular.y': 'purple',
      'angular.z': 'brown',
    };
  
    const yKeys = Object.keys(COLORS);
  
    useEffect(() => {
      if (cmdVelMsg) latestMsgRef.current = cmdVelMsg;
    }, [cmdVelMsg]);
  
    useEffect(() => {
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      });
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);
  
    useEffect(() => {
      let frameId;
      const update = () => {
        if (!paused && latestMsgRef.current) {
          const now = Date.now();
          const newPoint = {
            timestamp: now,
            'linear.x': latestMsgRef.current.linear.x,
            'linear.y': latestMsgRef.current.linear.y,
            'linear.z': latestMsgRef.current.linear.z,
            'angular.x': latestMsgRef.current.angular.x,
            'angular.y': latestMsgRef.current.angular.y,
            'angular.z': latestMsgRef.current.angular.z,
          };
          setData(prev => [...prev.filter(d => now - d.timestamp <= 60000), newPoint]);
        }
        frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
      return () => cancelAnimationFrame(frameId);
    }, [paused]);
  
    useEffect(() => {
      if (!data.length) return;
  
      const { width, height } = dimensions;
      const plotWidth = width - margin.left - margin.right;
      const plotHeight = height - margin.top - margin.bottom;
  
      const svg = d3.select(svgRef.current);
      svg.attr('width', width).attr('height', height);
  
      // Clear old plot elements except tooltip
      svg.selectAll('g.plot-area').remove();
      svg.select('g.tooltip-group').raise();
  
      // Append or update plot-area group
      const g = svg.append('g')
        .attr('class', 'plot-area')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Setup scales
      const xExtent = d3.extent(data, d => d.timestamp);
      const xScale = d3.scaleTime().domain(xExtent).range([0, plotWidth]);
  
      const yValues = data.flatMap(d => yKeys.map(k => d[k])).filter(v => typeof v === 'number' && !isNaN(v));
      let yDomain;
  
      if (zoomTransformRef.current.manualYZoom && initialYDomainRef.current) {
        yDomain = initialYDomainRef.current;
      } else {
        yDomain = d3.extent(yValues);
        if (!isFinite(yDomain[0]) || !isFinite(yDomain[1])) return;
        initialYDomainRef.current = yDomain;
      }
  
      const yScale = d3.scaleLinear().domain(yDomain).nice().range([plotHeight, 0]);
  
      const transform = zoomTransformRef.current;
      const zx = transform.rescaleX(xScale);
      const zy = yScale;
  
      // Axes
      g.append('g')
        .attr('transform', `translate(0,${plotHeight})`)
        .call(d3.axisBottom(zx).ticks(5));
      g.append('g')
        .call(d3.axisLeft(zy));
  
      // Lines
      yKeys.forEach(key => {
        const line = d3.line()
          .defined(d => typeof d[key] === 'number' && !isNaN(d[key]))
          .x(d => zx(d.timestamp))
          .y(d => zy(d[key]))
          .curve(d3.curveMonotoneX);
  
        g.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', COLORS[key])
          .attr('stroke-width', 2)
          .attr('d', line);
      });
  
      // Tooltip group (outside plot-area)
      let tooltipGroup = svg.select('g.tooltip-group');
      if (tooltipGroup.empty()) {
        tooltipGroup = svg.append('g').attr('class', 'tooltip-group').style('display', 'none');
  
        tooltipGroup.append('line')
          .attr('class', 'focus-line')
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
          .attr('pointer-events', 'none');
  
        const focusPoints = tooltipGroup.selectAll('g.point')
          .data(yKeys)
          .enter()
          .append('g')
          .attr('class', 'point')
          .attr('pointer-events', 'none');
  
        focusPoints.append('circle')
          .attr('r', 4)
          .attr('fill', key => COLORS[key]);
  
        focusPoints.append('text')
          .attr('x', 8)
          .attr('dy', '0.35em')
          .style('font-size', '12px');
        
        tooltipGroup.append('text')
          .attr('class', 'timestamp')
          .attr('y', height - margin.bottom + 20)
          .attr('text-anchor', 'middle')
          .style('font-size', '12px')
          .style('font-weight', 'bold');
      }
  
      const focusLine = tooltipGroup.select('line.focus-line');
      const focusPoints = tooltipGroup.selectAll('g.point');
      const timestampText = tooltipGroup.select('text.timestamp');
  
      // Mouse overlay
      g.append('rect')
        .attr('width', plotWidth)
        .attr('height', plotHeight)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseover', () => {
            tooltipGroup.style('display', null);
            isMouseOverRef.current = true;
          })
          .on('mouseout', () => {
            tooltipGroup.style('display', 'none');
            isMouseOverRef.current = false;
            lastMouseXRef.current = null;
          })
          .on('mousemove', function (event) {
            const [mx] = d3.pointer(event);
            lastMouseXRef.current = mx;
            updateTooltip(mx);
          });

            function updateTooltip(mouseX) {
                const x0 = zx.invert(mouseX);
                const bisect = d3.bisector(d => d.timestamp).left;
                const i = bisect(data, x0, 1);
                const d0 = data[i - 1];
                const d1 = data[i];
                let dClosest = d0;
                if (d1 && (x0 - d0.timestamp > d1.timestamp - x0)) {
                  dClosest = d1;
                }
                if (!dClosest) return;
              
                const xPos = zx(dClosest.timestamp) + margin.left;
                focusLine.attr('x1', xPos).attr('x2', xPos);
              
                focusPoints.each(function (key) {
                  const yVal = dClosest[key];
                  const pointGroup = d3.select(this);
              
                  if (yVal != null && yVal != 0 && !isNaN(yVal)) {
                    pointGroup
                      .style('display', null)
                      .attr('transform', `translate(${xPos},${zy(yVal) + margin.top})`);
                    pointGroup.select('text').text(`${key}: ${yVal.toFixed(3)}`);
                  } else {
                    pointGroup.style('display', 'none');
                  }
                });
              
                timestampText
                  .attr('x', xPos)
                  .attr('y', height - margin.bottom + 30)
                  .text(new Date(dClosest.timestamp).toLocaleTimeString());
              
        };
  
      // Zoom
      const zoom = d3.zoom()
        .scaleExtent([0.1, 100])
        .on('zoom', event => {
          if (!event.sourceEvent?.ctrlKey) {
            zoomTransformRef.current = event.transform;
            svgRef.current.dispatchEvent(new CustomEvent('redraw-immediate'));
          }
        });
  
      svg.call(zoom).call(zoom.transform, zoomTransformRef.current);
  
      svg.on('wheel.zoom-filter', function (event) {
        if (!event.ctrlKey) return;
  
        event.preventDefault();
        const [mx, my] = d3.pointer(event);
        const scaleFactor = event.deltaY < 0 ? 1 / 1.1 : 1.1;
  
        const localY = my - margin.top;
        const yScaleCurrent = d3.scaleLinear()
          .domain(initialYDomainRef.current)
          .range([plotHeight, 0]);
  
        const cursorY = yScaleCurrent.invert(localY);
        const [y0, y1] = yScaleCurrent.domain();
  
        const newY0 = cursorY + (y0 - cursorY) * scaleFactor;
        const newY1 = cursorY + (y1 - cursorY) * scaleFactor;
  
        if (isFinite(newY0) && isFinite(newY1)) {
          initialYDomainRef.current = [newY0, newY1];
          zoomTransformRef.current.manualYZoom = true;
          zoomTransformRef.current.manualYZoomOnly = true;
          svgRef.current.dispatchEvent(new CustomEvent('redraw'));
        }
      });
  
      const redraw = () => {
        svg.selectAll("g.plot-area").remove();
        setTimeout(() => setData(prev => [...prev]), 0);
      };
  
      svgRef.current.addEventListener('redraw-immediate', redraw);
      svgRef.current.addEventListener('redraw', redraw);
  
  

        if (isMouseOverRef.current && lastMouseXRef.current != null) {
            updateTooltip(lastMouseXRef.current);
          }
  
      return () => {
        svgRef.current?.removeEventListener('redraw-immediate', redraw);
        svgRef.current?.removeEventListener('redraw', redraw);
      };
    }, [data, dimensions]);
  
    const handleResetZoom = () => {
      zoomTransformRef.current = d3.zoomIdentity;
      if (data.length > 0) {
        const allY = data.flatMap(d =>
          Object.values(d).filter(v => typeof v === 'number')
        );
        initialYDomainRef.current = d3.extent(allY);
      }
      svgRef.current?.dispatchEvent(new CustomEvent('redraw'));
    };
      
        return (
          <div ref={containerRef} className="relative w-full h-full">

            {/* The pause button. */}
            <PanelLabel labels={[(paused ? 'Start' : 'Pause')]} pose="right-4" clicked={paused} onClick={() => setPaused(p => !p)}/>
            {/* The reset button. */}
            <PanelLabel labels={["Reset"]} pose="right-24" onClick={handleResetZoom}/>
    
      
            <svg ref={svgRef} className="w-full h-full select-none cursor-crosshair bg-gray-400"></svg>
          </div>
        );
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////