import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

const Pie = (props) => {
  //useRef replicates React.createRed and provides us a way to access DOM nodes
  //targets <g> in our useEffect
  const ref = useRef(null)
  const createPie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
  const colors = d3.scaleOrdinal(d3.schemeSet2)
  const format = d3.format('.2f')

  //side effects & componentDidMount
  //when props.data changes, run createPie
  useEffect(() => {
    const data = createPie(props.data)
    const group = d3.select(ref.current)
    const groupWithData = group.selectAll('g.arc').data(data)

    groupWithData.exit().remove()

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc')

    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'))

    path
      .attr('class', 'arc')
      .attr('d', createArc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')

    const text = groupWithUpdate
      .append('text')
      .merge(groupWithData.select('text'))

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => `translate(${createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 16)
      // .text(d => format(d.value));
      .join('text')
      // .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call((text) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d) => d.data.type)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d) => d.data.value.toLocaleString())
      )
  }, [props.data])

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  )
}

export default Pie
