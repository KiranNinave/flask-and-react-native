from flask import Flask, render_template, request, jsonify, Response
import json
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html', name=None)

@app.route("/rpi", methods=['GET','POST'])
def rpi():
	data = request.json
	print(data)
	if(data['data'] == 'connect'):
		#do connection stuf here
		data['data'] = 'success'

	elif(data['data'] == 'up'):
		#do up stuff here
		data['data'] = 'success'

	elif(data['data'] == 'down'):
		#do down stuff here
		data['data'] = 'success'

	elif(data['data'] == 'arm up'):
		#do arm up stuff here
		data['data'] = 'success'

	elif(data['data'] == 'arm down'):
		#do arm down stuff here
		data['data'] = 'success'

	elif(data['data'] == 'open'):
		#do open stuff here
		data['data'] = 'success'

	elif(data['data'] == 'close'):
		#do close stuff here
		data['data'] = 'success'

	else:
		data['data'] = 'error'
	
	return json.dumps(data)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)