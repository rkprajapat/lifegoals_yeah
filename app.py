import requests, os
from flask import Flask, render_template, request


app = Flask(__name__)
# app.config.from_object(os.environ['APP_SETTINGS'])

@app.route('/<name>')
def hello_name(name):
    return "Hello {}!".format(name)



@app.route('/', methods=['GET', 'POST'])
def index():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )

    # result  = os.path.abspath(os.path.dirname(__file__))
    return render_template('index.html', errors=errors, results=results)
    # return (result, errors)

if __name__ == '__main__':
    app.run()
