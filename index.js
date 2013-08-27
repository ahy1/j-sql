/*
* tableName: ''
*
* valueOptions = '*';
* valueOptions = ['name', 'age'];
* valueOptions = {name: 'name', 'age': 'age', 'create_time': 'createTime'};
*
* extraOptions = {
*   where: {name: '="hao"', age: 'between 12 and 23'},
*   order: {age: 'asc', create_time: 'desc'},
*   group: 'name',
*   limit: '0,89'
* }
*/
exports = module.exports = function (tableName, valueOptions, extraOptions) {
  'use strict';
  var sql = 'select';

  var keys = [];
  var i;
  var subKeys = [];
  var j;


  if (Array.isArray(valueOptions)) {
    for (i = 0; i < valueOptions.length; i++) {
      sql += ' ' + valueOptions[i];
      if ((i + 1) < valueOptions.length) {
        sql += ',';
      }
    }
  } else if (typeof(valueOptions) === 'object') {
    keys = Object.keys(valueOptions);
    if (keys.length) {
      for (i = 0; i < keys.length; i++) {
        sql += ' ' + keys[i] + ' as ' + valueOptions[keys[i]];
        if ((i + 1) < keys.length) {
          sql += ',';
        }
      }
    } else {
      sql += ' *';
    }
  } else {
    sql += ' *';
  }


  sql += ' from ' + tableName;


  if (typeof(extraOptions) === 'object') {
    keys = Object.keys(extraOptions);
    if (keys.length) {
      if (extraOptions['where']) {
        var where = extraOptions['where'];
        subKeys = Object.keys(where);
        for (j = 0; j < subKeys.length; j++) {
          if (j === 0) {
            sql += ' where ' + subKeys[j] + ' ' + where[subKeys[j]];
          } else {
            sql += ' and ' + subKeys[j] + ' ' + where[subKeys[j]];
          }
        }
      }

      if (extraOptions['order']) {
        var order = extraOptions['order'];
        subKeys = Object.keys(order);
        for (j = 0; j < subKeys.length; j++) {
          if (j === 0) {
            sql += ' order by ' + subKeys[j] + ' ' + order[subKeys[j]];
          } else {
            sql += ', ' + subKeys[j] + ' ' + order[subKeys[j]];
          }
        }
      }

      if (extraOptions['group']) {
        sql += ' group by ' + extraOptions['group'];
      }

      if (extraOptions['limit']) {
        sql += ' limit ' + extraOptions['limit'];
      }
    }
  }


  return sql;
}