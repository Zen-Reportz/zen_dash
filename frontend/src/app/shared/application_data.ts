export class MEData {
  key!: string
  value!: any
}



export class SidebarTab {
  name!: string;
  icon!: string;
  fragment!: string;
}

export class Filter {
  url!: string;

}

export class SidebarData{
  tabs!: SidebarTab[]
  filters!: Filter[]
}


export class Instance{
  url!: string
  fxFlex!: string
  fxFlex_md!: string
  fxFlex_sm!: string
  fxFlex_xs!: string

}

export class Row{
  data!: Instance[]
  layoutGap!: string
}

export class Page{
  rows!: Row[]
}


export class BoxData{
  icon!: string
  name!: string
  value!: string
}

export class DateData{
  name!: string
  first_date!: string
  second_date!: string | null
}

export class TableData{
  columns!: TableColumn[]
  data!: Map<string, any>[]
  name!: string
}

export interface TableColumn{
   columnDef:string;
   header:string
}


export class CheckboxInstance{
  name!: string;
  selected!: boolean;
}

export class CheckboxData{
  data!: CheckboxInstance[]
  style!: string;
  name!: string;

}


export class  RadioData{
  data!: string[];
  style!: string;
  name!: string;
  selected!: string;

}

export class  ChartData{
  name!: string;
  data!: any
}

export class ButtonToggleInstance {
  name!: string
  selected!: boolean
}
export class ButtonToggleData{
  data!: ButtonToggleInstance[]
  name!: string
  multiple!: boolean

}

export class ToggleData{
  data!: boolean
  name!: string
  multiple!: boolean

}

export class SliderData{
  name!: string
  max!: number
  min!: number
  step!: number
  thumbLabel!: boolean
  invert!: boolean
  vertical!: boolean
}



export class GroupedFilterDataInstance{
  group_name!: string
  group_data!: string[]

}

export class GroupFilterData{
  name!: string
  data!: GroupedFilterDataInstance[]
}

export class SimpleFilterData{
  name!: string
  data!: string[]

}

export class MultiURLInfo{
  name: string | undefined
  url!: string
}
export class MultiData {
  urls!: MultiURLInfo[]
}
export class ResponseData{
  type!: string
  reactive: boolean | undefined
  title: string | undefined
  chart_data:  ChartData |   undefined
  filter_data: SimpleFilterData | GroupFilterData | undefined
  box_data: BoxData | undefined
  date_data: DateData | undefined
  checkbox_data: CheckboxData | undefined
  radio_data: RadioData | undefined
  slider_data: SliderData | undefined
  button_toggle_data: ButtonToggleData | undefined
  table_data: TableData | undefined
  toggle_data: ToggleData | undefined
  multi_data: MultiData | undefined
  footer: string | undefined

}
