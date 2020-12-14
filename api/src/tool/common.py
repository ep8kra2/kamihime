def to_dict_from_sql_record(sqlrow):
  row = dict(sqlrow.__dict__)
  del row['_sa_instance_state']
  return row