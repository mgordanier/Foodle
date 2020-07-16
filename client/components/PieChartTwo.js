import React from 'react'
import * as d3 from 'd3'

export const PieChartTwo = () => {
  //data for piechart
  const data = [
    {
      title: 'korean korean korean',
      value: 5,
      all: 20,
    },
    {
      title: 'thai',
      value: 10,
      all: 20,
    },
    {
      title: 'mexican',
      value: 2,
      all: 20,
    },
    {
      title: 'None Of These',
      value: 3,
      all: 20,
    },
  ]

  const data2 = [
    {
      title: 'korean',
      value: 8,
      all: 20,
    },
    {
      title: 'american',
      value: 3,
      all: 20,
    },
    {
      title: 'mexican',
      value: 7,
      all: 20,
    },
    {
      title: 'None Of These',
      value: 2,
      all: 20,
    },
  ]

  //sizing of pie
  const width = 360
  const height = 360
  const radius = Math.min(width, height) / 2
  const donutWidth = 75
  const color = d3
    .scaleOrdinal()
    .range(['#5A39AC', '#DD98D6', '#E7C820', '#08B2B2'])

  //make pie chart
  const svg = d3
    .select('#donut')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  const arc = d3
    .arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius)
  const pie = d3
    .pie()
    .value(function (d) {
      return d.value
    })
    .sort(null)

  const div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip-donut')
    .style('opacity', 0)

  const path = svg
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
      return color(d.data.title)
    })
    .attr('transform', 'translate(0, 0)')

    .on('mouseover', function (d, i) {
      d3.select(this).transition().duration('50').attr('opacity', '.85')
      div.transition().duration(50).style('opacity', 1)
      let num = Math.round((d.value / d.data.all) * 100).toString() + '%'
      div
        .html(num)
        .style('left', d3.event.pageX + 10 + 'px')
        .style('top', d3.event.pageY - 15 + 'px')
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition().duration('50').attr('opacity', '1')
      div.transition().duration('50').style('opacity', 0)
    })

  //legend
  const legendRectSize = 13
  const legendSpacing = 7
  const legend = svg
    .selectAll('.legend') //the legend and placement
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
      var height = legendRectSize + legendSpacing
      var offset = (height * color.domain().length) / 2
      var horz = -2 * legendRectSize - 13
      var vert = i * height - offset
      return 'translate(' + horz + ',' + vert + ')'
    })
  legend
    .append('circle') //keys
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem')
  legend
    .append('text') //labels
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
      return d
    })

  d3.select('button#changedata').on('click', function () {
    change(data2)
  })

  function change(data) {
    const pie = d3
      .pie()
      .value(function (d) {
        return d.value
      })
      .sort(null)(data)
    const width = 360
    const height = 360
    const radius = Math.min(width, height) / 2
    const donutWidth = 75
    const path = d3.select('#donut').selectAll('path').data(pie) // Compute the new angles
    const arc = d3
      .arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius)
    path.transition().duration(500).attr('d', arc) // redrawing the path with a smooth transition
  }

  return (
    <div id="donut">
      <button id="changedata">New Responses</button>
    </div>
  )
}
