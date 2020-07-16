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
  //green, pink, blue, purple
  // const colors = d3.scaleOrdinal().range(["#82C4B5", "#DD98D6", "#6FAFEC", "#FEC672"])
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

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip-donut')
      .style('opacity', 0)

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
          .html(`Total: ${d.value}`)
          .style('left', d3.event.pageX + 10 + 'px')
          .style('top', d3.event.pageY - 15 + 'px')
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition().duration('50').attr('opacity', '1')
        //Makes the new div disappear:
        div.transition().duration('50').style('opacity', 0)
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
      .text((d) => `${d.data.type} (${d.data.value.toLocaleString()})`)
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
