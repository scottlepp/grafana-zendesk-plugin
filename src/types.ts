import { DataQuery, DataSourceJsonData, QueryEditorProps } from '@grafana/data';
import { DataSource } from 'datasource';

export interface ZendeskQuery extends DataQuery {
  querystring: string,
  filters: SelectableQueryRow[]
}

export type ZendeskQueryEditorProps = QueryEditorProps<DataSource, ZendeskQuery, ZendeskDatasourceOptions>;

export interface ZendeskDatasourceOptions extends DataSourceJsonData {}

export const DefaultKeywords = [
  'assignee','brand','cc', 'comment', 'commenter', 'created','custom_status_id',
  'description', 'due_date', 'fieldvalue', 'form', 'group','has_attachment','organization','priority',
  'recipient','requester','solved','status','subject','submitter','tags','Ticket ID','ticket_type','updated','via'] as const;

const QueryOperators = [":" , '-' , '>' , '<' , '>=' , '<='] as const;
export type QueryOperator = typeof QueryOperators[number];

export type SelectableQueryRow = {
  selectedKeyword: string;
  availableKeywords: string[];
  operator: QueryOperator;
  terms: string[];
  availableTerms?: string[];
  uniqueId: string;
  querystring: string;
}

export const queryValueDefaults: Record<string, string[]> = {
  status: ['new', 'open', 'pending', 'hold', 'solved'],
  priority: ['low', 'normal', 'high', 'urgent'],
}
