from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
	return render_template('index.html', name=None)

@app.route("/rpi", methods=['GET','POST'])
def rpi():
	data = request.form['rb']
	return data



if __name__ == '__main__':
	app.run()