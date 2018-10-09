export class Resource {

  id?: number;
  title: string;
  created_at: Date;
  modified_at: Date;
  attributes = [];

}

export class Attribute {
  id?: number;
  title = '';
  help_text = '';
  type = 'Single Line Text';
  summary_field: boolean;
  order_num: number;
  section_order_num: number;
  section_name: string;
  created_at: Date;
  modified_at: Date;
}
