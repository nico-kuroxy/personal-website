/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the MonitorData react component.
//          It is used to plot the data coming from the ros environment.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import {useEffect, useState, useRef} from 'react';
import Plot from 'react-plotly.js';
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
import { usePageStyle } from "../../context/PageStyleProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function MonitorData(props) {
    // Destructure the props passed as argument.
    const {data= {}} = props
    const plotRef = useRef(null);
    const [plot, setPlot] = useState(null);

    useEffect(() => {
        if (!plot && data) {
            const plotElement = plotRef.current;

            // Extract variables and colors
            const { timestamps=null, series=[] } = data;
            const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']; // Example colors

            // Create traces for each series
            const traces = series?.map((values, index) => ({
                x: timestamps,
                y: values,
                mode: 'lines',
                line: { color: colors[index % colors.length] },
                name: `Series ${index + 1}`
            }));

            // Layout configuration
            const layout = {
                title: 'Temporal Data Plot',
                xaxis: {
                    title: 'Time'
                },
                yaxis: {
                    title: 'Value'
                },
                showlegend: true,
                legend: {
                    x: 0,
                    y: 1,
                    traceorder: 'normal',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        color: '#000'
                    },
                    bgcolor: '#E2E2E2',
                    bordercolor: '#FFFFFF',
                    borderwidth: 2
                }
            };

            // Plot configuration
            const config = {
                responsive: true,
                displayModeBar: true
            };

            // Plot initialization
            const newPlot = Plotly.newPlot(plotElement, traces, layout, config);
            setPlot(newPlot);
        } else {
            // Update data
            const { timestamps, series } = data;
            const updatedTraces = series?.map((values, index) => ({
                x: timestamps,
                y: values,
                line: { color: colors[index % colors.length] },
                name: `Series ${index + 1}`
            }));

            Plotly.react(plotRef.current, updatedTraces);
        }
    }, [data, plot]);

    return (
        <div ref={plotRef} />
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////