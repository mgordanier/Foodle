import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import {color} from 'd3'

const Pie = (props) => {
  const ref = useRef(null)
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)

  // const colors = d3.scaleOrdinal(d3.schemeSet2)
  // green, blue, pink, orange
  const colors = d3
    .scaleOrdinal()
    .range(['#2EC4B6', '#6FAFEC', '#DD98D6', '#FBAC23'])
  const format = d3.format('.2f')

  //when props.data changes, run createPie
  useEffect(() => {
    //deleting previous legend
    d3.selectAll('.circle-legend').remove()

    const data = createPie(props.data)
    const group = d3.select(ref.current)

    const groupWithData = group.selectAll('g').data(data)
    //deleting entire pie
    groupWithData.exit().remove()

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc')

    d3.select('svg').attr('viewBox', `0 0 ${props.width} ${props.height}`)

    // tool tip
    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip-donut')
      .style('opacity', 0)

    // graph
    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'))

    path
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .on('mouseover', function (d, i) {
        d3.select(this).transition().duration('50').attr('opacity', '.85')
        div.transition().duration(50).style('opacity', 1)
        div
          .html(`${d.data.type}: ${d.value}`)
          .style('left', d3.event.pageX + 10 + 'px')
          .style('top', d3.event.pageY - 15 + 'px')
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition().duration('50').attr('opacity', '1')
        //Makes the new div disappear:
        div.transition().duration('50').style('opacity', 0)
      })

    const legendRectSize = 13
    const legendSpacing = 20
    const legend = group
      .selectAll('.legend') //the legend and placement
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'circle-legend')
      .attr('fill', (d, i) => colors(i))
      .attr('transform', function (d, i) {
        const height = legendRectSize + legendSpacing
        const offset = height * (colors.domain().length / 2)
        const horz = 25 * legendRectSize - 13
        const vert = i * height - offset
        return 'translate(' + horz + ',' + vert + ')'
      })
      .style('font-size', '24px')

    legend
      .append('circle') //keys
      .style('fill', color)
      .style('stroke', color)
      .attr('cx', 8)
      .attr('cy', 0)
      .attr('r', '10px')
    legend
      .append('text') //labels
      .attr('x', legendRectSize + legendSpacing + 2)
      .attr('y', legendRectSize - legendSpacing + 16)
      .text(function (d) {
        return `${d.data.type} (${d.data.value})`
      })

    const text = groupWithUpdate
      .append('text')
      .merge(groupWithData.select('text'))

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 16)
      .join('text')
      .attr('y', '-0.4em')
      .attr('font-weight', 'bold')
    // .text((d) => `${d.data.type} (${d.data.value.toLocaleString()})`)
  }, [props.data])

  return (
    <div>
      <svg className="pie">
        <g
          ref={ref}
          transform={`translate(${props.outerRadius} ${props.outerRadius})`}
        />
      </svg>
      {props.data &&
        props.data.map((data, i) => {
          return (
            <p
              key={i}
              style={{color: colors(i)}}
              className="circle-legend--mobile"
            >
              <span className="bullet">&#8226;</span> {data.type} ({data.value})
            </p>
          )
        })}
    </div>
  )
}

export default Pie
