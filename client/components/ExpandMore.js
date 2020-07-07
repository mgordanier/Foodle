import React from 'react'
import {mdiChevronDown} from '@mdi/js'
import Icon from '@mdi/react'

export default function ExpandMore(props) {
  return (
    <Icon
      path={mdiChevronDown}
      className={props.className}
      height={props.height}
      width={props.width}
    />
  )
}
