var express = require('express')
var app = express()
	var fs = require('fs');
	var mysql = require('mysql');
	var connection = mysql.createConnection({
			    host: 'localhost',
				    user: 'sensor',
					    password: '12342323',
						    database: 'data'
							})
connection.connect();

app.get('/data', function (req, res) {
		    console.log('google line chart start');
				
				var qstr = 'select * from sensors';
					connection.query(qstr, function(err, rows, cols) {
									if (err) {
												throw err;
														    res.send('query error: '+ qstr);
																	    return;
																				}
																					    var data=new Date();
																							    console.log("Got "+ rows.length +" records");
																									    var html = "<!doctype html><html><body>";
																											    html += "<H1> Sensor Data for Last 24 Hours</H1>";
																													    html += "<table border=1 cellpadding=3 cellspacing=0>";
																															    html += "<tr><td>Seq#<td>Time Stamp<td>Temperature";
																																	    for (var i=0; i<rows.length; i++) {
																																				    html += "<tr><td>"+rows[i].getTimestamp+"<td>"+rows[i].value;
																																						    }
																																								    html += "</table>";
																																											html += "</body></html>";
																																													res.send(html);
																																														});
});

app.get('/mission6', function(req, res) {
			console.log('got app.get(graph)');
				var html = fs.readFile('./graph1.html', function (err, html) {
						    html = " "+ html

							    var qstr = 'select * from sensors ';
								    connection.query(qstr, function(err, rows, cols) {
											      if (err) throw err;

												        var data = "";
														      var comma = ""
															        for (var i=0; i< rows.length; i++) {
																	         r = rows[i];
																			 		 console.log(r.time.getUTCHours());
																					 		 data += comma + "[new Date("+ r.time.getYear() +"," +r.time.getMonth() +","+ r.time.getDate()+"," + r.time.getHours() +"," +r.time.getMinutes() + "," + r.time.getSeconds() + ")," + r.value +"]";
																							 		 comma = ",";
																									       }
																										         var header = "data.addColumn('date', 'Date/Time');"
																												       header += "data.addColumn('number', 'Temperature');"
																													         html = html.replace("<%HEADER%>", header);
																															       html = html.replace("<%DATA%>", data);
																																   	  res.writeHeader(200, {"Content-Type": "text/html"});
																																	        res.write(html);
																																			      res.end();
																																				      });
									  });
})

app.listen(3000, function () {
		  console.log('Example app listening on port 3000!')
		  })
