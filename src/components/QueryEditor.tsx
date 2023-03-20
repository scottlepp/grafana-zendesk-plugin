import React, { PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { MyDataSourceOptions, MyQuery } from '../types';
import { Button, HorizontalGroup, Input, Label } from '@grafana/ui';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  statusFilters: Record<string, boolean> = { new: true, open: false, hold: false, pending: false, solved: false };

  priorityFilters: Record<string, boolean> = { low: true, normal: false, high: false, urgent: false };
  
  CreateToggleGroup = ({bindTo, queryKey, label}: 
    {bindTo: Record<string, boolean>,  queryKey: string, label: string}) => {
    return(
    <HorizontalGroup style={{marginTop: '1rem'}}>
      <Label>{label}</Label>
      { Object.keys(bindTo).map((key) => {
        return (<>
          <Button
            onClick={() => {
              bindTo[key] = !bindTo[key]
              const update: Record<string, string[]> = {}
              update[queryKey] = Object.keys(bindTo).filter(k => bindTo[k])
              this.props.onChange({ ...this.props.query, ...update })
            }}
            style={
              (bindTo[key]) ? { backgroundColor: '#2196f3', color: 'white' } : {
                                backgroundColor: 'gray', color: 'white' }}
            type="button">
              {key}
            </Button>
        </>)
      })}
    </HorizontalGroup>)
  }

  handleTagsChange = (value: string) => {
    this.props.onChange({ ...this.props.query, tags: value.replace(' ', '').split(',') })
  }


  render() {
    return (
      <>
        {this.CreateToggleGroup({bindTo: this.statusFilters, queryKey: 'status', label: 'Status'})}
        {this.CreateToggleGroup({bindTo: this.priorityFilters, queryKey: 'priority', label: 'Priority'})}
        <HorizontalGroup>
          <Label>Tags</Label>
          <Input
            type="text"
            value={this.props.query?.tags?.join(', ') || ''}
            onChange={(e) => this.handleTagsChange(e.currentTarget.value)}
          />
        </HorizontalGroup>
      </>
    )
  }
}
