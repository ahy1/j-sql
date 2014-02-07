var SQL = require('../index')

var should = require('should')

describe('insert', function () {
	it('set', function () {
		var sql = SQL.insert('user_table').set({
			name: 'hao',
			age: 12,
			point: 3333,
			create_time: '2013-09-14'
		}).done()

		console.log(sql)


		sql.should.equal('insert into user_table ( name, age, point, create_time ) values ( "hao", 12, 3333, "2013-09-14" )')
	})

	it('values', function () {
		var sql = SQL.insert('user_table').values({
			name: 'hao',
			age: 12,
			point: 3333,
			create_time: '2013-09-14'
		}).done()

		sql.should.equal('insert into user_table ( name, age, point, create_time ) values ( "hao", 12, 3333, "2013-09-14" )')
	})
})
